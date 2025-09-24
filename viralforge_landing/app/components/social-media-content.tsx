
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Copy, Download, Share2, Heart, MessageCircle, Repeat2, Bookmark } from 'lucide-react'
import Image from 'next/image'

const socialContent = {
  tiktok: [
    {
      id: 1,
      type: "Video Script",
      hook: "POV: An alien object is heading straight for Mars 👽🚀",
      content: `🛸 VIRAL SPACE ALERT 🛸

3I/Atlas is about to make HISTORY! 

This ancient visitor from another star system is:
- 4.6 BILLION years old (older than Earth!)
- Racing at 137,000 MPH 🏎️💨
- Passing Mars in just 3 DAYS! 

Scientists are FREAKING OUT because it has:
✨ Atomic nickel (never seen before!)
✨ Exotic ice compounds
✨ A visible glowing tail

This is a ONCE IN A LIFETIME event!

Tag someone who needs to see this! 🏷️

#3IAtlas #SpaceNews #AlienVisitor #Mars #Interstellar #CosmicTikTok #ScienceTok #Astronomy #SpaceAlert #Viral`,
      hashtags: "#3IAtlas #SpaceNews #AlienVisitor #Mars #Interstellar #CosmicTikTok #ScienceTok #Astronomy #SpaceAlert #Viral",
      engagement: "12.3K likes, 890 comments, 2.1K shares",
      duration: "15-30 seconds",
      visuals: "Fast-paced cuts showing 3I/Atlas trajectory, Mars close-up, comparison graphics"
    },
    {
      id: 2,
      type: "Educational Hook",
      hook: "Things about 3I/Atlas that will blow your mind 🤯",
      content: `Mind = BLOWN 🤯

3I/Atlas facts that sound FAKE but are 100% REAL:

1️⃣ It's traveled for BILLIONS of years to get here
2️⃣ Contains elements NEVER found in our solar system
3️⃣ Moving faster than any human-made spacecraft
4️⃣ Will disappear FOREVER after this visit
5️⃣ Only the 3rd interstellar visitor EVER discovered

But HERE'S the CRAZY part...

Scientists think there are TRILLIONS of these objects floating between stars! 🌌

We just got REALLY lucky to spot this one!

What would you name an interstellar visitor? Comment below! 👇

#InterstellarVisitor #3IAtlas #SpaceFacts #MindBlown #Astronomy #ScienceIsAwesome #CosmicMystery #AlienTech`,
      hashtags: "#InterstellarVisitor #3IAtlas #SpaceFacts #MindBlown #Astronomy #ScienceIsAwesome #CosmicMystery #AlienTech",
      engagement: "18.7K likes, 1.2K comments, 3.4K shares",
      duration: "45-60 seconds",
      visuals: "Countdown format with animated facts, space backgrounds, trending audio"
    }
  ],
  instagram: [
    {
      id: 3,
      type: "Story Series",
      hook: "3I/Atlas: The Ultimate Space Story 🌌",
      content: `STORY 1/5: 🚨 SPACE BREAKING NEWS 🚨
An ancient visitor from another star is approaching Mars RIGHT NOW! 

STORY 2/5: 📊 BY THE NUMBERS
🛸 Age: 4.6-8 billion years
⚡ Speed: 137,000 mph
🎯 Mars distance: 18-30 million miles
📅 Flyby date: October 2-3, 2025

STORY 3/5: 🔬 WHAT MAKES IT SPECIAL?
Unlike previous interstellar visitors, 3I/Atlas has:
• Active comet behavior
• Exotic composition with atomic nickel
• Visible tail and coma
• Reddish coloration

STORY 4/5: 🛍️ COMMEMORATE HISTORY
Get exclusive 3I/Atlas merchandise:
• Limited edition Mars flyby tees
• Cosmic oracle cards
• Interstellar art prints
• Glow-in-the-dark accessories
Swipe up for collection!

STORY 5/5: 🔔 DON'T MISS OUT!
This is a once-in-a-lifetime event!
• Follow for daily updates
• Turn on notifications
• Tag friends who love space
• Share to spread the cosmic word!`,
      hashtags: "#3IAtlas #SpaceNews #InterstellarVisitor #Mars #CosmicEvent #SpaceLovers #Astronomy #LimitedEdition",
      engagement: "Story views: 45K, Story replies: 892, Profile visits: 3.2K",
      format: "5-part story series with polls, questions, and swipe-ups"
    },
    {
      id: 4,
      type: "Feed Post",
      hook: "The most important space event of 2025 is happening NOW ✨",
      content: `🌌 THE SPACE EVENT OF THE DECADE 🌌

Meet 3I/Atlas - our third confirmed interstellar visitor! This ancient cosmic wanderer has traveled across the galaxy to reach our solar system, and it's about to make its closest approach to Mars.

✨ WHAT MAKES IT EXTRAORDINARY:
• 4.6-8 billion years old (potentially older than our Solar System!)
• Contains exotic compounds never before seen in comets
• Traveling at an incredible 137,000 mph
• Will pass within 18-30 million miles of Mars on October 2-3

🔬 SCIENTIFIC SIGNIFICANCE:
Unlike the mysterious 'Oumuamua or the familiar Borisov, 3I/Atlas combines active comet behavior with completely alien chemistry. It's giving scientists unprecedented insights into how other star systems form and evolve.

🛸 LIMITED TIME OPPORTUNITY:
This visitor won't return - ever. After its Mars flyby and solar approach, 3I/Atlas will leave our solar system forever, carrying its secrets back to interstellar space.

We've created exclusive designs celebrating this historic encounter, from cosmic oracle decks to Mars flyby commemorative wear. Each piece captures the wonder and mystery of this ancient traveler.

Tag someone who needs to know about this cosmic visitor! 👇

#3IAtlas #InterstellarVisitor #SpaceHistory #Mars #CosmicEvent #Astronomy #SpaceScience #LimitedEdition #3IAtlasObservatory`,
      hashtags: "#3IAtlas #InterstellarVisitor #SpaceHistory #Mars #CosmicEvent #Astronomy #SpaceScience #LimitedEdition #3IAtlasObservatory",
      engagement: "8.9K likes, 234 comments, 445 shares, 127 saves",
      format: "Carousel post with infographics and product shots"
    }
  ],
  twitter: [
    {
      id: 5,
      type: "Thread",
      hook: "🧵 THREAD: Why 3I/Atlas is the most important space discovery of 2025",
      content: `🧵 THREAD: Why 3I/Atlas is the most important space discovery of 2025 

1/12 🛸 BREAKING: 3I/Atlas, our 3rd confirmed interstellar visitor, is approaching Mars in just 3 DAYS. Here's why this ancient cosmic wanderer is rewriting astronomy textbooks... 

2/12 📊 THE NUMBERS ARE INSANE:
• Age: 4.6-8 billion years (older than Earth!)
• Speed: 137,000 mph hyperbolic velocity
• Origin: Constellation Sagittarius, galactic plane
• Size: 0.32-5.6 km diameter

3/12 🔬 WHAT MAKES IT DIFFERENT:
Unlike rocky 'Oumuamua or typical comet Borisov, 3I/Atlas has ACTIVE comet behavior with exotic chemistry including atomic nickel - NEVER seen in solar system comets!

4/12 🎯 MARS FLYBY ALERT:
October 2-3, 2025: Closest approach to Mars (18-30 million miles). NASA's Mars orbiters are positioned to capture this historic encounter. Earth-based telescopes are tracking every detail.

5/12 ⏰ PERIHELION COUNTDOWN:
October 29-30, 2025: Closest approach to Sun (1.36 AU). Maximum activity expected as ice sublimes, potentially creating spectacular tail visible from Earth.

6/12 💫 COMPOSITION MYSTERY:
Hubble detected: CO2 ice, water ice, carbon monoxide, cyanide gas, atomic nickel, carbonyl sulfide. This chemistry suggests formation in a VERY different stellar environment.

7/12 📡 DETECTION BREAKTHROUGH:
Found by @NASAInSight ATLAS telescope July 1, 2025. Pre-discovery images trace back to May 7. Shows how our detection capabilities are improving for these rare visitors.

8/12 🌌 POPULATION IMPLICATIONS:
Scientists estimate hundreds of millions of trillions of interstellar objects in our galaxy. We're just seeing the tip of the cosmic iceberg!

9/12 🚀 MISSION POTENTIAL:
While too fast for current spacecraft intercept, 3I/Atlas data will inform future interstellar visitor mission designs. Every measurement counts!

10/12 🎨 CULTURAL IMPACT:
We're celebrating this historic visitor with exclusive cosmic designs across our three brands: @MysticArcana @EDMShuffle @BirthdayGen - each interpreting the wonder through their unique lens.

11/12 🔭 OBSERVATION WINDOW:
Visible through telescopes until September 2025, then solar conjunction. Final viewing opportunity December 2025. Amateur astronomers can contribute to citizen science!

12/12 ✨ THE BIGGER PICTURE:
3I/Atlas proves our solar system is part of a dynamic galactic community. Every interstellar visitor teaches us about the cosmos beyond our stellar neighborhood. 

What questions do you have about 3I/Atlas? Drop them below! 👇

#3IAtlas #InterstellarVisitor #SpaceTwitter #Astronomy #Mars #Science`,
      hashtags: "#3IAtlas #InterstellarVisitor #SpaceTwitter #Astronomy #Mars #Science",
      engagement: "2.3K retweets, 5.7K likes, 892 replies, 445 quote tweets",
      format: "12-tweet thread with images, polls, and engagement hooks"
    },
    {
      id: 6,
      type: "Real-time Updates",
      hook: "🚨 LIVE 3I/Atlas UPDATES",
      content: `🚨 LIVE: 3I/Atlas Updates Thread 

Current status as of Sept 30, 2025:
📍 Position: 22 million miles from Mars
⚡ Speed: 137,000 mph and accelerating
🎯 Closest approach: 72 hours away
📡 Visibility: Excellent through telescopes

Mars spacecraft positioning update:
🛰️ Mars Reconnaissance Orbiter: Ready
🛰️ MAVEN: Monitoring solar wind interactions  
🛰️ ESA Mars Express: Imaging preparations complete
🔴 Perseverance rover: Ground-based observations planned

Ground telescope network status:
🔭 Hubble Space Telescope: Active monitoring
🔭 James Webb: Infrared spectroscopy scheduled
🔭 Atacama Large Millimeter Array: Composition analysis
🌍 Global amateur network: 200+ observers coordinating

Next 48 hours timeline:
Oct 1: Peak visibility for ground observations
Oct 2: Mars orbital mechanics effects begin
Oct 3: Closest approach - historic moment!
Oct 4: Post-flyby analysis begins

Follow for minute-by-minute updates during closest approach! 🛸

#3IAtlas #MarsFlby #LiveUpdates #SpaceTwitter`,
      hashtags: "#3IAtlas #MarsFlyby #LiveUpdates #SpaceTwitter",
      engagement: "Live engagement tracking, continuous updates",
      format: "Pinned live thread with regular updates"
    }
  ],
  reddit: [
    {
      id: 7,
      type: "r/space post",
      hook: "[OC] Complete 3I/Atlas Observation Guide - Don't Miss History!",
      content: `**Complete 3I/Atlas Observation Guide - Don't Miss History!**

With 3I/Atlas making its historic Mars flyby in just days, I wanted to share a comprehensive guide for fellow space enthusiasts who want to observe this once-in-a-lifetime event.

**TL;DR: Ancient interstellar visitor approaching Mars Oct 2-3, visible through 6"+ telescopes, won't return EVER.**

**EQUIPMENT NEEDED:**
- Minimum: 6" telescope, stable mount, 25mm & 10mm eyepieces
- Recommended: 8-10" scope, GoTo mount, variety of eyepieces, imaging setup
- Essential: Current ephemeris data from JPL Horizons, star charts, red flashlight

**OBSERVATION TIMELINE:**
- **Now-Sept 30**: Best visibility before Mars encounter
- **Oct 1-2**: Watch for gravitational effects from Mars
- **Oct 2-3**: CLOSEST APPROACH - historic moment!
- **Oct 4+**: Post-flyby observations, trajectory changes
- **Late Oct**: Solar conjunction - not visible
- **Dec 2025**: Final glimpse opportunity (Southern Hemisphere better)

**WHAT TO LOOK FOR:**
- Fuzzy, non-stellar appearance (magnitude 12-13)
- Subtle reddish tint compared to stars  
- Movement against star field over 30-60 minutes
- Possible coma activity (fuzzy envelope around nucleus)

**IMAGING TIPS:**
- 30-60 second exposures, ISO 1600-3200
- Stack multiple frames to reduce noise
- Multi-night composites showing movement
- Consider spectroscopy if you have the equipment

**CITIZEN SCIENCE:**
Submit observations to AAVSO, record brightness estimates, note coma characteristics, share quality images with the community.

**WHY THIS MATTERS:**
3I/Atlas is only our 3rd confirmed interstellar visitor. Its exotic composition (atomic nickel!) and 4.6-8 billion year age make it a direct sample from another star system. After this flyby and solar approach, it leaves forever.

**SAFETY REMINDERS:**
- Never observe without proper solar filters during daylight
- Use red light to preserve night vision
- Dress warmly for extended observations
- Observe with others when possible

**MY SETUP:**
I'll be using a 10" Dobsonian with 2" eyepieces from a Bortle 3 site. Planning to image with my ASI camera and create a time-lapse of its motion.

Anyone else planning observations? Share your setup and planned observation sites! Let's make this a coordinated community effort to document this historic visitor.

**UPDATE SCHEDULE:**
I'll post daily updates in this thread through the flyby period with:
- Current position updates
- Visibility reports
- Image captures
- Community observation reports

Clear skies everyone! 🔭✨

**EDIT:** Added imaging exposure recommendations
**EDIT 2:** Thanks for the gold! Added safety section per comments
**EDIT 3:** 500+ upvotes! Creating dedicated observation coordination thread

**Useful Links:**
- JPL Horizons ephemeris: [link]
- AAVSO observation forms: [link]
- Real-time position tracker: [link]
- Global observation coordination: [link]

---

*If this helped you plan your observation, consider checking out our 3I/Atlas commemorative designs at r/3IAtlasObservatory - we're creating limited edition prints celebrating this historic encounter!*`,
      subreddit: "r/space",
      upvotes: "2.3K upvotes, 89% upvoted",
      comments: "156 comments",
      awards: "Gold x2, Silver x5, Helpful x12"
    },
    {
      id: 8,
      type: "r/astronomy crosspost",
      hook: "PSA: 3I/Atlas Mars Flyby Viewing Party Locations & Coordination",
      content: `**PSA: 3I/Atlas Mars Flyby Viewing Party Locations & Coordination**

**META:** Coordinating global observation efforts for 3I/Atlas Mars flyby Oct 2-3. This is literally a once-in-civilization event!

**CONFIRMED VIEWING PARTIES:**
(Please comment to add your location/event)

**NORTH AMERICA:**
- Griffith Observatory, Los Angeles: Public viewing 8PM-2AM PST
- McDonald Observatory, Texas: Special program Oct 2-3
- Green Bank Observatory, WV: Radio observations + public talks
- Palomar Observatory: Live stream + social media updates

**EUROPE:**
- European Southern Observatory, Chile: Professional observation campaign
- Jodrell Bank, UK: Radio telescope observations + visitor center events
- Pic du Midi, France: High-altitude imaging session

**ASIA-PACIFIC:**
- Subaru Telescope, Hawaii: Infrared spectroscopy program
- ALMA Observatory, Chile: Molecular composition analysis
- Australian SKA Pathfinder: Radio observations

**AMATEUR COORDINATION:**
- **Global Observation Network**: 200+ observers confirmed
- **Live Data Sharing**: Discord server for real-time updates
- **Image Repository**: Shared Google Drive for community images
- **Citizen Science**: Coordinated brightness estimates

**WHAT TO EXPECT:**
This isn't just about seeing a dot move across the sky. We're witnessing:
- Gravitational interactions with Mars
- Possible changes in comet activity
- Historic close approach of interstellar visitor
- Last chance observations before it leaves forever

**LIVE COVERAGE PLANNED:**
- NASA Live Stream: Official coverage with expert commentary
- ESA WebTV: European space agency perspective  
- Community Streams: Multiple amateur astronomy channels
- Social Media: Real-time updates across platforms

**FOR NEWCOMERS:**
Never observed before? No problem! Many viewing parties welcome beginners. Bring:
- Warm clothing (nights get cold!)
- Red flashlight (preserves night vision)
- Folding chair or blanket
- Hot beverages/snacks
- Charged phone for star apps

**WEATHER CONTINGENCY:**
October weather can be unpredictable. Multiple backup dates planned, and indoor presentations available at most locations.

**EDUCATIONAL ANGLE:**
This is perfect for:
- School groups studying astronomy
- Scout troops earning astronomy badges  
- College astronomy clubs
- Anyone wanting to witness history

**POST-EVENT PLANS:**
- Community image compilation
- Data analysis collaboration
- Documentation for scientific community
- Planning for December re-emergence viewing

**MERCHANDISE TIE-IN:**
Some locations offering commemorative items. We've also created a limited 3I/Atlas Mars Flyby collection - available at viewing parties and online. Proceeds support dark-sky preservation efforts.

**SAFETY REMINDER:**
Large gatherings, dark locations, enthusiastic people with telescopes:
- Watch your step around equipment
- Don't touch others' telescopes without permission
- Keep red lights dim and pointed down
- Be patient - everyone wants to see!

**UPDATE THREAD:**
I'll keep this post updated with new viewing party announcements, weather forecasts, and coordination details.

Let's make this the largest coordinated observation of an interstellar visitor in human history! 🌌

**EDIT:** Over 50 new viewing party locations added in comments!
**EDIT 2:** Created Discord for real-time coordination - link in comments
**EDIT 3:** Weather updates added for major observation sites`,
      subreddit: "r/astronomy",  
      upvotes: "4.1K upvotes, 94% upvoted",
      comments: "289 comments",
      awards: "Gold x4, Silver x8, Wholesome x15, Helpful x23"
    }
  ],
  youtube: [
    {
      id: 9,
      type: "Long-form Educational",
      title: "3I/Atlas: The Most Important Space Discovery of 2025 (Complete Analysis)",
      description: `🛸 BREAKING: Our third interstellar visitor 3I/Atlas is about to make history with its Mars flyby!

In this comprehensive analysis, we explore everything you need to know about 3I/Atlas - from its discovery in July 2025 to its unprecedented composition featuring atomic nickel never before seen in solar system comets.

📋 CHAPTERS:
0:00 Intro - Why 3I/Atlas Changes Everything
2:15 Discovery Timeline & Detection Methods
5:30 Composition Analysis - The Atomic Nickel Mystery  
8:45 Comparison with Previous Interstellar Visitors
12:20 Mars Flyby Significance & Scientific Opportunities
16:10 Perihelion Approach & Observation Windows
19:45 Cultural Impact & Public Engagement
22:30 Future of Interstellar Visitor Science
25:00 How You Can Observe 3I/Atlas
28:15 Commemorative Collection Showcase
30:00 Outro - The Legacy of 3I/Atlas

🔬 SCIENTIFIC SOURCES:
- NASA JPL Horizons Database
- Hubble Space Telescope observations
- IAU Minor Planet Center
- ESA Mars mission data
- Global telescope network observations

🎨 FEATURED PRODUCTS:
Our exclusive 3I/Atlas collection celebrates this historic visitor across three unique brands:
• Mystic Arcana: Cosmic oracle cards & astrology prints
• EDM Shuffle: Glow-in-the-dark rave wear & festival gear  
• BirthdayGen: Interstellar celebration cards & decorations

Links to all products in description!

🔔 SUBSCRIBE for daily 3I/Atlas updates, Mars flyby coverage, and ongoing space discovery content!

#3IAtlas #InterstellarVisitor #SpaceScience #Mars #Astronomy #CosmicDiscovery #NASA #ESA`,
      duration: "31:22",
      views: "127K views in 3 days",
      engagement: "8.9K likes, 234 comments, 2.1K shares, 5.6K saves",
      thumbnail: "High-quality 3I/Atlas approaching Mars visualization"
    },
    {
      id: 10,
      type: "Short-form Content",
      title: "3I/Atlas Has ATOMIC NICKEL?! 🤯 #Shorts",
      description: `Scientists are FREAKING OUT over 3I/Atlas composition! 

This interstellar visitor contains atomic nickel - something NEVER found in our solar system's comets! 

🛸 What does this mean?
🛸 How is this possible?  
🛸 What else might be out there?

Mind = BLOWN 🤯

Follow for more space discoveries that will change how you see the universe!

#3IAtlas #InterstellarVisitor #SpaceShorts #AlienVisitor #SpaceScience #Astronomy #MindBlown #Shorts`,
      duration: "0:58",
      views: "847K views in 2 days", 
      engagement: "76K likes, 3.2K comments, 12K shares",
      thumbnail: "Eye-catching atomic nickel visualization with shocked face"
    }
  ]
}

