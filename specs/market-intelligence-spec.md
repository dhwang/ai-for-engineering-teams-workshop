# Feature: Market Intelligence Widget

### Context
- Market intelligence widget for the Customer Intelligence Dashboard
- Provides real-time market sentiment and news analysis for customer companies
- Displayed alongside existing widgets; receives company name from the selected customer
- Demonstrates consistent widget composition and spec-driven development patterns

### Requirements

#### Functional Requirements
- Accept a company name input and fetch market sentiment and news data
- Display market sentiment with color-coded indicators (green = positive, yellow = neutral, red = negative)
- Show news article count and last updated timestamp
- Display top 3 headlines with source and publication date
- Loading state while data is being fetched
- Error state with a user-friendly message on failure
- Input field for manual company name entry with validation

#### API Layer Requirements
- Next.js API route at `/api/market-intelligence/[company]`
- Validate and sanitize the `company` name path parameter
- Return consistent JSON response: `{ sentiment, newsCount, headlines, updatedAt }`
- Simulate realistic API delay for authentic loading UX
- Follow the same route handler patterns as existing customer management API routes

#### Service Layer Requirements
- `MarketIntelligenceService` class following established service patterns
- In-memory caching with 10-minute TTL for mock news data
- Custom `MarketIntelligenceError` class extending base `Error`
- Mock data generator producing realistic company-specific headlines and sentiment
- Pure function implementations for testability

#### Dashboard Integration Requirements
- Integrates into the main Dashboard component alongside existing widgets
- Receives company name automatically from the selected customer via props
- Follows the same prop passing and state management patterns as other widgets
- Maintains responsive grid layout and consistent spacing

### Constraints

#### Technical Stack
- Next.js 15 App Router with Route Handlers
- React 19 hooks and patterns
- TypeScript with strict mode and strict typing for all interfaces
- Tailwind CSS for styling using design system colors

#### Design Constraints
- Color coding matches existing dashboard system: green (positive), yellow (neutral), red (negative)
- Consistent spacing, typography, and component structure with other widgets
- Same input, button, and error display patterns as existing components
- Responsive layout maintained across all breakpoints

#### File Structure and Naming
- API route: `src/app/api/market-intelligence/[company]/route.ts`
- Service class: `src/lib/MarketIntelligenceService.ts`
- UI component: `src/components/MarketIntelligenceWidget.tsx`
- Props interface: `MarketIntelligenceWidgetProps` exported from component file
- Follow project naming conventions (PascalCase components, camelCase props)

#### Security Considerations
- Company name parameter validated and sanitized before use to prevent injection
- Error messages sanitized — no sensitive information leaked to the client
- Mock data generation used to prevent external API vulnerabilities
- Follow the same security patterns as existing customer management integration

### Acceptance Criteria
- [ ] API route `/api/market-intelligence/[company]` returns correct JSON structure: `{ sentiment, newsCount, headlines, updatedAt }`
- [ ] Invalid or empty company name input returns a descriptive validation error
- [ ] Sentiment is displayed with correct color coding: green (positive), yellow (neutral), red (negative)
- [ ] Top 3 headlines render with source and publication date
- [ ] News article count and last updated timestamp are displayed
- [ ] Loading state is shown while the API request is in flight
- [ ] Error state renders a user-friendly message on API failure
- [ ] Service layer caches results for 10 minutes and returns cached data on repeat requests
- [ ] `MarketIntelligenceError` class is thrown for service-level failures
- [ ] Widget receives company name from selected customer and auto-fetches data
- [ ] Widget integrates into Dashboard grid without breaking responsive layout
- [ ] All TypeScript interfaces defined and exported; no `any` types
- [ ] Passes TypeScript strict mode checks
- [ ] No console errors or warnings in the browser
