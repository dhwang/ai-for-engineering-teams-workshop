# Feature: Customer Health Monitoring

### Context
- Comprehensive customer health scoring and display system for the Customer Intelligence Dashboard
- Provides predictive analytics for customer relationship health and churn risk
- Production-ready implementation with resilience, accessibility, and performance optimizations
- Integrates with CustomerSelector for real-time score updates and dashboard-wide health visibility

### Requirements

#### Functional Requirements
- Calculate customer health scores on a 0–100 scale using a weighted multi-factor algorithm:
  - Payment history: 40%
  - Engagement metrics: 30%
  - Contract status: 20%
  - Support satisfaction: 10%
- Risk level classification: Healthy (71–100), Warning (31–70), Critical (0–30)
- Individual scoring functions for each factor, combined by a main `calculateHealthScore` function
- Input validation and descriptive error handling for all data inputs
- Edge case handling for new customers and missing/incomplete data
- Trend analysis for improving vs. declining customers
- `CustomerHealthDisplay` widget with overall score, color-coded visualization, and expandable factor breakdown
- Loading and error states consistent with other dashboard widgets
- Graceful degradation when the health calculation service fails

#### Data Structure Requirements

##### TypeScript Interfaces

```typescript
// Input data structures
interface PaymentData {
  daysSinceLastPayment: number;
  averagePaymentDelayDays: number;
  overdueAmountUSD: number;
}

interface EngagementData {
  loginFrequencyPerMonth: number;
  featureUsageCount: number;
  supportTicketCount: number;
  loginFrequency30DayAvg?: number; // for trend analysis
}

interface ContractData {
  daysUntilRenewal: number;
  contractValueUSD: number;
  hasRecentUpgrade: boolean;
}

interface SupportData {
  averageResolutionTimeHours: number;
  satisfactionScore: number;    // 0–10 scale
  escalationCount: number;
}

interface CustomerHealthInput {
  payment: PaymentData;
  engagement: EngagementData;
  contract: ContractData;
  support: SupportData;
}

// Output data structures
type RiskLevel = 'healthy' | 'warning' | 'critical';

interface FactorScore {
  score: number;       // 0–100
  weight: number;      // e.g. 0.4 for 40%
  weightedScore: number;
}

interface HealthScoreBreakdown {
  payment: FactorScore;
  engagement: FactorScore;
  contract: FactorScore;
  support: FactorScore;
}

interface HealthScoreResult {
  overallScore: number;          // 0–100
  riskLevel: RiskLevel;
  breakdown: HealthScoreBreakdown;
  trend?: 'improving' | 'stable' | 'declining';
  calculatedAt: string;          // ISO 8601 timestamp
}

// Alert-related data structures (from predictive alerts integration)
type AlertPriority = 'high' | 'medium';

type AlertType =
  | 'payment_risk'
  | 'engagement_cliff'
  | 'contract_expiration_risk'
  | 'support_ticket_spike'
  | 'feature_adoption_stall';

interface Alert {
  id: string;
  customerId: string;
  type: AlertType;
  priority: AlertPriority;
  message: string;
  recommendedAction: string;
  triggeredAt: string;           // ISO 8601 timestamp
  acknowledgedAt?: string;
  resolvedAt?: string;
}

interface AlertEngineResult {
  alerts: Alert[];
  evaluatedAt: string;           // ISO 8601 timestamp
}

// UI component props
interface CustomerHealthDisplayProps {
  input: CustomerHealthInput;
  onRetry?: () => void;
  className?: string;
}
```

##### Data Input Field Descriptions
- **Payment**: `daysSinceLastPayment`, `averagePaymentDelayDays`, `overdueAmountUSD`
- **Engagement**: `loginFrequencyPerMonth`, `featureUsageCount`, `supportTicketCount`, optional `loginFrequency30DayAvg` for trend detection
- **Contract**: `daysUntilRenewal`, `contractValueUSD`, `hasRecentUpgrade`
- **Support**: `averageResolutionTimeHours`, `satisfactionScore` (0–10), `escalationCount`

#### Resilience Requirements
- Widget-level error boundary (`WidgetErrorBoundary`) to isolate failures
- User-friendly error messages with retry mechanism
- Fallback UI that maintains core dashboard functionality when widget fails
- Automatic error logging for monitoring and debugging

