import { config, getHeroImageUrl, getOracleImageUrls, getEnhancedFaqImageUrl, getProductShowcaseImageUrls, getFaqImageUrl } from "@/lib/config"

'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, User, Eye, TrendingUp, Bookmark, Share2, ArrowRight } from 'lucide-react'
import Image from 'next/image'

const blogPosts = [
  {
    id: 1,
    title: "3I/Atlas Mars Flyby: A Once-in-a-Lifetime Cosmic Event",
    slug: "3i-atlas-mars-flyby-cosmic-event",
    excerpt: "On October 2-3, 2025, humanity witnesses history as 3I/Atlas, our third confirmed interstellar visitor, makes its closest approach to Mars. This ancient cosmic wanderer, traveling at an astounding 137,000 mph, offers unprecedented scientific opportunities.",
    content: `
**The Event of the Decade**

October 2-3, 2025, marks a pivotal moment in astronomical history. 3I/Atlas, discovered just months ago by NASA's ATLAS telescope, approaches Mars within 18-30 million miles - closer than many asteroids pass Earth. This interstellar comet, potentially 4.6-8 billion years old, carries secrets from beyond our solar system.

**Why Mars Flyby Matters**

Unlike its predecessors 1I/'Oumuamua and 2I/Borisov, 3I/Atlas exhibits active comet behavior with a visible coma and tail. Its proximity to Mars allows for detailed observation using both Mars-orbiting spacecraft and Earth-based telescopes. NASA's Mars Reconnaissance Orbiter and ESA's Mars Express are positioned to capture unprecedented data.

**Scientific Significance**

The flyby provides unique opportunities to study:
- **Gravitational interactions**: How Mars' gravity affects the comet's trajectory
- **Composition analysis**: Spectroscopic data revealing exotic compounds like atomic nickel
- **Outgassing patterns**: Changes in coma activity due to solar radiation
- **Magnetic field interactions**: How the comet responds to Mars' magnetosphere

**Observation Opportunities**

Amateur astronomers can participate in this historic event. 3I/Atlas remains visible through medium-sized telescopes until September 2025. Professional observatories worldwide are coordinating observation campaigns, making this a truly global scientific endeavor.

**Cultural Impact**

Beyond science, 3I/Atlas represents humanity's growing awareness of our cosmic neighborhood. Its discovery validates theoretical predictions about interstellar visitor frequency and demonstrates our improving detection capabilities.

**Looking Ahead**

After the Mars encounter, 3I/Atlas continues toward perihelion on October 29-30, 2025. This closest approach to our Sun will likely trigger increased activity, potentially creating spectacular tail displays visible from Earth.

The 3I/Atlas flyby reminds us that our solar system is part of a dynamic galactic community. As we track this ancient visitor's journey, we glimpse the broader cosmic processes that shape our universe.
    `,
    author: "Dr. Sarah Chen",
    authorBio: "Planetary Scientist at NASA JPL",
    publishDate: "2025-10-30",
    readTime: "8 min read",
    category: "Breaking News",
    tags: ["3I/Atlas", "Mars Flyby", "Interstellar", "Astronomy"],
    image: "getOracleImageUrls()[1]",
    views: 15420,
    likes: 1287,
    featured: true,
    urgent: true
  },
  {
    id: 2,
    title: "The Science Behind 3I/Atlas: Composition and Origin Mysteries",
    slug: "3i-atlas-science-composition-origin",
    excerpt: "Latest Hubble observations reveal 3I/Atlas contains exotic compounds rarely seen in solar system comets. Carbon dioxide, atomic nickel, and carbonyl sulfide point to formation in vastly different stellar environments.",
    content: `
**Revolutionary Discoveries**

The Hubble Space Telescope's latest spectroscopic analysis of 3I/Atlas has revolutionized our understanding of interstellar objects. Unlike any comet from our solar system, this ancient visitor carries a chemical signature that tells the story of its exotic birthplace.

**Unique Composition Profile**

3I/Atlas exhibits a remarkable composition:
- **Carbon dioxide ice**: Primary volatile compound
- **Water ice**: Secondary component, less than typical comets
- **Carbon monoxide**: Indicating formation at extremely low temperatures
- **Atomic nickel**: Unprecedented in solar system comets
- **Carbonyl sulfide**: Rare compound suggesting unique formation chemistry
- **Cyanide gas**: Contributing to its reddish coloration

**Formation Environment**

The presence of atomic nickel is particularly intriguing. This element typically requires specific stellar processes, suggesting 3I/Atlas formed in a system with a metal-rich star or experienced unique evolutionary processes. The combination with carbonyl sulfide indicates formation in a chemically reducing environment vastly different from our solar system's formation conditions.

**Age and Origin**

Isotopic analysis suggests an age between 4.6-8 billion years, making 3I/Atlas potentially older than our Solar System. Its trajectory traces back to the constellation Sagittarius, specifically the galactic plane region where star formation was more active in the early universe.

**Comparison with Previous Visitors**

| Object | Type | Age | Key Features |
|--------|------|-----|-------------|
| 1I/'Oumuamua | Rocky fragment | ~1 billion years | Elongated, accelerating |
| 2I/Borisov | Typical comet | ~1.7 billion years | Standard comet behavior |
| 3I/Atlas | Active comet | 4.6-8 billion years | Exotic composition, active coma |

**Implications for Astrobiology**

The unique chemistry of 3I/Atlas provides insights into the diversity of planetary formation processes throughout the galaxy. Organic compounds detected in its coma offer clues about the building blocks available in other stellar systems.

**Future Research Directions**

Scientists are using ground-based radio telescopes to detect additional molecular species and studying polarization properties that reveal surface characteristics. These observations will guide future interstellar visitor research programs.

**The Bigger Picture**

3I/Atlas represents more than a single visitor - it's a sample from the vast interstellar medium that fills our galaxy. Each measurement adds to our understanding of galactic chemical evolution and planetary system formation processes.
    `,
    author: "Prof. Michael Rodriguez",
    authorBio: "Astrochemist at Harvard-Smithsonian",
    publishDate: "2025-09-28",
    readTime: "12 min read",
    category: "Scientific Analysis",
    tags: ["3I/Atlas", "Composition", "Hubble", "Spectroscopy", "Chemistry"],
    image: "getImageUrl("884e3d49-0e2a-4f80-99c5-81a793e02ac3")",
    views: 8934,
    likes: 743,
    featured: true,
    urgent: false
  },
  {
    id: 3,
    title: "Interstellar Visitors Timeline: From 'Oumuamua to 3I/Atlas",
    slug: "interstellar-visitors-timeline-oumuamua-atlas",
    excerpt: "A comprehensive look at humanity's encounters with interstellar objects, from the mysterious 'Oumuamua in 2017 to the active comet 3I/Atlas in 2025. Each visitor has taught us something unique about the galaxy.",
    content: `
**The Dawn of Interstellar Visitor Science**

The detection of interstellar objects represents one of astronomy's newest and most exciting fields. In less than a decade, we've discovered three confirmed visitors, each revealing unique characteristics of the broader galactic environment.

**1I/'Oumuamua (2017): The Pathfinder**

Our first confirmed interstellar visitor shocked scientists with its:
- **Unusual shape**: 10:1 length-to-width ratio, like a cosmic cigar
- **Non-gravitational acceleration**: Mysterious speed increase puzzled researchers
- **Rocky composition**: Unlike typical comets, showed no visible outgassing
- **Rapid rotation**: Tumbling every 7.3 hours
- **Origin mystery**: Came from the constellation Lyra

Recent research suggests 'Oumuamua was an "exo-Pluto" fragment - a piece of nitrogen ice from a distant Pluto-like world that collided with another object. Its acceleration resulted from nitrogen sublimation, too faint to detect directly.

**2I/Borisov (2019): The Familiar Stranger**

Discovered by amateur astronomer Gennadiy Borisov, this visitor behaved more like a typical comet:
- **Standard comet activity**: Visible coma and tail development
- **Familiar composition**: Water ice and carbon monoxide
- **Predictable behavior**: No mysterious accelerations
- **Steady activity**: Consistent outgassing throughout approach
- **Origin trajectory**: From the opposite side of the galaxy

Borisov provided reassurance that not all interstellar objects are mysterious - some follow familiar physical laws.

**3I/Atlas (2025): The Game Changer**

Our third visitor combines the best of both worlds while adding new mysteries:
- **Active comet behavior**: Visible coma and tail formation
- **Exotic composition**: Atomic nickel and rare compounds
- **Ancient age**: Potentially 4.6-8 billion years old
- **High speed**: 137,000 mph hyperbolic excess velocity
- **Perfect timing**: Discovered months before optimal observation

**Detection Improvements**

Each discovery has improved our detection capabilities:

| Year | Object | Discovery Method | Follow-up Observations |
|------|--------|------------------|----------------------|
| 2017 | 'Oumuamua | Pan-STARRS survey | Limited (already departing) |
| 2019 | Borisov | Amateur astronomer | Extensive worldwide campaign |
| 2025 | Atlas | ATLAS telescope | Real-time monitoring |

**Statistical Insights**

The discovery rate suggests approximately one detectable interstellar object passes through the inner solar system annually. The Vera Rubin Observatory, beginning operations in 2026, could detect dozens of these visitors.

**Population Estimates**

Current models suggest the Milky Way contains:
- **Hundreds of millions of trillions** of interstellar objects
- **10^26 objects** larger than 100 meters
- **Regular exchange** between stellar systems

**Future Prospects**

The James Webb Space Telescope and upcoming ground-based observatories will enable:
- **Earlier detection**: Spotting visitors years before closest approach
- **Detailed composition analysis**: Identifying complex organic molecules
- **Origin tracing**: Better trajectory calculations
- **Mission planning**: Potential spacecraft intercepts

**Scientific Impact**

Each interstellar visitor has expanded our understanding:
- **Galactic dynamics**: How objects move between star systems
- **Planetary formation**: Diversity of building blocks
- **System evolution**: Processes that eject materials
- **Astrobiology**: Organic compound distribution

**The Road Ahead**

As detection technology improves, interstellar visitor science will become routine rather than extraordinary. These cosmic messengers provide direct samples of the galaxy beyond our solar system, offering insights impossible to obtain any other way.

The progression from 'Oumuamua's mystery to Borisov's familiarity to 3I/Atlas's complexity shows the rich diversity awaiting discovery in our cosmic neighborhood.
    `,
    author: "Dr. Emily Zhang",
    authorBio: "Director of Solar System Studies, MIT",
    publishDate: "2025-09-26",
    readTime: "15 min read",
    category: "Historical Analysis",
    tags: ["Interstellar Objects", "Timeline", "'Oumuamua", "Borisov", "3I/Atlas", "History"],
    image: "getImageUrl("34cace12-f036-40af-94d5-b8e0cca2f9c1")",
    views: 12567,
    likes: 987,
    featured: false,
    urgent: false
  },
  {
    id: 4,
    title: "How to Observe 3I/Atlas: Amateur Astronomer's Guide",
    slug: "observe-3i-atlas-amateur-astronomer-guide",
    excerpt: "Don't miss your chance to see 3I/Atlas! This comprehensive guide covers equipment, timing, and techniques for observing our third interstellar visitor before it disappears forever.",
    content: `
**Your Window to History**

3I/Atlas offers a once-in-a-lifetime viewing opportunity that won't repeat for potentially millions of years. With proper equipment and technique, amateur astronomers can observe this interstellar visitor and contribute to citizen science efforts.

**Current Visibility Status**

As of late September 2025, 3I/Atlas remains observable through telescopes:
- **Magnitude**: Currently around 12-13 (requires telescope)
- **Constellation**: Moving through Sagittarius toward Scorpius
- **Best viewing**: 2-4 AM local time in southern latitudes
- **Visibility window**: Through September 2025, then solar conjunction

**Equipment Requirements**

**Minimum Setup:**
- 6-inch (150mm) telescope or larger
- Stable mount (preferably tracking)
- 25mm and 10mm eyepieces
- Red flashlight for preserving night vision
- Star charts or astronomy app

**Recommended Setup:**
- 8-10 inch telescope
- Computerized GoTo mount
- Variety of eyepieces (6mm to 32mm)
- CCD camera for imaging
- Light pollution filter

**Observation Techniques**

**Finding 3I/Atlas:**
1. Use current ephemeris data from NASA JPL Horizons
2. Start with wide-field eyepiece to locate star field
3. Switch to medium magnification (100-150x)
4. Look for fuzzy, non-stellar appearance
5. Confirm by checking movement over 30-60 minutes

**What to Look For:**
- **Coma**: Fuzzy envelope around nucleus
- **Movement**: Slow drift against background stars
- **Color**: Subtle reddish tint compared to stars
- **Brightness variations**: Due to rotation and outgassing

**Photography Tips**

**Basic Imaging:**
- 30-60 second exposures at ISO 1600-3200
- Stack multiple images to reduce noise
- Use autoguiding for longer exposures
- Process images to enhance contrast

**Advanced Techniques:**
- Multi-night composite showing movement
- Spectroscopy to analyze composition
- Polarimetry measurements
- Time-lapse videos of motion

**Observing Schedule**

**September 2025:**
- **Early month**: Best viewing before Mars flyby
- **Mid-month**: Observe interactions during Mars approach
- **Late month**: Final observations before solar conjunction

**October 2025:**
- **Early month**: Solar conjunction period - not visible
- **Late month**: May briefly reappear after perihelion

**December 2025:**
- **Limited window**: Final observation opportunity
- **Requires large telescopes**: Significantly dimmer
- **Southern hemisphere**: Better viewing conditions

**Citizen Science Opportunities**

**Contribute to Research:**
- Submit observations to AAVSO
- Report brightness measurements
- Share high-quality images
- Participate in global observation campaigns

**Data to Record:**
- Date and time (UTC)
- Telescope specifications
- Observing conditions
- Estimated magnitude
- Coma size and characteristics

**Observation Challenges**

**Light Pollution:**
- Escape to dark sky sites when possible
- Use light pollution filters
- Observe during astronomical twilight
- Join local astronomy clubs for site access

**Weather:**
- Monitor forecasts for clear nights
- Have backup observation dates
- Consider traveling to better climates
- Use weather apps designed for astronomers

**Technical Issues:**
- Practice finding techniques beforehand
- Backup star charts in case electronics fail
- Bring extra batteries for cold nights
- Test equipment during daylight hours

**Safety Considerations**

- Never observe without proper solar filters during daylight
- Use red light to preserve night vision
- Dress warmly for extended observations
- Bring backup power sources
- Observe with others when possible

**Making the Most of Your Observations**

**Documentation:**
- Keep detailed observing logs
- Sketch what you see through eyepieces
- Record environmental conditions
- Note any unusual features or changes

**Sharing Your Experience:**
- Post observations to social media
- Join online astronomy communities
- Contribute to citizen science projects
- Inspire others to look up

**The Bigger Picture**

Observing 3I/Atlas connects you directly to the cosmos beyond our solar system. Every photon reaching your telescope traveled across interstellar space, carrying information about distant stellar environments. Your observations contribute to humanity's understanding of these rare cosmic messengers.

Don't let this opportunity pass - 3I/Atlas won't return, and the next interstellar visitor might not be visible from your location or might not arrive for years. Make plans now to witness this historic cosmic event!
    `,
    author: "Marcus Thompson",
    authorBio: "Amateur Astronomer & Observatory Director",
    publishDate: "2025-09-25",
    readTime: "10 min read",
    category: "Observation Guide",
    tags: ["3I/Atlas", "Observing", "Amateur Astronomy", "Equipment", "Photography"],
    image: "getImageUrl("3e8deb50-06d0-440f-88c2-838f9f1b5903")",
    views: 18756,
    likes: 1456,
    featured: false,
    urgent: false
  }
]

