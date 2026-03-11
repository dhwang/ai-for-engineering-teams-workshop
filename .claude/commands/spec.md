Generate a spec for the component: $ARGUMENTS

## Instructions

1. **Derive the component name** from `$ARGUMENTS` (e.g., "CustomerCard" → file slug `customer-card`).

2. **Check for a requirements file** at `requirements/[component-name].md` (e.g., `requirements/customer-card.md`):
   - If it exists, read it and use it as source material for the spec.
   - If it does not exist, generate the spec based on the component name and any other context available in the project (existing code, related specs, mock data, etc.).

3. **Read `templates/spec-template.md`** to understand the required structure.

4. **Generate a complete spec** following the template structure exactly, with these four top-level sections populated in full:

   ### Context
   - Purpose and role in the application
   - How it fits into the larger system (what uses it, what it contains)
   - Who will use it and when

   ### Requirements

   #### Functional Requirements
   - What the component must do, as a bullet list

   #### User Interface Requirements
   - Visual design, layout, interactions, states (hover, selected, empty, etc.)

   #### Data Requirements
   - Props or data sources accepted
   - TypeScript interface fields (referencing `src/data/mock-customers.ts` or other project data sources where relevant)
   - Edge cases in data (empty arrays, optional fields, etc.)

   #### Integration Requirements
   - Which parent components use this component
   - Callbacks or events it exposes to parents
   - Any state management or context dependencies

   ### Constraints

   #### Technical Stack
   - Next.js 15 (App Router), React 19, TypeScript strict mode, Tailwind CSS

   #### Performance Requirements
   - Rendering thresholds, re-render avoidance, list size handling

   #### Design Constraints
   - Responsive breakpoints: mobile (320px+), tablet (768px+), desktop (1024px+)
   - Size limits (max-width, min-height) and spacing conventions

   #### File Structure and Naming
   - Component file path: `src/components/[ComponentName].tsx`
   - Props interface name and export
   - Naming conventions (PascalCase components, camelCase props)

   #### Security Considerations
   - XSS prevention for any user-visible string rendering
   - No sensitive data in client-side logs
   - TypeScript types to prevent unsafe data access

   ### Acceptance Criteria
   - Write each criterion as a checkbox: `- [ ] ...`
   - Cover: happy path, edge cases (empty/null data, boundary values), UX states, TypeScript compliance, integration points

5. **Save the generated spec** to `specs/[component-name]-spec.md` (e.g., `specs/customer-card-spec.md`).

6. **Confirm** the file was written and list the path.
