# Feature: Predictive Intelligence System

### Context
- Intelligent predictive alerts and market intelligence system for the Customer Intelligence Dashboard
- Provides proactive customer risk monitoring, early warning capabilities, and external market context
- Combines rule-based alert triggering with real-time market sentiment analysis
- Enables business analysts to act on risks before they become customer losses

### Requirements

#### Functional Requirements

##### Alert Rules Engine
- Multi-tier alert priority system:
  - **High Priority** (immediate action required):
    - Payment Risk: payment overdue > 30 days OR health score drops > 20 points in 7 days
    - Engagement Cliff: login frequency drops > 50% vs. 30-day average
    - Contract Expiration Risk: contract expires in < 90 days AND health score < 50
  - **Medium Priority** (monitor closely):
    - Support Ticket Spike: > 3 support tickets in 7 days OR an escalated ticket
    - Feature Adoption Stall: no new feature usage in 30 days for growing accounts
- Configurable thresholds and cooldown periods to prevent alert fatigue
- Alert prioritization weighted by customer value (ARR) and urgency
- Deduplication logic to prevent duplicate alerts for the same customer/issue
- Alert history tracking and audit trail for response effectiveness analysis
- Business hours consideration for alert delivery timing

##### Market Intelligence
- API route at `/api/market-intelligence/[company]` returning sentiment, news count, and headlines
- In-memory caching with 10-minute TTL for mock news data
- Display top 3 headlines with source and publication date
- Market sentiment with color-coded indicators (green = positive, yellow = neutral, red = negative)
- News article count and last updated timestamp
- Auto-fetch when selected customer changes via CustomerSelector

##### User Interface
- Real-time alert display widget integrated into the main dashboard
- Alert priority visualization with color coding (red = high, yellow = medium)
- Alert detail panels with recommended actions and context
- Alert dismissal and action tracking interface
- Historical alerts view
- `MarketIntelligenceWidget` with manual company name input and auto-population from selected customer
- Loading and error states consistent with other dashboard widgets

#### Data Monitoring Requirements
- Real-time monitoring of health score changes and thresholds
- Login pattern analysis for gradual vs. sudden engagement drops
- Payment timing and behavior change detection
- Support satisfaction trends and ticket escalation monitoring
- Feature usage depth and adoption pattern analysis

#### Integration Requirements
- Integrates with existing `CustomerSelector`, `CustomerHealthDisplay`, and dashboard layout
- Alert state synchronized with customer selection changes
- Consistent UI patterns and color system with other widgets
- Export capabilities for alert data and historical analysis

### Constraints

#### Technical Stack
- Next.js 15 (App Router) with Route Handlers for the market intelligence API
- React 19 with hooks
- TypeScript with strict mode; no `any` types
- Tailwind CSS with design system color tokens

#### Architecture Constraints
- Pure function implementation for all alert rules in `src/lib/alerts.ts`
- Main `alertEngine` function evaluates all rules against customer data
- `MarketIntelligenceService` class with caching and custom `MarketIntelligenceError`
- TypeScript interfaces for all alert types, customer data, market data, and system responses
- No side effects in rule evaluation functions for predictable testing

#### Performance Requirements
- Real-time alert processing with minimal latency
- Efficient rule evaluation for 100+ customers without blocking the UI
- Optimized caching for market intelligence to reduce redundant API calls
- Scalable architecture supporting a growing customer base

#### File Structure and Naming
- Alert rules engine: `src/lib/alerts.ts`
- Market intelligence service: `src/lib/MarketIntelligenceService.ts`
- Market intelligence API: `src/app/api/market-intelligence/[company]/route.ts`
- Alert widget: `src/components/PredictiveAlertsWidget.tsx`
- Market intelligence widget: `src/components/MarketIntelligenceWidget.tsx`
- Props interfaces exported from respective component files
- Follow project naming conventions (PascalCase components, camelCase functions)

#### Security Considerations
- Company name parameter validated and sanitized before use in API route
- No sensitive customer data exposed in alert messages or logs
- Rate limiting on alert generation and market intelligence API endpoint
- Audit trail logging for all triggered alerts and user actions
- Error messages sanitized — no internal details leaked to client

### Acceptance Criteria
- [ ] High priority alerts trigger correctly for all three rule types (Payment Risk, Engagement Cliff, Contract Expiration Risk)
- [ ] Medium priority alerts trigger correctly for both rule types (Support Spike, Feature Adoption Stall)
- [ ] Cooldown periods prevent duplicate/spam alerts for the same customer and issue
- [ ] Alert deduplication logic prevents identical alerts from appearing multiple times
- [ ] `alertEngine` correctly prioritizes alerts by customer ARR and urgency
- [ ] Alerts display with correct color coding: red (high), yellow (medium)
- [ ] Alert detail panel shows recommended action and contextual data
- [ ] Alert dismissal and action tracking updates alert state correctly
- [ ] Market intelligence API returns correct JSON: `{ sentiment, newsCount, headlines, updatedAt }`
- [ ] Invalid company name returns a descriptive validation error
- [ ] Market sentiment displays with correct color coding (green/yellow/red)
- [ ] Top 3 headlines render with source and publication date
- [ ] Market data is cached for 10 minutes; repeat requests return cached data
- [ ] Widget auto-fetches market data when selected customer changes
- [ ] Loading and error states render consistently with other dashboard widgets
- [ ] All alert rule functions are exported and unit-testable in isolation
- [ ] Comprehensive unit tests cover all rules, edge cases, and error handling
- [ ] All TypeScript interfaces defined and exported; no `any` types
- [ ] Passes TypeScript strict mode checks
- [ ] No console errors or warnings in the browser
