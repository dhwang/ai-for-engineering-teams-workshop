# Feature: Health Score Calculator

### Context
- Comprehensive customer health scoring system for the Customer Intelligence Dashboard
- Provides predictive analytics for customer relationship health and churn risk
- Used by business analysts to monitor customer status and identify at-risk accounts
- Integrates with CustomerSelector for real-time score updates on customer selection

### Requirements

#### Functional Requirements
- Calculate customer health scores on a 0–100 scale
- Multi-factor weighted scoring:
  - Payment history: 40%
  - Engagement metrics: 30%
  - Contract status: 20%
  - Support satisfaction: 10%
- Risk level classification:
  - Healthy: 71–100
  - Warning: 31–70
  - Critical: 0–30
- Individual scoring functions for each factor, combined by a main `calculateHealthScore` function
- Input validation and descriptive error handling for all data inputs
- Edge case handling for new customers and missing/incomplete data
- Trend analysis consideration for improving vs. declining customers

#### Data Input Requirements
- **Payment**: days since last payment, average payment delay, overdue amounts
- **Engagement**: login frequency, feature usage count, support ticket volume
- **Contract**: days until renewal, contract value, recent upgrades
- **Support**: average resolution time, satisfaction scores, escalation counts

#### UI Component Requirements
- `CustomerHealthDisplay` widget showing overall health score with color-coded visualization
- Expandable breakdown of individual factor scores
- Loading and error states consistent with other dashboard widgets
- Color coding consistent with other dashboard health indicators (red/yellow/green)
- Real-time updates when customer selection changes via CustomerSelector

#### Integration Requirements
- Seamless integration with existing `CustomerSelector` component
- Consistent error handling and loading state patterns across the dashboard
- Dashboard layout integration maintaining responsive design

### Constraints

#### Technical Stack
- Next.js 15 (App Router)
- React 19
- TypeScript with strict mode and strict typing for all interfaces and functions
- Tailwind CSS for styling

#### Architecture Constraints
- Pure function implementation — no side effects for predictable testing
- Calculator functions located in `lib/healthCalculator.ts`
- TypeScript interfaces for all data structures and return types
- Error classes extending base `Error` for proper exception handling
- Detailed JSDoc comments explaining business logic and mathematical formulas

#### Performance Requirements
- Efficient algorithms suitable for real-time dashboard updates
- Caching considerations for repeated calculations with the same inputs
- Minimal computational overhead to maintain dashboard responsiveness

#### File Structure and Naming
- Business logic: `src/lib/healthCalculator.ts`
- UI component: `src/components/CustomerHealthDisplay.tsx`
- Props interface: `CustomerHealthDisplayProps` exported from component file
- Follow project naming conventions (PascalCase components, camelCase functions)

### Acceptance Criteria
- [ ] `calculateHealthScore` returns a score between 0–100 for valid inputs
- [ ] Weighted factors sum correctly: Payment (40%) + Engagement (30%) + Contract (20%) + Support (10%) = 100%
- [ ] Risk levels are correctly assigned: Healthy (71–100), Warning (31–70), Critical (0–30)
- [ ] Individual factor scoring functions are exported and testable in isolation
- [ ] Input validation rejects invalid or missing data with descriptive error messages
- [ ] Edge cases handled: new customers with no history, partially missing data
- [ ] `CustomerHealthDisplay` renders overall score with correct color coding
- [ ] Factor score breakdown is expandable and displays each weighted component
- [ ] Loading and error states render consistently with other dashboard widgets
- [ ] Real-time score update occurs when a new customer is selected
- [ ] All TypeScript interfaces defined and exported; no `any` types
- [ ] Comprehensive unit tests cover all calculation functions, edge cases, and error handling
- [ ] Mathematical accuracy verified through boundary condition tests
- [ ] JSDoc comments present on all public functions explaining logic and formulas
- [ ] Passes TypeScript strict mode checks
- [ ] No console errors or warnings in the browser
