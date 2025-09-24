
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Copy, Play, Download, Clock, Eye, TrendingUp } from 'lucide-react'

const videoScripts = [
  {
    id: 1,
    title: "3I/Atlas: The Alien Visitor That Will SHOCK You! 👽",
    platform: "TikTok",
    duration: "15-30 seconds",
    hook: "POV: Scientists discover something that shouldn't exist...",
    script: `[SCENE 1 - Hook (0-3s)]
TEXT OVERLAY: "Scientists are FREAKING OUT"
VISUAL: Dramatic space scene with 3I/Atlas

[SCENE 2 - Problem/Mystery (3-8s)] 
TEXT: "This alien object contains atomic NICKEL"
VISUAL: Split screen - normal comet vs 3I/Atlas composition
VOICEOVER: "Something that's NEVER been found in our solar system"

[SCENE 3 - Revelation (8-15s)]
TEXT: "It's 4.6 BILLION years old!"
VISUAL: Timeline animation showing Earth formation
VOICEOVER: "This thing is older than Earth itself!"

[SCENE 4 - Urgency (15-25s)]
TEXT: "It's approaching MARS in 3 DAYS!"
VISUAL: 3I/Atlas trajectory animation
VOICEOVER: "And after this flyby, it's gone FOREVER"

[SCENE 5 - CTA (25-30s)]
TEXT: "Follow for daily space updates!"
VISUAL: Brand logo with cosmic background

AUDIO: Trending dramatic/suspenseful sound
EFFECTS: Fast cuts, zoom-ins, color highlights on key text`,
    engagement: "Projected: 50K+ views, 3K+ likes",
    tags: "#3IAtlas #AlienVisitor #SpaceNews #Mars #Interstellar #Viral #FYP #ScienceTok #SpaceAlert #Astronomy"
  },
  {
    id: 2,
    title: "I Tracked an Interstellar Visitor for 30 Days (Results Are INSANE)",
    platform: "YouTube",
    duration: "8-12 minutes",
    hook: "What I discovered will change how you see space forever...",
    script: `[INTRO - Hook & Setup (0-30s)]
"30 days ago, I started tracking something that shouldn't exist in our solar system. What I found will blow your mind."

VISUAL: Timelapse of telescope setup, night sky observations
B-ROLL: 3I/Atlas discovery announcement footage

[PART 1 - The Discovery (30s-2m)]
"Meet 3I/Atlas - our third confirmed interstellar visitor"
- Discovery timeline (July 2025)
- What makes it special vs previous visitors
- Size, speed, trajectory breakdown

VISUAL: Animated infographics, comparison charts
B-ROLL: NASA footage, telescope imagery

[PART 2 - The Tracking Process (2m-4m)]
"Here's how I tracked this cosmic visitor every single night"
- Equipment used (telescope specs, cameras)
- Observation challenges (weather, moon phases)
- Data collection methods

VISUAL: Behind-the-scenes footage, equipment close-ups
B-ROLL: Night photography setup, weather challenges

[PART 3 - Mind-Blowing Discoveries (4m-7m)]
"The composition analysis results are absolutely insane"
- Atomic nickel revelation
- Exotic ice compounds  
- Age estimates (4.6-8 billion years)
- What this means for science

VISUAL: Spectroscopy data, scientific papers
B-ROLL: Laboratory footage, Hubble telescope imagery

[PART 4 - Mars Flyby Predictions (7m-9m)]
"Here's what's going to happen when it reaches Mars"
- Trajectory analysis
- Expected interactions
- Observation opportunities
- Why this matters

VISUAL: 3D trajectory animations, Mars orbital mechanics
B-ROLL: Mars mission footage, ground telescope network

[PART 5 - The Bigger Picture (9m-11m)]
"This changes everything we thought we knew about the galaxy"
- Population estimates
- Future implications
- Next expected visitors
- How you can get involved

VISUAL: Galaxy-wide animations, citizen science platforms
B-ROLL: Observatory footage, amateur astronomy community

[OUTRO - CTA & Product Placement (11m-12m)]
"I've created a limited collection celebrating this historic visitor"
- Brief product showcase
- Subscribe for Mars flyby coverage
- Links in description

VISUAL: Product montage, channel trailer
AUDIO: Uplifting space music

SEO KEYWORDS: 3I/Atlas, interstellar visitor, Mars flyby, space tracking, astronomy, cosmic discovery`,
    engagement: "Projected: 100K+ views, 8K+ likes, 500+ comments",
    tags: "#3IAtlas #InterstellarVisitor #SpaceTracking #Mars #Astronomy #SpaceScience #CosmicDiscovery #NASA #SpaceNews #ScienceExplained"
  },
  {
    id: 3,
    title: "Reacting to 3I/Atlas Composition Results (Scientists are SHOOK)",
    platform: "YouTube Shorts",
    duration: "45-60 seconds",
    hook: "When scientists saw the composition data, they couldn't believe it...",
    script: `[SCENE 1 - Setup (0-5s)]
TEXT: "Scientists analyzing 3I/Atlas composition"
VISUAL: Scientist looking at computer screen
AUDIO: Suspenseful build-up music

[SCENE 2 - First Reaction (5-15s)]
TEXT: "Results show atomic NICKEL"
VISUAL: Reaction face - shock/disbelief
VOICEOVER: "Wait... that's impossible"

[SCENE 3 - Explanation (15-35s)]
TEXT: "This has NEVER been found in solar system comets"
VISUAL: Split screen comparison - normal vs 3I/Atlas
VOICEOVER: "This means it formed in a completely different stellar environment"

[SCENE 4 - Age Reveal (35-50s)]
TEXT: "Carbon dating shows 4.6-8 BILLION years old"
VISUAL: Timeline animation
VOICEOVER: "This thing could be older than our entire solar system!"

[SCENE 5 - Impact (50-60s)]
TEXT: "This changes EVERYTHING we know about interstellar space"
VISUAL: Galaxy animation with objects between stars
VOICEOVER: "Follow for more mind-blowing space discoveries"

AUDIO: Trending "Oh No" or dramatic reveal sound
EFFECTS: Quick cuts, zoom-ins, reaction elements`,
    engagement: "Projected: 500K+ views, 40K+ likes, 2K+ shares",
    tags: "#3IAtlas #SpaceShock #InterstellarVisitor #ScienceReaction #SpaceNews #Astronomy #AlienVisitor #MindBlown #Shorts #Viral"
  },
  {
    id: 4,
    title: "Day in the Life: Tracking an Alien Visitor to Mars",
    platform: "Instagram Reels",
    duration: "30-45 seconds",
    hook: "Come with me to track 3I/Atlas on its historic Mars flyby...",
    script: `[SCENE 1 - Morning Setup (0-8s)]
TEXT: "4 AM: Setting up to track alien visitor"
VISUAL: Timelapse telescope setup in darkness
MUSIC: Aesthetic/cinematic morning vibes

[SCENE 2 - Coffee & Research (8-15s)]
TEXT: "Checking latest trajectory data"
VISUAL: Coffee cup, computer screen with orbital mechanics
MUSIC: Continues with gentle build

[SCENE 3 - First Light Observations (15-25s)]
TEXT: "3I/Atlas is now 20M miles from Mars"
VISUAL: Telescope eyepiece view, faint dot moving
MUSIC: Builds to more dramatic

[SCENE 4 - Data Collection (25-35s)]
TEXT: "Recording historic moment"
VISUAL: Camera attachments, long exposure photography
MUSIC: Peak dramatic moment

[SCENE 5 - Results & Reflection (35-45s)]
TEXT: "Witnessing 4.6 billion year journey"
VISUAL: Final image processing, beautiful space photo
MUSIC: Emotional/inspiring conclusion

OVERLAY ELEMENTS:
- Time stamps throughout
- Distance counters
- Equipment specs
- Aesthetic space graphics

HASHTAGS: #3IAtlas #SpaceAesthetics #Astronomy #MarsFlyby #InterstellarVisitor #GRWM #DayInTheLife #SpaceContent #CosmicVibes`,
    engagement: "Projected: 200K+ views, 15K+ likes, 1K+ saves",
    tags: "#3IAtlas #SpaceAesthetics #Astronomy #MarsFlyby #InterstellarVisitor #GRWM #DayInTheLife #SpaceContent #CosmicVibes #Reels"
  }
]

