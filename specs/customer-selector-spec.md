# Feature: CustomerSelector Component

### Context
- Main customer selection interface for the Customer Intelligence Dashboard
- Allows users to quickly find and select a customer from a large list
- Must handle 100+ customers efficiently without degraded performance
- Acts as a container for CustomerCard components

### Requirements

#### Functional Requirements
- Display a list of CustomerCard components with name, company, and health score
- Search and filter customers by name or company in real time
- Highlight the currently selected customer with a visual selection state
- Persist the selected customer across page interactions (e.g. navigation, re-renders)

#### User Interface Requirements
- Search input at the top of the list for filtering
- Scrollable customer list below the search input
- Clear visual distinction between selected and unselected cards
- Empty state message when no customers match the search query

#### Data Requirements
- Accepts an array of customer objects via props or from a shared data source
- Customer interface includes: name, company, health score
- Uses mock data from `src/data/mock-customers.ts`

#### Integration Requirements
- Renders `CustomerCard` components for each customer entry
- Exposes an `onSelect` callback to notify parent of the selected customer
- Selection state may be lifted to a parent or managed internally with persistence

### Constraints

#### Technical Stack
- Next.js 15 (App Router)
- React 19
- TypeScript with strict mode
- Tailwind CSS for styling

#### Performance Requirements
- Must render and filter 100+ customers without jank (< 16ms per frame)
- Search filtering should be synchronous and instant for lists up to 500 items
- Use `useMemo` or similar to avoid unnecessary recomputation on re-renders

#### Design Constraints
- Responsive: works on mobile (320px+), tablet (768px+), and desktop (1024px+)
- Consistent spacing using Tailwind spacing scale
- Search input uses standard Tailwind form styles

#### File Structure and Naming
- Component file: `src/components/CustomerSelector.tsx`
- Props interface: `CustomerSelectorProps` exported from component file
- Follow project naming conventions (PascalCase components, camelCase props)

#### Security Considerations
- Sanitize search input before using in any dynamic rendering (XSS prevention)
- No sensitive customer data exposed in client-side logs

### Acceptance Criteria
- [ ] Renders a list of CustomerCard components from the provided customer data
- [ ] Search input filters customers by name or company in real time
- [ ] Empty state is shown when no customers match the search query
- [ ] Selected customer card has a distinct visual highlight
- [ ] `onSelect` callback fires with the correct customer when a card is clicked
- [ ] Selection persists across page interactions (re-renders, navigation)
- [ ] Handles 100+ customers without visible performance degradation
- [ ] Responsive layout works on mobile (320px+), tablet (768px+), and desktop (1024px+)
- [ ] `CustomerSelectorProps` TypeScript interface defined and exported; no `any` types
- [ ] Passes TypeScript strict mode checks
- [ ] No console errors or warnings in the browser
