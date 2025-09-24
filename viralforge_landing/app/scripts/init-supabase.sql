
-- Create oracle_readings table
CREATE TABLE IF NOT EXISTS oracle_readings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  birth_month TEXT NOT NULL,
  current_focus TEXT NOT NULL,
  energy_level TEXT NOT NULL,
  card_drawn TEXT NOT NULL,
  personalized_message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product_wishlists table
CREATE TABLE IF NOT EXISTS product_wishlists (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  product_id TEXT NOT NULL,
  product_title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(email, product_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_oracle_readings_email ON oracle_readings(email);
CREATE INDEX IF NOT EXISTS idx_oracle_readings_created_at ON oracle_readings(created_at);
CREATE INDEX IF NOT EXISTS idx_product_wishlists_email ON product_wishlists(email);

-- Enable Row Level Security (RLS)
ALTER TABLE oracle_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_wishlists ENABLE ROW LEVEL SECURITY;

-- Create policies for oracle_readings
CREATE POLICY "Allow anonymous inserts" ON oracle_readings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow users to view their own readings" ON oracle_readings FOR SELECT USING (true);

-- Create policies for product_wishlists  
CREATE POLICY "Allow anonymous inserts" ON product_wishlists FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow users to view their own wishlists" ON product_wishlists FOR SELECT USING (true);
