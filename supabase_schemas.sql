-- VIRALFORGE Supabase Database Schema
-- Complete SQL schema for autonomous POD campaign system

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_cron";

-- =============================================
-- 1. AUTHENTICATION & USER MANAGEMENT
-- =============================================

-- User profiles (extends Supabase auth.users)
CREATE TABLE public.user_profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'manager', 'user')),
    subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 2. EVENT CALENDAR & TREND TRACKING
-- =============================================

-- Events table for tracking trending events
CREATE TABLE public.events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    event_type TEXT NOT NULL CHECK (event_type IN ('astronomical', 'cultural', 'seasonal', 'viral', 'news')),
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    peak_date TIMESTAMP WITH TIME ZONE,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'completed', 'cancelled')),
    priority_score INTEGER DEFAULT 0 CHECK (priority_score >= 0 AND priority_score <= 100),
    search_volume INTEGER DEFAULT 0,
    trend_momentum DECIMAL(5,2) DEFAULT 0.0,
    geographic_focus TEXT[], -- Array of country codes
    keywords TEXT[], -- Array of related keywords
    external_data JSONB, -- Store API responses, social metrics, etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event milestones for tracking key dates
CREATE TABLE public.event_milestones (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    milestone_date TIMESTAMP WITH TIME ZONE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    significance_level INTEGER DEFAULT 1 CHECK (significance_level >= 1 AND significance_level <= 5),
    automated_trigger BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trend monitoring for real-time tracking
CREATE TABLE public.trend_monitoring (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    platform TEXT NOT NULL CHECK (platform IN ('google_trends', 'twitter', 'reddit', 'tiktok', 'instagram')),
    keyword TEXT NOT NULL,
    search_volume INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5,2) DEFAULT 0.0,
    sentiment_score DECIMAL(3,2) DEFAULT 0.0 CHECK (sentiment_score >= -1.0 AND sentiment_score <= 1.0),
    data_snapshot JSONB,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 3. BRANDS & PRODUCT MANAGEMENT
-- =============================================

-- Brands table
CREATE TABLE public.brands (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    target_audience TEXT,
    brand_voice TEXT,
    color_palette JSONB, -- Store brand colors
    logo_url TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
    printify_store_id TEXT,
    social_accounts JSONB, -- Store social media handles
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default brands
INSERT INTO public.brands (name, slug, description, target_audience, brand_voice) VALUES
('Mystic Arcana', 'mystic-arcana', 'Astrology and mysticism focused brand', 'Millennials and Gen Z interested in spirituality', 'Mystical, insightful, cosmic'),
('EDM Shuffle', 'edm-shuffle', 'Electronic dance music and rave culture brand', 'EDM fans, festival goers, young adults', 'Energetic, futuristic, bold'),
('BirthdayGen', 'birthday-gen', 'Personalized birthday and celebration products', 'Gift buyers, celebration enthusiasts', 'Personal, warm, celebratory');

-- Product categories
CREATE TABLE public.product_categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    printify_category_id TEXT,
    profit_margin_target DECIMAL(5,2) DEFAULT 30.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE public.products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE,
    event_id UUID REFERENCES public.events(id) ON DELETE SET NULL,
    category_id UUID REFERENCES public.product_categories(id),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL,
    cost_price DECIMAL(10,2) NOT NULL,
    profit_margin DECIMAL(5,2) GENERATED ALWAYS AS (
        CASE 
            WHEN base_price > 0 THEN ((base_price - cost_price) / base_price * 100)
            ELSE 0
        END
    ) STORED,
    design_prompt TEXT, -- AI prompt used to generate design
    design_urls TEXT[], -- Array of design image URLs
    printify_product_id TEXT,
    printify_variants JSONB, -- Store variant data from Printify
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'inactive', 'sold_out', 'discontinued')),
    seo_title TEXT,
    seo_description TEXT,
    tags TEXT[],
    personalization_fields JSONB, -- For customizable products
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product variants (sizes, colors, etc.)
CREATE TABLE public.product_variants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    printify_variant_id TEXT NOT NULL,
    sku TEXT UNIQUE NOT NULL,
    size TEXT,
    color TEXT,
    price DECIMAL(10,2) NOT NULL,
    cost DECIMAL(10,2) NOT NULL,
    inventory_status TEXT DEFAULT 'in_stock' CHECK (inventory_status IN ('in_stock', 'low_stock', 'out_of_stock')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 4. CAMPAIGNS & AUTOMATION
-- =============================================

-- Campaigns table
CREATE TABLE public.campaigns (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    campaign_type TEXT NOT NULL CHECK (campaign_type IN ('product_launch', 'trend_response', 'seasonal', 'viral_moment')),
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed', 'cancelled')),
    budget_allocated DECIMAL(10,2) DEFAULT 0,
    budget_spent DECIMAL(10,2) DEFAULT 0,
    target_audience JSONB, -- Demographics, interests, etc.
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    automation_enabled BOOLEAN DEFAULT TRUE,
    n8n_workflow_id TEXT, -- Reference to n8n workflow
    performance_metrics JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaign products (many-to-many relationship)
CREATE TABLE public.campaign_products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    priority INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(campaign_id, product_id)
);

-- Automation workflows tracking
CREATE TABLE public.automation_workflows (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    workflow_type TEXT NOT NULL CHECK (workflow_type IN ('trend_detection', 'content_creation', 'product_listing', 'social_posting', 'analytics')),
    n8n_workflow_id TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'error')),
    trigger_conditions JSONB,
    last_execution TIMESTAMP WITH TIME ZONE,
    execution_count INTEGER DEFAULT 0,
    success_rate DECIMAL(5,2) DEFAULT 100.0,
    error_log JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workflow executions log