const categories = ['All', 'Breaking News', 'Scientific Analysis', 'Historical Analysis', 'Observation Guide']

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [expandedPost, setExpandedPost] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  const toggleExpand = (postId: number) => {
    setExpandedPost(expandedPost === postId ? null : postId)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-6">
            <TrendingUp className="h-8 w-8 text-purple-400 animate-pulse" />
            <Badge className="bg-red-500 text-white animate-pulse">LIVE COVERAGE</Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            3I/Atlas News & Insights
          </h1>
          
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Breaking coverage, scientific analysis, and expert insights on humanity's third interstellar visitor
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={selectedCategory === category 
                ? "bg-gradient-to-r from-purple-500 to-cyan-500 text-white" 
                : "border-gray-600 text-gray-400 hover:border-purple-500"
              }
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && filteredPosts[0].featured && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-purple-500/50 overflow-hidden">
              <div className="lg:flex">
                <div className="lg:w-1/2">
                  <div className="relative h-64 lg:h-full">
                    <Image
                      src={filteredPosts[0].image}
                      alt={filteredPosts[0].title}
                      fill
                      className="object-cover"
                    />
                    {filteredPosts[0].urgent && (
                      <Badge className="absolute top-4 left-4 bg-red-500 text-white animate-pulse">
                        URGENT
                      </Badge>
                    )}
                    <Badge className="absolute top-4 right-4 bg-purple-500 text-white">
                      FEATURED
                    </Badge>
                  </div>
                </div>
                <div className="lg:w-1/2 p-8">
                  <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30">
                    {filteredPosts[0].category}
                  </Badge>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                    {filteredPosts[0].title}
                  </h2>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {filteredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{filteredPosts[0].author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(filteredPosts[0].publishDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{filteredPosts[0].readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{filteredPosts[0].views.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => toggleExpand(filteredPosts[0].id)}
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                  >
                    {expandedPost === filteredPosts[0].id ? 'Read Less' : 'Read Full Article'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {expandedPost === filteredPosts[0].id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5 }}
                  className="border-t border-gray-700 p-8"
                >
                  <div className="prose prose-invert max-w-none">
                    <div className="whitespace-pre-line text-gray-300 leading-relaxed">
                      {filteredPosts[0].content}
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-semibold text-white">{filteredPosts[0].author}</p>
                          <p className="text-sm text-gray-400">{filteredPosts[0].authorBio}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-400">
                          <Bookmark className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-600 text-gray-400">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPosts.slice(filteredPosts[0]?.featured ? 1 : 0).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
            >
              <Card className="bg-gray-900/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className={`absolute top-3 left-3 ${
                    post.category === 'Breaking News' ? 'bg-red-500' :
                    post.category === 'Scientific Analysis' ? 'bg-blue-500' :
                    post.category === 'Historical Analysis' ? 'bg-green-500' :
                    'bg-purple-500'
                  } text-white text-xs`}>
                    {post.category}
                  </Badge>
                </div>
                
                <CardContent className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white mb-3 hover:text-purple-400 transition-colors cursor-pointer">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{post.views.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button 
                      onClick={() => toggleExpand(post.id)}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-purple-500"
                    >
                      {expandedPost === post.id ? 'Read Less' : 'Read More'}
                    </Button>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-cyan-500">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
                
                {expandedPost === post.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="border-t border-gray-700 p-6"
                  >
                    <div className="prose prose-invert max-w-none">
                      <div className="whitespace-pre-line text-gray-300 leading-relaxed">
                        {post.content}
                      </div>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Subscribe CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-purple-500/30 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">
                Never Miss a Cosmic Update
              </h3>
              <p className="text-gray-300 mb-6">
                Get the latest 3I/Atlas news, scientific discoveries, and observation opportunities delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Your email for cosmic updates"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <Button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
                  Subscribe Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