#### Accessibility Requirements
- WCAG 2.1 AA compliance for all health display components
- Color-coded indicators supplemented with text labels (not color alone)
- Screen reader announcements for health score updates (ARIA live regions)
- Keyboard-navigable expandable breakdown panel
- Focus indicators meeting WCAG contrast requirements

### Constraints

#### Technical Stack
- Next.js 15 (App Router)
- React 19 with hooks and `React.memo` for optimization
- TypeScript with strict mode; no `any` types
- Tailwind CSS for styling using design system color tokens

#### Architecture Constraints
- Pure function implementation — no side effects for predictable testing
- Calculator functions in `src/lib/healthCalculator.ts`
- Custom error classes extending base `Error`
- Detailed JSDoc comments on all public functions explaining business logic and formulas
- `React.memo` / `useMemo` applied to prevent unnecessary re-renders

#### Performance Requirements
- Component renders in < 16ms for 60fps dashboard interactions
- `calculateHealthScore` suitable for real-time updates without memoization overhead
- Caching for repeated calculations with identical inputs

#### File Structure and Naming
- Business logic: `src/lib/healthCalculator.ts`
- UI component: `src/components/CustomerHealthDisplay.tsx`
- Error boundary: `src/components/WidgetErrorBoundary.tsx`
- Props interface: `CustomerHealthDisplayProps` exported from component file
- Follow project naming conventions (PascalCase components, camelCase functions)

#### Security Considerations
- No sensitive customer data exposed in client-side error logs
- All inputs validated before calculation to prevent unexpected behavior
- Error messages sanitized — no internal stack traces exposed to users

### Integration Architecture

#### Component Interaction Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     Dashboard Orchestrator                       │
│                  (dashboard-orchestrator-spec)                   │
│                                                                  │
│  ┌─────────────────────┐     ┌───────────────────────────────┐  │
│  │  CustomerSelector   │────▶│   CustomerHealthDisplay       │  │
│  │  (customer-selector │     │   (this spec)                 │  │
│  │   -spec)            │     │                               │  │
│  │                     │     │  ┌─────────────────────────┐  │  │
│  │  [customer list]    │     │  │  HealthScoreBreakdown   │  │  │
│  │  [search/filter]    │     │  │  (expandable panel)     │  │  │
│  └─────────────────────┘     │  └─────────────────────────┘  │  │
│           │                  │                                │  │
│           │ selectedCustomer │  ┌─────────────────────────┐  │  │
│           └─────────────────▶│  │  WidgetErrorBoundary    │  │  │
│                              │  │  (fallback + retry)     │  │  │
│                              │  └─────────────────────────┘  │  │
│                              └───────────┬───────────────────┘  │
│                                          │                       │
│                              ┌───────────▼───────────────────┐  │
│                              │   PredictiveAlertsWidget       │  │
│                              │   (predictive-intelligence     │  │
│                              │    -spec)                      │  │
│                              │                                │  │
│                              │  reads HealthScoreResult to    │  │
│                              │  evaluate alert rules          │  │
│                              └───────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

         ┌──────────────────────────────────────────────┐
         │              src/lib/                        │
         │                                              │
         │  healthCalculator.ts                         │
         │  ┌──────────────────────────────────────┐    │
         │  │ calculatePaymentScore(PaymentData)   │    │
         │  │ calculateEngagementScore(...)        │    │
         │  │ calculateContractScore(...)          │    │
         │  │ calculateSupportScore(...)           │    │
         │  │ calculateHealthScore(CustomerHealth  │    │
         │  │   Input) → HealthScoreResult         │    │
         │  └──────────────────────────────────────┘    │
         │                    ▲                         │
         │  alerts.ts         │                         │
         │  ┌─────────────────┴────────────────────┐    │
         │  │ alertEngine(customer, HealthScore     │    │
         │  │   Result) → AlertEngineResult         │    │
         │  └──────────────────────────────────────┘    │
         └──────────────────────────────────────────────┘