CREATE TABLE public.workflow_executions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    workflow_id UUID REFERENCES public.automation_workflows(id) ON DELETE CASCADE,
    n8n_execution_id TEXT,
    status TEXT NOT NULL CHECK (status IN ('running', 'success', 'error', 'cancelled')),
    trigger_data JSONB,
    output_data JSONB,
    error_message TEXT,
    execution_time_ms INTEGER,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- =============================================
-- 5. CONTENT & SOCIAL MEDIA
-- =============================================

-- Generated content tracking
CREATE TABLE public.generated_content (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
    content_type TEXT NOT NULL CHECK (content_type IN ('product_description', 'social_post', 'ad_copy', 'blog_post', 'email')),
    platform TEXT CHECK (platform IN ('instagram', 'twitter', 'facebook', 'tiktok', 'pinterest', 'email', 'website')),
    title TEXT,
    content TEXT NOT NULL,
    media_urls TEXT[],
    ai_model_used TEXT,
    generation_prompt TEXT,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'published', 'rejected')),
    performance_metrics JSONB,
    scheduled_for TIMESTAMP WITH TIME ZONE,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social media posts tracking
CREATE TABLE public.social_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    content_id UUID REFERENCES public.generated_content(id) ON DELETE CASCADE,
    platform TEXT NOT NULL,
    platform_post_id TEXT,
    brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE,
    post_url TEXT,
    engagement_metrics JSONB, -- likes, shares, comments, etc.
    reach INTEGER DEFAULT 0,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    posted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_metrics_update TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 6. ANALYTICS & KPI TRACKING
-- =============================================

-- Daily analytics snapshots
CREATE TABLE public.daily_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    date DATE NOT NULL,
    brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE,
    campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
    
    -- Revenue metrics
    revenue DECIMAL(12,2) DEFAULT 0,
    orders_count INTEGER DEFAULT 0,
    units_sold INTEGER DEFAULT 0,
    average_order_value DECIMAL(10,2) DEFAULT 0,
    
    -- Cost metrics
    ad_spend DECIMAL(10,2) DEFAULT 0,
    cogs DECIMAL(10,2) DEFAULT 0, -- Cost of goods sold
    total_costs DECIMAL(10,2) DEFAULT 0,
    
    -- Calculated KPIs
    gross_profit DECIMAL(12,2) GENERATED ALWAYS AS (revenue - cogs) STORED,
    net_profit DECIMAL(12,2) GENERATED ALWAYS AS (revenue - total_costs) STORED,
    roas DECIMAL(8,2) GENERATED ALWAYS AS (
        CASE 
            WHEN ad_spend > 0 THEN (revenue / ad_spend)
            ELSE 0
        END
    ) STORED,
    
    -- Traffic metrics
    website_visitors INTEGER DEFAULT 0,
    page_views INTEGER DEFAULT 0,
    conversion_rate DECIMAL(5,2) DEFAULT 0,
    
    -- Social metrics
    social_impressions INTEGER DEFAULT 0,
    social_engagement INTEGER DEFAULT 0,
    social_clicks INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(date, brand_id, campaign_id)
);

