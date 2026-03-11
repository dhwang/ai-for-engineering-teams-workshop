# Feature: CustomerCard Component

### Context
- Individual customer display component for the Customer Intelligence Dashboard
- Used within the CustomerSelector container component to show a list of customers
- Provides at-a-glance customer information for quick identification by business analysts
- Foundation component for domain health monitoring integration

### Requirements

#### Functional Requirements
- Display customer name, company name, and health score (0–100)
- Show customer domains (websites) for health monitoring context
- Display domain count when a customer has multiple domains
- Color-coded health indicator based on score:
  - Red: 0–30 (poor health)
  - Yellow: 31–70 (moderate health)
  - Green: 71–100 (good health)
- Basic responsive design for mobile and desktop

#### User Interface Requirements
- Clean, card-based visual design
- Clear typography hierarchy: name > company > health score > domains
- Visual hover state to indicate interactivity

#### Data Requirements
- Accepts a customer object via props
- Uses mock data structure from `src/data/mock-customers.ts`
- Customer interface includes: name, company, health score, and optional `domains` array of website URLs
- Supports customers with one or multiple domains

#### Integration Requirements
- Used within `CustomerSelector` container component
- Props-based data flow from parent
- Properly typed TypeScript interfaces

### Constraints

#### Technical Stack
- Next.js 15 (App Router)
- React 19
- TypeScript with strict mode
- Tailwind CSS for styling

#### Performance Requirements
- Fast rendering (< 16ms per card for 60fps)
- No layout shift during load

#### Design Constraints
- Responsive breakpoints: mobile (320px+), tablet (768px+), desktop (1024px+)
- Maximum card width: 400px
- Minimum card height: 120px
- Consistent spacing using Tailwind spacing scale

#### File Structure and Naming
- Component file: `src/components/CustomerCard.tsx`
- Props interface: `CustomerCardProps` exported from component file
- Follow project naming conventions (PascalCase components, camelCase props)

#### Security Considerations
- Sanitize customer name and company displays (XSS prevention)
- No sensitive customer data exposed in client-side logs
- Proper TypeScript types to prevent data injection

### Acceptance Criteria
- [ ] Displays customer name, company name, and health score correctly
- [ ] Health score color matches specification: red (0–30), yellow (31–70), green (71–100)
- [ ] Shows customer domains with domain count when multiple domains exist
- [ ] Responsive design works on mobile (320px+), tablet (768px+), and desktop (1024px+)
- [ ] Card has a visible hover state indicating clickability
- [ ] `CustomerCardProps` TypeScript interface is defined and exported; no `any` types
- [ ] Component accepts typed props from parent without additional context providers
- [ ] Passes TypeScript strict mode checks
- [ ] No console errors or warnings in the browser
- [ ] Follows project code style and conventions
