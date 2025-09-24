
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getRandomCard, generatePersonalizedMessage, generateSpookyInsight, generateAdvancedPersonalizedMessage } from '@/lib/oracle-cards'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, birthMonth, currentFocus, energyLevel } = body

    // Validate required fields
    if (!name || !email || !birthMonth || !currentFocus || !energyLevel) {
      return NextResponse.json({
        success: false,
        error: 'All fields are required'
      }, { status: 400 })
    }

    // Get random oracle card
    const card = getRandomCard()
    
    // Generate advanced personalized message
    const personalizedMessage = generateAdvancedPersonalizedMessage(
      card, 
      name, 
      birthMonth, 
      currentFocus, 
      energyLevel
    )

    // Generate spooky insight
    const spookyInsight = generateSpookyInsight(birthMonth, currentFocus, energyLevel)

    // Save reading to Supabase and potentially sync with Mystic Arcana
    const { data, error } = await supabase
      .from('oracle_readings')
      .insert([
        {
          email,
          name,
          birth_month: birthMonth,
          current_focus: currentFocus,
          energy_level: energyLevel,
          card_drawn: card.name,
          personalized_message: personalizedMessage,
          spooky_insight: spookyInsight,
          mystic_arcana_eligible: true,
          created_at: new Date().toISOString()
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      // Continue even if database save fails
    }

    // Also prepare data for Mystic Arcana webhook (future integration)
    try {
      const mysticArcanaData = {
        email,
        name,
        source: '3iatlas_oracle',
        interests: ['astrology', 'oracle_cards', '3i_atlas'],
        birth_month: birthMonth,
        focus_area: currentFocus,
        energy_profile: energyLevel,
        cosmic_event: '3i_atlas_2025'
      }
      
      // TODO: Send to Mystic Arcana API when available
      console.log('Mystic Arcana integration ready:', mysticArcanaData)
    } catch (syncError) {
      console.error('Mystic Arcana sync error:', syncError)
    }

    return NextResponse.json({
      success: true,
      data: {
        card,
        personalizedMessage,
        spookyInsight,
        userName: name
      }
    })

  } catch (error) {
    console.error('Oracle API error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to generate oracle reading'
    }, { status: 500 })
  }
}

// Handle quick oracle reading without survey
export async function GET(request: NextRequest) {
  try {
    const card = getRandomCard()
    
    // Generic message for anonymous readings
    const personalizedMessage = `The cosmos has chosen ${card.name} for you. ${card.meaning}`
    
    return NextResponse.json({
      success: true,
      data: {
        card,
        personalizedMessage,
        spookyInsight: "The Oracle sees beyond the veil, but requires your energy signature for deeper insights...",
        userName: "Cosmic Traveler"
      }
    })

  } catch (error) {
    console.error('Oracle API error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to generate oracle reading'
    }, { status: 500 })
  }
}
