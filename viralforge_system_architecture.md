# VIRALFORGE System Architecture
## Complete Technical Specification for Autonomous AI-Driven POD Campaign System

### Executive Summary
VIRALFORGE is an autonomous AI-driven Print-on-Demand (POD) campaign system designed to capitalize on trending events like the 3I/Atlas interstellar object. The system integrates Supabase (PostgreSQL, Auth, Storage), n8n automation workflows, and Printify Premium to create a fully automated pipeline from trend detection to product sales.

### System Overview
- **Frontend**: Next.js on Vercel
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Automation**: n8n workflows
- **POD Integration**: Printify Premium API
- **AI Services**: OpenAI GPT-4, DALL-E 3, Claude
- **Analytics**: Custom KPI dashboard + Google Analytics 4

---

## 1. SUPABASE DATABASE SCHEMAS

The complete database schema includes 20+ tables designed for scalability and performance. Key features:
- Row Level Security (RLS) enabled
- Automated triggers for timestamps
- Comprehensive indexing strategy
- Built-in analytics views
- Customer lifetime value calculations

### Core Tables Structure

#### Events & Trend Tracking
- `events` - Central event tracking (3I/Atlas, future trends)
- `event_milestones` - Key dates and triggers
- `trend_monitoring` - Real-time trend data from multiple platforms

#### Brand & Product Management
- `brands` - Multi-brand support (Mystic Arcana, EDM Shuffle, BirthdayGen)
- `products` - Product catalog with AI-generated content
- `product_variants` - Size, color, pricing variations
- `product_categories` - Organized product taxonomy

#### Campaign & Automation
- `campaigns` - Campaign management and tracking
- `automation_workflows` - n8n workflow monitoring
- `workflow_executions` - Execution logs and performance

#### Analytics & KPIs
- `daily_analytics` - Comprehensive daily metrics
- `customer_analytics` - CLV and customer behavior
- `ugc_tracking` - User-generated content monitoring

**File Location**: `/home/ubuntu/supabase_schemas.sql`

---

## 2. N8N AUTOMATION WORKFLOWS

Six interconnected workflows create a fully autonomous pipeline:

### Workflow 1: Trend Detection & Event Monitoring
- **Schedule**: Every 3 hours
- **Function**: Monitors Google Trends, Reddit, social platforms
- **Triggers**: Campaign creation when momentum >50 and priority >70
- **Data Sources**: SerpAPI, Reddit API, social listening

### Workflow 2: Campaign Creation & Product Generation
- **Trigger**: Webhook from trend detection
- **Function**: Creates brand-specific campaigns with strategic angles
- **Output**: Campaign records with target audience and budget allocation

### Workflow 3: AI Content & Design Generation
- **AI Models**: GPT-4 for content, DALL-E 3 for designs
- **Function**: Generates product concepts, descriptions, and visuals
- **Brand Adaptation**: Customizes content for each brand voice

### Workflow 4: Printify Product Listing
- **Integration**: Printify Premium API
- **Function**: Uploads designs, creates products, publishes to store
- **Automation**: Handles blueprint selection and variant creation

### Workflow 5: Social Media Automation
- **Platforms**: Instagram, Twitter/X, Facebook, TikTok
- **Function**: AI-generated social content and automated posting
- **Scheduling**: Optimal timing based on engagement data

### Workflow 6: Analytics & KPI Tracking
- **Schedule**: Daily at 1 AM
- **Function**: Collects data from all sources, calculates KPIs
- **Integration**: Google Analytics, Printify orders, social metrics

**File Location**: `/home/ubuntu/n8n_workflows.json`

---

## 3. KPI FRAMEWORK & MEASURABLE METRICS

### Primary KPIs

#### Financial Metrics
- **Revenue**: Target $500+ monthly per brand
- **ROAS**: Target >3.0 (300% return)
- **Gross Profit Margin**: Target >30%
- **Net Profit**: Target >$150 monthly per brand

#### Customer Metrics
- **CAC (Customer Acquisition Cost)**: Target <$15
- **CLV (Customer Lifetime Value)**: Target >$75
- **Repeat Purchase Rate**: Target >15%
- **Average Order Value**: Target >$35

#### Operational Metrics
- **Conversion Rate**: Target >2.5%
- **Product Performance Score**: Target >75 points
- **Trend Capture Speed**: Target <24 hours

#### Marketing Metrics
- **Social Engagement Rate**: Target >3%
- **UGC Generation Rate**: Target >5 per 100 orders
- **Viral Coefficient**: Target >0.15

### Dashboard Structure
- **Executive Summary**: Key metrics cards with comparisons
- **Financial Dashboard**: Revenue trends, profit breakdowns, ROAS analysis
- **Customer Dashboard**: Acquisition funnels, retention cohorts, CAC vs CLV
- **Operational Dashboard**: Product performance heatmaps, system health

### Alerting System
- **Critical Alerts**: ROAS <1.0, system failures
- **High Priority**: Revenue drops, workflow failures
- **Medium Priority**: Customer acquisition issues, engagement drops

**File Location**: `/home/ubuntu/kpi_framework.json`

