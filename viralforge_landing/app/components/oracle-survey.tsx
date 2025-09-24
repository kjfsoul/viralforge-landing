
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Sparkles, Eye, Gem, Moon } from 'lucide-react'

interface SurveyData {
  name: string
  email: string
  birthMonth: string
  currentFocus: string
  energyLevel: string
}

interface OracleSurveyProps {
  onComplete: (data: SurveyData) => void
  onSkip: () => void
}

export default function OracleSurvey({ onComplete, onSkip }: OracleSurveyProps) {
  const [step, setStep] = useState(1)
  const [surveyData, setSurveyData] = useState<SurveyData>({
    name: '',
    email: '',
    birthMonth: '',
    currentFocus: '',
    energyLevel: ''
  })

  const totalSteps = 5

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    } else {
      onComplete(surveyData)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const updateSurveyData = (key: keyof SurveyData, value: string) => {
    setSurveyData(prev => ({ ...prev, [key]: value }))
  }

  const canProceed = () => {
    switch (step) {
      case 1: return surveyData.name.trim() !== ''
      case 2: return surveyData.email.trim() !== ''
      case 3: return surveyData.birthMonth !== ''
      case 4: return surveyData.currentFocus !== ''
      case 5: return surveyData.energyLevel !== ''
      default: return false
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-black/80 border border-purple-500/30 backdrop-blur-md">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Eye className="h-6 w-6 text-purple-400 animate-pulse" />
            <CardTitle className="text-xl text-white">
              3I/Atlas Oracle Attunement
            </CardTitle>
            <Gem className="h-6 w-6 text-cyan-400 animate-pulse" />
          </div>
          <div className="flex justify-center space-x-1 mb-4">
            {[...Array(totalSteps)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i + 1 <= step ? 'bg-purple-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-300">
            Step {step} of {totalSteps} - The Oracle must attune to your cosmic frequency
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <Sparkles className="h-8 w-8 text-purple-400 mx-auto mb-2 animate-pulse" />
                  <p className="text-gray-300 text-sm">
                    The Oracle needs to know your name to align with your energy signature...
                  </p>
                </div>
                <div>
                  <Label htmlFor="name" className="text-gray-200 text-sm">
                    What name should the Oracle use?
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name..."
                    value={surveyData.name}
                    onChange={(e) => updateSurveyData('name', e.target.value)}
                    className="bg-gray-900/50 border-gray-700 text-white mt-2"
                    autoFocus
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <Moon className="h-8 w-8 text-cyan-400 mx-auto mb-2 animate-pulse" />
                  <p className="text-gray-300 text-sm">
                    Your email creates a quantum entanglement with the reading...
                  </p>
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-200 text-sm">
                    Email address for your reading:
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={surveyData.email}
                    onChange={(e) => updateSurveyData('email', e.target.value)}
                    className="bg-gray-900/50 border-gray-700 text-white mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    You'll be connected to Mystic Arcana for deeper cosmic insights & oracle readings
                  </p>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <Gem className="h-8 w-8 text-purple-400 mx-auto mb-2 animate-pulse" />
                  <p className="text-gray-300 text-sm">
                    Your birth month determines your cosmic resonance frequency...
                  </p>
                </div>
                <div>
                  <Label className="text-gray-200 text-sm mb-4 block">
                    Which month were you born?
                  </Label>
                  <RadioGroup
                    value={surveyData.birthMonth}
                    onValueChange={(value) => updateSurveyData('birthMonth', value)}
                    className="grid grid-cols-2 gap-2"
                  >
                    {[
                      'January', 'February', 'March', 'April',
                      'May', 'June', 'July', 'August',
                      'September', 'October', 'November', 'December'
                    ].map(month => (
                      <div key={month} className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={month} 
                          id={month.toLowerCase()}
                          className="border-gray-600 text-purple-400"
                        />
                        <Label 
                          htmlFor={month.toLowerCase()}
                          className="text-sm text-gray-300 cursor-pointer"
                        >
                          {month}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <Eye className="h-8 w-8 text-cyan-400 mx-auto mb-2 animate-pulse" />
                  <p className="text-gray-300 text-sm">
                    The Oracle sees what occupies your thoughts most deeply...
                  </p>
                </div>
                <div>
                  <Label className="text-gray-200 text-sm mb-4 block">
                    What is your main focus right now?
                  </Label>
                  <RadioGroup
                    value={surveyData.currentFocus}
                    onValueChange={(value) => updateSurveyData('currentFocus', value)}
                    className="space-y-2"
                  >
                    {[
                      'Career & Success',
                      'Love & Relationships', 
                      'Health & Wellness',
                      'Spiritual Growth',
                      'Financial Security',
                      'Creative Expression',
                      'Family & Home',
                      'Personal Freedom'
                    ].map(focus => (
                      <div key={focus} className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={focus} 
                          id={focus.toLowerCase().replace(/\s+/g, '-')}
                          className="border-gray-600 text-purple-400"
                        />
                        <Label 
                          htmlFor={focus.toLowerCase().replace(/\s+/g, '-')}
                          className="text-sm text-gray-300 cursor-pointer"
                        >
                          {focus}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <Sparkles className="h-8 w-8 text-purple-400 mx-auto mb-2 animate-pulse" />
                  <p className="text-gray-300 text-sm">
                    Your energy signature is the final piece of the cosmic puzzle...
                  </p>
                </div>
                <div>
                  <Label className="text-gray-200 text-sm mb-4 block">
                    How would you describe your current energy?
                  </Label>
                  <RadioGroup
                    value={surveyData.energyLevel}
                    onValueChange={(value) => updateSurveyData('energyLevel', value)}
                    className="space-y-2"
                  >
                    {[
                      'High & Motivated',
                      'Steady & Focused', 
                      'Reflective & Calm',
                      'Restless & Seeking',
                      'Tired & Overwhelmed',
                      'Curious & Exploring'
                    ].map(energy => (
                      <div key={energy} className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value={energy} 
                          id={energy.toLowerCase().replace(/\s+/g, '-')}
                          className="border-gray-600 text-purple-400"
                        />
                        <Label 
                          htmlFor={energy.toLowerCase().replace(/\s+/g, '-')}
                          className="text-sm text-gray-300 cursor-pointer"
                        >
                          {energy}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-between pt-6">
            {step > 1 && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Back
              </Button>
            )}
            <div className="flex space-x-2 ml-auto">
              <Button
                onClick={onSkip}
                variant="ghost"
                className="text-gray-500 hover:text-gray-300"
              >
                Skip Survey
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 disabled:opacity-50"
              >
                {step === totalSteps ? 'Draw My Card' : 'Next'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