```

#### Data Flow Description

1. **Customer Selection** — `CustomerSelector` emits a `selectedCustomer` object whenever the user picks a customer. The Dashboard Orchestrator passes this down as props.

2. **Score Calculation** — `CustomerHealthDisplay` receives `CustomerHealthInput` (derived from `selectedCustomer`) and calls `calculateHealthScore()` from `healthCalculator.ts`. The pure function returns a `HealthScoreResult` with the overall score, risk level, per-factor breakdown, and trend.

3. **Alert Evaluation** — `PredictiveAlertsWidget` consumes the same `HealthScoreResult` and passes it to `alertEngine()` in `alerts.ts`. The engine evaluates all configured rules and returns an `AlertEngineResult` containing prioritized `Alert[]`.

4. **Display** — `CustomerHealthDisplay` renders the overall score, color-coded risk badge, and an expandable `HealthScoreBreakdown` panel. Simultaneously, `PredictiveAlertsWidget` renders any triggered alerts with recommended actions.

5. **Error Isolation** — If `calculateHealthScore()` throws, `WidgetErrorBoundary` catches the error, logs it, and renders a fallback UI with a retry button — leaving all other widgets unaffected.

6. **Export** — The Dashboard Orchestrator's `ExportUtils` reads `HealthScoreResult` and `AlertEngineResult` directly to generate CSV/JSON health reports and alert history exports.

#### Key Integration Points

| Integration Point | Consumer | Provider | Contract |
|---|---|---|---|
| `selectedCustomer` prop | `CustomerHealthDisplay` | `CustomerSelector` | `Customer` interface from `customer-selector-spec` |
| `calculateHealthScore()` | `CustomerHealthDisplay` | `healthCalculator.ts` | `(CustomerHealthInput) => HealthScoreResult` |
| `HealthScoreResult` | `PredictiveAlertsWidget` | `healthCalculator.ts` | `HealthScoreResult` interface (this spec) |
| `alertEngine()` | `PredictiveAlertsWidget` | `alerts.ts` | `(customer, HealthScoreResult) => AlertEngineResult` |
| `WidgetErrorBoundary` | `CustomerHealthDisplay` | `dashboard-orchestrator-spec` | `{ children, fallback?, onRetry? }` |
| `ExportUtils` | Dashboard Orchestrator | `HealthScoreResult` / `AlertEngineResult` | Serializable result types |

#### Dependencies on Previously Created Specs

| Spec | Dependency |
|---|---|
| `customer-selector-spec.md` | Provides the `Customer` object and `onSelect` callback that drives `CustomerHealthInput` population |
| `predictive-intelligence-spec.md` | Consumes `HealthScoreResult` and `Alert`/`AlertEngineResult` types defined in this spec; `alertEngine()` in `alerts.ts` depends on `calculateHealthScore()` output |
| `dashboard-orchestrator-spec.md` | Owns `WidgetErrorBoundary`, the responsive grid layout, and `ExportUtils`; this spec's widget must conform to its error boundary and export interfaces |
| `market-intelligence-spec.md` | Peer widget — no direct data dependency, but shares the same `WidgetErrorBoundary` pattern and design system color tokens |

### Acceptance Criteria
- [ ] `calculateHealthScore` returns a score between 0–100 for valid inputs
- [ ] Weighted factors sum correctly: Payment (40%) + Engagement (30%) + Contract (20%) + Support (10%)
- [ ] Risk levels assigned correctly: Healthy (71–100), Warning (31–70), Critical (0–30)
- [ ] Individual factor scoring functions are exported and testable in isolation
- [ ] Input validation rejects invalid/missing data with descriptive error messages
- [ ] Edge cases handled: new customers with no history, partially missing data
- [ ] `CustomerHealthDisplay` renders overall score with correct color coding and text label
- [ ] Factor breakdown is expandable and shows each weighted component score
- [ ] Loading state displays while score is being calculated/fetched
- [ ] Error state renders user-friendly message with retry option via `WidgetErrorBoundary`
- [ ] Widget isolates failures — a crash does not bring down the whole dashboard
- [ ] ARIA live region announces score updates to screen readers
- [ ] Expandable panel is keyboard-navigable with visible focus indicators
- [ ] All TypeScript interfaces defined and exported; no `any` types
- [ ] Comprehensive unit tests cover all calculation functions, edge cases, and error handling
- [ ] Passes TypeScript strict mode checks
- [ ] No console errors or warnings in the browser