---

## 4. TECHNICAL IMPLEMENTATION GUIDE

### 4.1 Supabase Setup

```sql
-- Run the complete schema
psql -h your-supabase-host -U postgres -d postgres -f supabase_schemas.sql

-- Enable real-time subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE daily_analytics;
ALTER PUBLICATION supabase_realtime ADD TABLE campaigns;
ALTER PUBLICATION supabase_realtime ADD TABLE products;
```

### 4.2 Environment Variables

Required for n8n workflows:
```env
# Supabase
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI Services
OPENAI_API_KEY=your-openai-key

# POD Integration
PRINTIFY_API_KEY=your-printify-key
PRINTIFY_STORE_ID=your-store-id

# Analytics
SERPAPI_KEY=your-serpapi-key
GA_VIEW_ID=your-ga-view-id
GA_ACCESS_TOKEN=your-ga-token

# Social Media
INSTAGRAM_ACCESS_TOKEN=your-instagram-token
TWITTER_API_KEY=your-twitter-key
FACEBOOK_ACCESS_TOKEN=your-facebook-token
```

### 4.3 n8n Workflow Import

1. Import each workflow JSON into n8n
2. Configure environment variables
3. Set up webhook endpoints
4. Enable scheduled triggers
5. Test workflow connections

### 4.4 Frontend Dashboard (Next.js)

```typescript
// Example KPI component
import { useSupabaseQuery } from '@/hooks/useSupabase'

export function RevenueCard() {
  const { data: revenue } = useSupabaseQuery(
    'SELECT SUM(revenue) as total FROM daily_analytics WHERE date >= NOW() - INTERVAL \'30 days\''
  )
  
  return (
    <MetricCard
      title="30-Day Revenue"
      value={revenue?.total || 0}
      format="currency"
      trend="up"
    />
  )
}
```

---

## 5. AUTOMATION PIPELINE FLOW

### Complete Process Flow
1. **Trend Detection** (Every 3 hours)
   - Monitor Google Trends, Reddit, social platforms
   - Calculate trend momentum and priority scores
   - Trigger campaign creation for high-potential trends

2. **Campaign Creation** (Triggered)
   - Generate brand-specific campaign strategies
   - Set budget allocation and target audiences
   - Create campaign records in database

3. **Content Generation** (Triggered)
   - Generate product concepts using AI
   - Create designs with DALL-E 3
   - Write product descriptions with GPT-4

4. **Product Listing** (Triggered)
   - Upload designs to Printify
   - Create product variants and pricing
   - Publish products to store

5. **Social Media** (Triggered)
   - Generate platform-specific content
   - Schedule and post to social channels
   - Track engagement metrics

6. **Analytics Collection** (Daily)
   - Collect data from all sources
   - Calculate KPIs and performance metrics
   - Generate alerts and reports

### Success Metrics Timeline
- **Week 1**: System deployment and first trend detection
- **Week 2**: First automated product launches
- **Week 3**: Social media automation active
- **Week 4**: Full KPI tracking and optimization

---

## 6. SCALING STRATEGY

### Phase 1: Validation (0-30 days)
- Target: $1,500 revenue across all brands
- Focus: Prove automation pipeline works
- Budget: $200 initial investment

### Phase 2: Optimization (30-90 days)
- Target: $5,000 revenue, 4.0+ ROAS
- Focus: Refine AI prompts and targeting
- Budget: Scale to $500+ monthly ad spend

### Phase 3: Expansion (90+ days)
- Target: Multiple trending events, new brands
- Focus: Geographic expansion, new product categories
- Budget: $2,000+ monthly ad spend

### Scaling Indicators
- Consistent ROAS >4.0 for 30+ days
- Net profit margin >30%
- Automation success rate >95%
- Customer satisfaction >4.5/5

---

## 7. RISK MITIGATION

### Technical Risks
- **API Rate Limits**: Implement exponential backoff and caching
- **AI Content Quality**: Human review workflows for critical content
- **System Downtime**: Multi-region deployment and monitoring

### Business Risks
- **Trend Timing**: Multiple trend sources and rapid response capability
- **Competition**: Unique brand positioning and rapid iteration
- **Platform Changes**: Diversified platform strategy

### Financial Risks
- **Budget Control**: Automated spending limits and alerts
- **Profit Margins**: Dynamic pricing and cost monitoring
- **Cash Flow**: Daily financial tracking and forecasting

---

## 8. MONITORING & MAINTENANCE

### Daily Monitoring
- Revenue and ROAS tracking
- Workflow execution success rates
- System performance metrics
- Customer acquisition numbers

### Weekly Reviews
- Product performance analysis
- Social media engagement review
- Customer feedback analysis
- Trend opportunity assessment

### Monthly Optimization
- AI prompt refinement
- Pricing strategy updates
- Campaign performance review
- Strategic planning sessions

---

This comprehensive architecture provides VIRALFORGE with a fully autonomous, scalable, and profitable POD campaign system capable of capitalizing on trending events like 3I/Atlas while maintaining sustainable growth across multiple brand verticals.