-- Customer analytics
CREATE TABLE public.customer_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_email TEXT NOT NULL,
    brand_id UUID REFERENCES public.brands(id) ON DELETE CASCADE,
    
    -- Customer lifetime metrics
    first_order_date DATE,
    last_order_date DATE,
    total_orders INTEGER DEFAULT 0,
    total_spent DECIMAL(12,2) DEFAULT 0,
    average_order_value DECIMAL(10,2) DEFAULT 0,
    
    -- Acquisition metrics
    acquisition_source TEXT,
    acquisition_campaign TEXT,
    acquisition_cost DECIMAL(10,2) DEFAULT 0,
    
    -- Calculated CLV
    customer_lifetime_value DECIMAL(12,2) DEFAULT 0,
    predicted_clv DECIMAL(12,2) DEFAULT 0,
    
    -- Engagement metrics
    email_opens INTEGER DEFAULT 0,
    email_clicks INTEGER DEFAULT 0,
    social_interactions INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(customer_email, brand_id)
);

-- UGC (User Generated Content) tracking
CREATE TABLE public.ugc_tracking (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    platform TEXT NOT NULL,
    post_url TEXT NOT NULL,
    author_handle TEXT,
    content_type TEXT CHECK (content_type IN ('image', 'video', 'text', 'story')),
    engagement_count INTEGER DEFAULT 0,
    sentiment_score DECIMAL(3,2) DEFAULT 0.0,
    brand_mention BOOLEAN DEFAULT FALSE,
    hashtags TEXT[],
    discovered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 7. SYSTEM CONFIGURATION & SETTINGS
-- =============================================

-- System settings
CREATE TABLE public.system_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    setting_key TEXT UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    description TEXT,
    category TEXT DEFAULT 'general',
    is_sensitive BOOLEAN DEFAULT FALSE,
    updated_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API integrations configuration
CREATE TABLE public.api_integrations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    service_name TEXT UNIQUE NOT NULL,
    api_endpoint TEXT,
    api_key_encrypted TEXT, -- Store encrypted API keys
    rate_limit_per_hour INTEGER DEFAULT 1000,
    last_request TIMESTAMP WITH TIME ZONE,
    request_count_today INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'error')),
    configuration JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- 8. INDEXES FOR PERFORMANCE
-- =============================================

-- Events indexes
CREATE INDEX idx_events_status_priority ON public.events(status, priority_score DESC);
CREATE INDEX idx_events_dates ON public.events(start_date, end_date, peak_date);
CREATE INDEX idx_events_type ON public.events(event_type);

-- Products indexes
CREATE INDEX idx_products_brand_status ON public.products(brand_id, status);
CREATE INDEX idx_products_event ON public.products(event_id);
CREATE INDEX idx_products_created ON public.products(created_at DESC);

-- Campaigns indexes
CREATE INDEX idx_campaigns_brand_status ON public.campaigns(brand_id, status);
CREATE INDEX idx_campaigns_dates ON public.campaigns(start_date, end_date);

-- Analytics indexes
CREATE INDEX idx_daily_analytics_date_brand ON public.daily_analytics(date DESC, brand_id);
CREATE INDEX idx_daily_analytics_campaign ON public.daily_analytics(campaign_id, date DESC);

-- Trend monitoring indexes
CREATE INDEX idx_trend_monitoring_event_platform ON public.trend_monitoring(event_id, platform);
CREATE INDEX idx_trend_monitoring_recorded ON public.trend_monitoring(recorded_at DESC);

-- =============================================
-- 9. ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_analytics ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (can be expanded based on requirements)
CREATE POLICY "Users can view their own profile" ON public.user_profiles
    FOR ALL USING (auth.uid() = id);

CREATE POLICY "Authenticated users can view events" ON public.events
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view brands" ON public.brands
    FOR SELECT USING (auth.role() = 'authenticated');

-- =============================================
-- 10. FUNCTIONS AND TRIGGERS
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON public.brands
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON public.campaigns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate customer lifetime value
CREATE OR REPLACE FUNCTION calculate_customer_clv(customer_email_param TEXT, brand_id_param UUID)
RETURNS DECIMAL(12,2) AS $$
DECLARE
    clv_result DECIMAL(12,2);
