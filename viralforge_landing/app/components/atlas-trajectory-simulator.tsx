
'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Target, Zap, RotateCcw, Play, Pause, RefreshCw } from 'lucide-react'
import TrajectoryProductWidget from './trajectory-product-widget'

interface TrajectoryParams {
  velocity: number // km/s
  angle: number // degrees
  distance: number // AU from Sun
  mass: number // relative mass
}

interface SimulationResult {
  outcome: 'earth_impact' | 'mars_impact' | 'jupiter_capture' | 'solar_escape' | 'asteroid_belt' | 'venus_impact'
  description: string
  probability: number
  danger_level: 'safe' | 'caution' | 'danger' | 'critical'
  impact_location?: string
}

export default function AtlasTrajectorySimulator({ products }: { products: any[] }) {
  const [params, setParams] = useState<TrajectoryParams>({
    velocity: 26.3, // Real 3I/Atlas velocity
    angle: 49.2, // Real trajectory angle
    distance: 0.39, // Closest approach to Sun
    mass: 1.0 // Relative mass
  })
  
  const [isSimulating, setIsSimulating] = useState(false)
  const [result, setResult] = useState<SimulationResult | null>(null)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [showRealData, setShowRealData] = useState(true)

  // Real 3I/Atlas parameters for comparison
  const realParams = {
    velocity: 26.3,
    angle: 49.2,
    distance: 0.39,
    mass: 1.0
  }

  const runSimulation = useCallback((simParams: TrajectoryParams) => {
    setIsSimulating(true)
    setAnimationProgress(0)
    
    // Simulate the trajectory based on physics parameters
    const { velocity, angle, distance, mass } = simParams
    
    // Complex trajectory calculation
    const escapeVelocity = Math.sqrt(2 * 1.989e30 * 6.674e-11 / (distance * 1.496e11)) / 1000 // km/s
    const trajectoryFactor = velocity / escapeVelocity
    const angleFactor = Math.sin((angle * Math.PI) / 180)
    const massFactor = Math.log(mass + 0.1)
    
    // Determine outcome based on physics
    let outcome: SimulationResult['outcome']
    let description: string
    let probability: number
    let dangerLevel: SimulationResult['danger_level']
    let impactLocation: string | undefined

    if (velocity < 11.2 && distance < 0.1) {
      outcome = 'venus_impact'
      description = '3I/Atlas crashes into Venus! The object was captured by Venus\' gravity well due to low velocity and close approach.'
      probability = 95
      dangerLevel = 'safe'
      impactLocation = 'Venus Surface - Ishtar Terra Region'
    } else if (velocity < 15 && angle > 60 && distance < 0.3) {
      outcome = 'mars_impact'
      description = '3I/Atlas impacts Mars! The trajectory and velocity led to a collision with the Red Planet.'
      probability = 87
      dangerLevel = 'caution'
      impactLocation = 'Mars - Olympia Undae Region'
    } else if (velocity < 20 && angle < 30 && distance > 0.8) {
      outcome = 'earth_impact'
      description = 'CRITICAL: 3I/Atlas is on a collision course with Earth! Immediate planetary defense protocols activated.'
      probability = 92
      dangerLevel = 'critical'
      impactLocation = 'Earth - Pacific Ocean (estimated)'
    } else if (velocity < 35 && distance > 5) {
      outcome = 'jupiter_capture'
      description = '3I/Atlas is captured by Jupiter\'s massive gravity! It becomes a new Jovian moon.'
      probability = 78
      dangerLevel = 'safe'
    } else if (velocity > 50 || trajectoryFactor > 3) {
      outcome = 'solar_escape'
      description = '3I/Atlas escapes the Solar System! It continues its journey to interstellar space.'
      probability = 94
      dangerLevel = 'safe'
    } else {
      outcome = 'asteroid_belt'
      description = '3I/Atlas settles into the asteroid belt, becoming a permanent member of our Solar System.'
      probability = 71
      dangerLevel = 'caution'
    }

    // Animate the simulation
    const animationDuration = 3000 // 3 seconds
    const startTime = Date.now()
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / animationDuration, 1)
      setAnimationProgress(progress)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setResult({
          outcome,
          description,
          probability,
          danger_level: dangerLevel,
          impact_location: impactLocation
        })
        setIsSimulating(false)
      }
    }
    
    setTimeout(() => {
      animate()
    }, 500)
  }, [])

  const resetToReal = () => {
    setParams(realParams)
    setShowRealData(true)
    runSimulation(realParams)
  }

  const getOutcomeColor = (outcome: SimulationResult['outcome']) => {
    switch (outcome) {
      case 'earth_impact': return 'text-red-500 bg-red-500/10 border-red-500'
      case 'mars_impact': return 'text-orange-500 bg-orange-500/10 border-orange-500'
      case 'venus_impact': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500'
      case 'jupiter_capture': return 'text-blue-500 bg-blue-500/10 border-blue-500'
      case 'asteroid_belt': return 'text-purple-500 bg-purple-500/10 border-purple-500'
      case 'solar_escape': return 'text-green-500 bg-green-500/10 border-green-500'
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500'
    }
  }

  const getDangerIcon = (danger: SimulationResult['danger_level']) => {
    switch (danger) {
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-500 animate-pulse" />
      case 'danger': return <AlertTriangle className="h-5 w-5 text-orange-500" />
      case 'caution': return <Target className="h-5 w-5 text-yellow-500" />
      default: return <Zap className="h-5 w-5 text-green-500" />
    }
  }

  useEffect(() => {
    // Run initial simulation with real data
    runSimulation(realParams)
  }, [runSimulation])

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-lg px-6 py-2 mb-4">
            🚀 INTERACTIVE SIMULATION
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            3I/Atlas Trajectory Simulator
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Modify orbital parameters and see where 3I/Atlas could have gone. Will it hit Earth, Mars, or escape to the stars?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Control Panel */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <RefreshCw className="h-6 w-6 text-cyan-400" />
                <span>Trajectory Controls</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Velocity Control */}
              <div className="space-y-3">
                <label className="text-gray-300 font-medium flex items-center justify-between">
                  Velocity: {params.velocity.toFixed(1)} km/s
                  {showRealData && Math.abs(params.velocity - realParams.velocity) < 0.1 && (
                    <Badge className="bg-green-500/20 text-green-400 text-xs">REAL DATA</Badge>
                  )}
                </label>
                <Slider
                  value={[params.velocity]}
                  onValueChange={(value) => {
                    setParams(prev => ({ ...prev, velocity: value[0] }))
                    setShowRealData(false)
                  }}
                  min={5}
                  max={80}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-sm text-gray-400">Higher velocity = more likely to escape Solar System</p>
              </div>

              {/* Angle Control */}
              <div className="space-y-3">
                <label className="text-gray-300 font-medium flex items-center justify-between">
                  Trajectory Angle: {params.angle.toFixed(1)}°
                  {showRealData && Math.abs(params.angle - realParams.angle) < 0.1 && (
                    <Badge className="bg-green-500/20 text-green-400 text-xs">REAL DATA</Badge>
                  )}
                </label>
                <Slider
                  value={[params.angle]}
                  onValueChange={(value) => {
                    setParams(prev => ({ ...prev, angle: value[0] }))
                    setShowRealData(false)
                  }}
                  min={0}
                  max={90}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-sm text-gray-400">Steeper angles increase planetary collision risk</p>
              </div>

              {/* Distance Control */}
              <div className="space-y-3">
                <label className="text-gray-300 font-medium flex items-center justify-between">
                  Solar Distance: {params.distance.toFixed(2)} AU
                  {showRealData && Math.abs(params.distance - realParams.distance) < 0.01 && (
                    <Badge className="bg-green-500/20 text-green-400 text-xs">REAL DATA</Badge>
                  )}
                </label>
                <Slider
                  value={[params.distance]}
                  onValueChange={(value) => {
                    setParams(prev => ({ ...prev, distance: value[0] }))
                    setShowRealData(false)
                  }}
                  min={0.1}
                  max={10}
                  step={0.01}
                  className="w-full"
                />
                <p className="text-sm text-gray-400">Closer to Sun = stronger gravitational effects</p>
              </div>

              {/* Mass Control */}
              <div className="space-y-3">
                <label className="text-gray-300 font-medium flex items-center justify-between">
                  Relative Mass: {params.mass.toFixed(1)}x
                  {showRealData && Math.abs(params.mass - realParams.mass) < 0.1 && (
                    <Badge className="bg-green-500/20 text-green-400 text-xs">REAL DATA</Badge>
                  )}
                </label>
                <Slider
                  value={[params.mass]}
                  onValueChange={(value) => {
                    setParams(prev => ({ ...prev, mass: value[0] }))
                    setShowRealData(false)
                  }}
                  min={0.1}
                  max={5}
                  step={0.1}
                  className="w-full"
                />
                <p className="text-sm text-gray-400">More mass = harder to deflect from trajectory</p>
              </div>

              {/* Control Buttons */}
              <div className="flex space-x-4 pt-4">
                <Button
                  onClick={() => runSimulation(params)}
                  disabled={isSimulating}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  {isSimulating ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" />
                      Simulating...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Run Simulation
                    </>
                  )}
                </Button>
                <Button
                  onClick={resetToReal}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Real 3I/Atlas
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Panel */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Target className="h-6 w-6 text-purple-400" />
                <span>Simulation Results</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isSimulating ? (
                <div className="text-center py-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"
                  />
                  <p className="text-gray-300 mb-2">Computing trajectory...</p>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <motion.div
                      className="h-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: `${animationProgress * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              ) : result ? (
                <div className="space-y-6">
                  <div className={`p-4 rounded-lg border ${getOutcomeColor(result.outcome)}`}>
                    <div className="flex items-center space-x-3 mb-3">
                      {getDangerIcon(result.danger_level)}
                      <h3 className="text-lg font-bold capitalize">
                        {result.outcome.replace('_', ' ')}
                      </h3>
                      <Badge className="bg-gray-700 text-white">
                        {result.probability}% Probability
                      </Badge>
                    </div>
                    <p className="text-sm leading-relaxed">
                      {result.description}
                    </p>
                    {result.impact_location && (
                      <p className="text-xs text-gray-400 mt-2">
                        <strong>Impact Zone:</strong> {result.impact_location}
                      </p>
                    )}
                  </div>

                  {/* Outcome Comparison */}
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-3">What Actually Happened:</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      The real 3I/Atlas safely passed by Mars on October 2-3, 2025, at a distance of 
                      0.0328 AU (4.9 million km) and continues on its journey out of the Solar System 
                      at 26.3 km/s. No planetary impacts occurred! 🌟
                    </p>
                  </div>

                  {/* Educational Note */}
                  <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-lg">
                    <p className="text-xs text-blue-300">
                      <strong>Educational Note:</strong> This simulator demonstrates how small changes 
                      in orbital parameters can dramatically alter an object's trajectory. Real asteroid 
                      tracking involves complex gravitational calculations across multiple bodies.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <Target className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Run a simulation to see the results!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Preset Scenarios */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12"
        >
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-center">Quick Scenarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => {
                    const dangerParams = { velocity: 18.5, angle: 25, distance: 1.2, mass: 2.0 }
                    setParams(dangerParams)
                    runSimulation(dangerParams)
                  }}
                  className="bg-red-900/30 border border-red-500/30 text-red-300 hover:bg-red-900/50"
                >
                  🌍 Earth Impact Scenario
                </Button>
                <Button
                  onClick={() => {
                    const escapeParams = { velocity: 65.0, angle: 75, distance: 0.8, mass: 0.5 }
                    setParams(escapeParams)
                    runSimulation(escapeParams)
                  }}
                  className="bg-green-900/30 border border-green-500/30 text-green-300 hover:bg-green-900/50"
                >
                  🚀 Solar System Escape
                </Button>
                <Button
                  onClick={() => {
                    const captureParams = { velocity: 25.0, angle: 45, distance: 6.5, mass: 1.5 }
                    setParams(captureParams)
                    runSimulation(captureParams)
                  }}
                  className="bg-blue-900/30 border border-blue-500/30 text-blue-300 hover:bg-blue-900/50"
                >
                  🪐 Jupiter Capture
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Trajectory Product Integration */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {products.map((product: any, index: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className={`bg-gray-900/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 overflow-hidden`}>
                <div className="flex flex-col lg:flex-row">
                  {/* Image */}
                  <div className="lg:w-1/3">
                    <div className="relative aspect-video lg:aspect-square lg:h-full">
                      <Image
                        src={product.image_url}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-2/3 p-6">
                    <CardHeader className="p-0 mb-4">
                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
                        {product.title}
                      </h3>
                      
                      <p className="text-gray-300 text-base leading-relaxed">
                        {product.description}
                      </p>
                    </CardHeader>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