export default function VideoContentScripts() {
  const [copiedScript, setCopiedScript] = useState<number | null>(null)

  const copyToClipboard = (script: string, id: number) => {
    navigator.clipboard.writeText(script)
    setCopiedScript(id)
    setTimeout(() => setCopiedScript(null), 2000)
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Viral Video Content Scripts
        </h2>
        <p className="text-gray-400">
          Professional scripts optimized for maximum engagement and viral potential
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {videoScripts.map((video) => (
          <Card key={video.id} className="bg-gray-900/50 border-gray-700 hover:border-purple-500/50 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className={`${
                  video.platform === 'TikTok' ? 'bg-pink-500/20 text-pink-400 border-pink-500/30' :
                  video.platform === 'YouTube' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                  video.platform === 'Instagram Reels' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                  'bg-blue-500/20 text-blue-400 border-blue-500/30'
                }`}>
                  {video.platform}
                </Badge>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-400 hover:bg-gray-800"
                    onClick={() => copyToClipboard(video.script, video.id)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    {copiedScript === video.id ? 'Copied!' : 'Copy Script'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-400 hover:bg-gray-800"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">
                {video.title}
              </h3>
              
              <div className="flex items-center space-x-4 text-sm text-gray-400 mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{video.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Play className="h-3 w-3" />
                  <span>Ready to film</span>
                </div>
              </div>
              
              <p className="text-purple-400 font-semibold text-sm mb-4">
                Hook: "{video.hook}"
              </p>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-6">
                {/* Script Content */}
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-3">Full Script:</h4>
                  <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono leading-relaxed max-h-96 overflow-y-auto">
                    {video.script}
                  </pre>
                </div>
                
                {/* Hashtags */}
                <div className="bg-blue-900/20 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-400 mb-2">Hashtags:</h4>
                  <p className="text-sm text-blue-300 font-mono">
                    {video.tags}
                  </p>
                </div>
                
                {/* Engagement Projection */}
                <div className="bg-green-900/20 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">Engagement Projection:</h4>
                  <p className="text-sm text-green-300">
                    {video.engagement}
                  </p>
                </div>
                
                {/* Performance Metrics */}
                <div className="flex items-center justify-between text-sm text-gray-400 pt-2 border-t border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4 text-purple-400" />
                      <span>High Viral Potential</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span>Trending Topic</span>
                    </div>
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                    Ready to Film
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Production Tips */}
      <Card className="mt-12 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-purple-500/30">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-white mb-6">
            Video Production Tips for Maximum Viral Potential
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h4 className="font-bold text-pink-400 mb-3">📱 TikTok Success</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Hook viewers in first 3 seconds</li>
                <li>• Use trending sounds and effects</li>
                <li>• Vertical 9:16 aspect ratio</li>
                <li>• Quick cuts keep attention</li>
                <li>• Post when target audience is online</li>
                <li>• Engage with comments immediately</li>
              </ul>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h4 className="font-bold text-red-400 mb-3">📺 YouTube Optimization</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Eye-catching thumbnails essential</li>
                <li>• SEO-optimized titles and descriptions</li>
                <li>• Strong hook in first 15 seconds</li>
                <li>• Include relevant keywords</li>
                <li>• Add timestamps for longer videos</li>
                <li>• End screens drive subscriptions</li>
              </ul>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h4 className="font-bold text-purple-400 mb-3">📸 Instagram Reels</h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Aesthetic visuals perform best</li>
                <li>• Use all 30 hashtags strategically</li>
                <li>• Trending audio increases reach</li>
                <li>• Stories drive traffic to reels</li>
                <li>• Collaborate with influencers</li>
                <li>• Cross-promote to feed posts</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
            <h4 className="font-bold text-yellow-400 mb-2">⚡ Pro Tip for 3I/Atlas Content</h4>
            <p className="text-sm text-yellow-300">
              The Mars flyby (Oct 2-3) and perihelion (Oct 29-30) are peak viral moments. 
              Pre-schedule content to drop during these astronomical events when interest peaks. 
              Real-time updates and live reactions perform exceptionally well during space events.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