BEGIN
    -- Simple CLV calculation: (Average Order Value × Purchase Frequency × Customer Lifespan)
    -- This is a basic implementation - can be enhanced with more sophisticated models
    
    SELECT 
        COALESCE(
            (total_spent / NULLIF(total_orders, 0)) * 
            (total_orders / NULLIF(EXTRACT(DAYS FROM (last_order_date - first_order_date)), 0)) * 
            365 * 2, -- Assuming 2-year customer lifespan
            0
        )
    INTO clv_result
    FROM public.customer_analytics
    WHERE customer_email = customer_email_param AND brand_id = brand_id_param;
    
    RETURN COALESCE(clv_result, 0);
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- 11. INITIAL DATA SETUP
-- =============================================

-- Insert default product categories
INSERT INTO public.product_categories (name, slug, description) VALUES
('T-Shirts', 't-shirts', 'Basic and premium t-shirts'),
('Hoodies', 'hoodies', 'Hoodies and sweatshirts'),
('Mugs', 'mugs', 'Coffee mugs and drinkware'),
('Posters', 'posters', 'Art prints and posters'),
('Accessories', 'accessories', 'Various accessories and small items'),
('Home Decor', 'home-decor', 'Home decoration items');

-- Insert default system settings
INSERT INTO public.system_settings (setting_key, setting_value, description, category) VALUES
('ai_content_model', '"gpt-4"', 'Default AI model for content generation', 'ai'),
('ai_image_model', '"dall-e-3"', 'Default AI model for image generation', 'ai'),
('default_profit_margin', '30.0', 'Default profit margin percentage', 'pricing'),
('max_daily_ai_requests', '1000', 'Maximum AI API requests per day', 'limits'),
('trend_monitoring_interval', '3600', 'Trend monitoring interval in seconds', 'automation'),
('social_posting_enabled', 'true', 'Enable automatic social media posting', 'social');

-- Insert default API integrations
INSERT INTO public.api_integrations (service_name, api_endpoint, rate_limit_per_hour, configuration) VALUES
('printify', 'https://api.printify.com/v1/', 1000, '{"store_id": null}'),
('openai', 'https://api.openai.com/v1/', 3000, '{"model": "gpt-4", "max_tokens": 2000}'),
('google_trends', 'https://trends.googleapis.com/trends/api/', 100, '{"geo": "US", "timeframe": "now 7-d"}'),
('instagram_basic', 'https://graph.instagram.com/', 200, '{"version": "v18.0"}');

-- =============================================
-- 12. VIEWS FOR COMMON QUERIES
-- =============================================

-- Campaign performance view
CREATE VIEW campaign_performance AS
SELECT 
    c.id,
    c.name,
    b.name as brand_name,
    c.status,
    c.budget_allocated,
    c.budget_spent,
    COALESCE(SUM(da.revenue), 0) as total_revenue,
    COALESCE(SUM(da.orders_count), 0) as total_orders,
    COALESCE(AVG(da.roas), 0) as avg_roas,
    COALESCE(SUM(da.gross_profit), 0) as total_profit,
    c.created_at,
    c.updated_at
FROM public.campaigns c
LEFT JOIN public.brands b ON c.brand_id = b.id
LEFT JOIN public.daily_analytics da ON c.id = da.campaign_id
GROUP BY c.id, c.name, b.name, c.status, c.budget_allocated, c.budget_spent, c.created_at, c.updated_at;

-- Product performance view
CREATE VIEW product_performance AS
SELECT 
    p.id,
    p.name,
    b.name as brand_name,
    p.status,
    p.base_price,
    p.profit_margin,
    COUNT(DISTINCT cp.campaign_id) as campaign_count,
    p.created_at
FROM public.products p
LEFT JOIN public.brands b ON p.brand_id = b.id
LEFT JOIN public.campaign_products cp ON p.id = cp.product_id
GROUP BY p.id, p.name, b.name, p.status, p.base_price, p.profit_margin, p.created_at;

-- Event trending view
CREATE VIEW event_trending AS
SELECT 
    e.id,
    e.name,
    e.event_type,
    e.priority_score,
    e.start_date,
    e.peak_date,
    AVG(tm.search_volume) as avg_search_volume,
    AVG(tm.sentiment_score) as avg_sentiment,
    COUNT(tm.id) as monitoring_points,
    MAX(tm.recorded_at) as last_monitored
FROM public.events e
LEFT JOIN public.trend_monitoring tm ON e.id = tm.event_id
WHERE e.status = 'active'
GROUP BY e.id, e.name, e.event_type, e.priority_score, e.start_date, e.peak_date
ORDER BY e.priority_score DESC, avg_search_volume DESC;