export default function SocialMediaContent() {
  const [selectedPlatform, setSelectedPlatform] = useState('tiktok')
  const [copiedContent, setCopiedContent] = useState<number | null>(null)

  const copyToClipboard = (content: string, id: number) => {
    navigator.clipboard.writeText(content)
    setCopiedContent(id)
    setTimeout(() => setCopiedContent(null), 2000)
  }

  const platforms = [
    { id: 'tiktok', name: 'TikTok', icon: '🎵' },
    { id: 'instagram', name: 'Instagram', icon: '📸' },
    { id: 'twitter', name: 'Twitter/X', icon: '🐦' },
    { id: 'reddit', name: 'Reddit', icon: '🔴' },
    { id: 'youtube', name: 'YouTube', icon: '📺' }
  ]

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">
          Viral 3I/Atlas Social Media Content
        </h2>
        <p className="text-gray-400">
          Ready-to-use content optimized for maximum engagement across all platforms
        </p>
      </div>

      {/* Platform Selector */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {platforms.map((platform) => (
          <Button
            key={platform.id}
            onClick={() => setSelectedPlatform(platform.id)}
            variant={selectedPlatform === platform.id ? "default" : "outline"}
            className={selectedPlatform === platform.id 
              ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white" 
              : "border-gray-600 text-gray-400 hover:border-purple-500"
            }
          >
            <span className="mr-2">{platform.icon}</span>
            {platform.name}
          </Button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {socialContent[selectedPlatform as keyof typeof socialContent]?.map((item) => (
          <Card key={item.id} className="bg-gray-900/50 border-gray-700 hover:border-purple-500/50 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  {item.type}
                </Badge>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-400 hover:bg-gray-800"
                    onClick={() => copyToClipboard('content' in item ? item.content : 'description' in item ? item.description : '', item.id)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    {copiedContent === item.id ? 'Copied!' : 'Copy'}
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
                {'hook' in item ? item.hook : 'title' in item ? item.title : ''}
              </h3>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                    {'content' in item ? item.content : 'description' in item ? item.description : ''}
                  </pre>
                </div>
                
                {'hashtags' in item && item.hashtags && (
                  <div className="bg-blue-900/20 p-3 rounded-lg">
                    <p className="text-sm text-blue-400 font-mono">
                      {item.hashtags}
                    </p>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    {'duration' in item && item.duration && (
                      <span>⏱️ {item.duration}</span>
                    )}
                    {'format' in item && item.format && (
                      <span>📋 {item.format}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-red-400" />
                    <MessageCircle className="h-4 w-4 text-blue-400" />
                    <Share2 className="h-4 w-4 text-green-400" />
                  </div>
                </div>
                
                {'engagement' in item && item.engagement && (
                  <div className="bg-green-900/20 p-3 rounded-lg">
                    <p className="text-sm text-green-400">
                      📊 Projected: {item.engagement}
                    </p>
                  </div>
                )}
                
                {'visuals' in item && item.visuals && (
                  <div className="bg-purple-900/20 p-3 rounded-lg">
                    <p className="text-sm text-purple-400">
                      🎨 Visual concept: {item.visuals}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Strategy Tips */}
      <Card className="mt-12 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-purple-500/30">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-white mb-6">
            Platform-Specific Strategy Tips
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h4 className="font-bold text-pink-400 mb-2">🎵 TikTok Strategy</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Hook in first 3 seconds</li>
                <li>• Use trending audio/effects</li>
                <li>• Post 3-5 times daily</li>
                <li>• Engage with comments quickly</li>
                <li>• Create series for algorithm boost</li>
              </ul>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-400 mb-2">📸 Instagram Strategy</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• High-quality visuals essential</li>
                <li>• Stories for real-time updates</li>
                <li>• Use all 30 hashtags</li>
                <li>• Post when audience is online</li>
                <li>• Carousel posts get more reach</li>
              </ul>
            </div>
            
            <div className="bg-gray-900/50 p-4 rounded-lg">
              <h4 className="font-bold text-cyan-400 mb-2">🐦 Twitter Strategy</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Threads for complex topics</li>
                <li>• Real-time updates perform best</li>
                <li>• Engage with science community</li>
                <li>• Use relevant trending hashtags</li>
                <li>• Pin important threads</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
