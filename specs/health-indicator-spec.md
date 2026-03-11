# Feature: HealthIndicator Component

### Context
- Reusable visual component for displaying a customer health score across the Customer Intelligence Dashboard
- Currently the health score display logic is inlined in `CustomerCard` — this component extracts it into a shared primitive so it can be reused by `CustomerCard`, `CustomerHealthDisplay`, and any future dashboard widget that needs to show health status
- Used by business analysts viewing the dashboard; must be immediately readable at a glance without requiring explanation
- Designed to be composed into larger components, not used standalone

### Requirements

#### Functional Requirements
- Accept a numeric health score (0–100) and render the appropriate color, label, and score value
- Map score to three tiers with consistent thresholds used across the entire dashboard:
  - Critical / Poor: 0–30 → red
  - Warning / Moderate: 31–70 → yellow
  - Healthy / Good: 71–100 → green
- Support two display sizes: `default` (for cards and lists) and `large` (for detail views and widgets)
- Support an optional `showLabel` prop to toggle the text label (e.g., "Poor", "Moderate", "Good")
- Support an optional `showScore` prop to toggle the numeric score display
- Clamp out-of-range scores gracefully: values below 0 treated as 0, values above 100 treated as 100

#### User Interface Requirements
- Colored circular dot indicating health tier (red / yellow / green)
- Numeric score displayed alongside the dot in a readable weight
- Text label displayed below or beside the score (toggleable via prop)
- Horizontal layout by default: `[dot] [score] [label]`
- `large` size variant: larger dot diameter, larger text, suitable for a widget header
- No animation or transition — static display only
- No interactive states (no hover, no click) — this is a display-only primitive

#### Data Requirements
- Props interface:

  ```ts
  export interface HealthIndicatorProps {
    score: number;               // 0–100 health score
    size?: 'default' | 'large'; // defaults to 'default'
    showLabel?: boolean;         // defaults to true
    showScore?: boolean;         // defaults to true
  }
  ```

- Does not import from `src/data/mock-customers.ts` — accepts a plain `number`, decoupled from data source
- Edge cases:
  - `score = 0` → red, "Poor"
  - `score = 30` → red, "Poor"
  - `score = 31` → yellow, "Moderate"
  - `score = 70` → yellow, "Moderate"
  - `score = 71` → green, "Good"
  - `score = 100` → green, "Good"
  - `score < 0` → clamped to 0, red
  - `score > 100` → clamped to 100, green

#### Integration Requirements
- Consumed by `CustomerCard` (replacing its inline `getHealthIndicator` helper)
- Consumed by `CustomerHealthDisplay` (from `health-score-calculator-spec.md`) for widget-level display
- No callbacks or events — purely presentational, no state
- No context or global state dependencies — fully self-contained

### Constraints

#### Technical Stack
- Next.js 15 (App Router)
- React 19
- TypeScript with strict mode
- Tailwind CSS for styling — no inline styles

#### Performance Requirements
- Pure functional component with no side effects
- Renders in < 1ms — no async operations, no hooks, no memoization needed
- Safe to render inside lists of 100+ items without performance impact

#### Design Constraints
- Default size: dot `w-3 h-3`, score `text-sm`, label `text-xs`
- Large size: dot `w-5 h-5`, score `text-lg font-semibold`, label `text-sm`
- Color classes must use Tailwind's standard palette: `bg-red-500`, `bg-yellow-500`, `bg-green-500`
- Text colors: score in `text-gray-700`, label in `text-gray-400`
- Gap between elements: `gap-2` (default), `gap-3` (large)
- Consistent with existing `CustomerCard` health display — must look identical when used as a drop-in replacement

#### File Structure and Naming
- Component file: `src/components/HealthIndicator.tsx`
- Props interface: `HealthIndicatorProps` exported from component file
- Helper function: `getHealthTier(score: number)` — pure function, exported for use in tests and calculator logic
- Follow project naming conventions (PascalCase components, camelCase props)

#### Security Considerations
- Accepts only a `number` — no user-supplied strings rendered, XSS not applicable
- No sensitive data passed through props
- TypeScript strict types prevent passing non-numeric values

### Acceptance Criteria
- [ ] Renders colored dot, numeric score, and text label for a score of 85 (green, "Good")
- [ ] Renders correctly for score of 45 (yellow, "Moderate")
- [ ] Renders correctly for score of 15 (red, "Poor")
- [ ] Boundary value 30 → red; 31 → yellow; 70 → yellow; 71 → green
- [ ] Out-of-range score -5 is clamped and renders as red (0)
- [ ] Out-of-range score 110 is clamped and renders as green (100)
- [ ] `showLabel={false}` hides the text label; dot and score still visible
- [ ] `showScore={false}` hides the numeric score; dot and label still visible
- [ ] `size="large"` renders with larger dot and text than `size="default"`
- [ ] `HealthIndicatorProps` TypeScript interface is defined and exported; no `any` types
- [ ] `getHealthTier` helper is exported and independently testable
- [ ] Drop-in replacement in `CustomerCard` produces visually identical output to the current inline implementation
- [ ] Passes TypeScript strict mode checks
- [ ] No console errors or warnings in the browser
- [ ] Follows project code style and naming conventions
