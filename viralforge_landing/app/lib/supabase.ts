
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// Types for our database
export interface OracleReading {
  id: string
  email: string
  name: string
  birth_month: string
  current_focus: string
  energy_level: string
  card_drawn: string
  personalized_message: string
  created_at: string
}

export interface ProductWishlist {
  id: string
  email: string
  product_id: string
  product_title: string
  created_at: string
}
