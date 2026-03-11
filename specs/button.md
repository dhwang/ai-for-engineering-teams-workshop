# Feature: Button Component

## Context
- General-purpose interactive button for the Customer Intelligence Dashboard
- Used across the application for primary actions, secondary actions, and destructive operations
- Consumed by forms, dialogs, toolbars, and card action areas
- Foundation UI primitive that other components build on top of

## Requirements

### Functional Requirements
- Support click interaction with an `onClick` handler
- Support disabled state that prevents interaction
- Support a loading state with a spinner that prevents interaction
- Render as a native `<button>` element for accessibility
- Optionally render as an anchor (`<a>`) via an `href` prop (for link-style buttons)

### User Interface Requirements
- Three visual variants:
  - `primary` — filled background, used for the main call-to-action
  - `secondary` — outlined style, used for secondary actions
  - `danger` — red-tinted, used for destructive actions (delete, remove)
- Three sizes:
  - `sm` — compact, suitable for inline or toolbar use
  - `md` (default) — standard form button
  - `lg` — prominent action areas or hero sections
- Optional leading or trailing icon slot (accepts a React node)
- Full-width mode via a `fullWidth` boolean prop
- Visible focus ring for keyboard navigation
- Hover and active visual states

### Data Requirements
- `variant`: `'primary' | 'secondary' | 'danger'` (default: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (default: `'md'`)
- `disabled`: `boolean` (default: `false`)
- `loading`: `boolean` (default: `false`)
- `fullWidth`: `boolean` (default: `false`)
- `onClick`: `(event: React.MouseEvent<HTMLButtonElement>) => void` (optional)
- `type`: `'button' | 'submit' | 'reset'` (default: `'button'`)
- `href`: `string` (optional; renders as `<a>` when provided)
- `leadingIcon`: `React.ReactNode` (optional)
- `trailingIcon`: `React.ReactNode` (optional)
- `children`: `React.ReactNode` (required; button label)
- `className`: `string` (optional; escape hatch for one-off overrides)
- `aria-label`: `string` (optional; for icon-only buttons)

### Integration Requirements
- Exported from `components/Button.tsx` with a named export
- Props interface `ButtonProps` exported from the same file
- Usable anywhere in the app without additional context providers

## Constraints

### Technical Stack
- Next.js 15 (App Router)
- React 19
- TypeScript with strict mode
- Tailwind CSS for all styling (no inline styles)

### Performance Requirements
- Pure presentational component — no internal state beyond what's passed via props
- No unnecessary re-renders (`React.memo` not required at this scale)

### Design Constraints
- Responsive: works correctly at all viewport widths
- Minimum touch target: 44×44px (WCAG 2.5.5)
- Consistent spacing using Tailwind spacing scale
- Loading spinner uses CSS animation (no external library)
- Tailwind color tokens:
  - Primary: `blue-600` / hover `blue-700`
  - Secondary: `white` bg with `gray-300` border / hover `gray-50`
  - Danger: `red-600` / hover `red-700`
- Size token map:
  - `sm`: `text-sm px-3 py-1.5`
  - `md`: `text-sm px-4 py-2`
  - `lg`: `text-base px-6 py-3`

### File Structure and Naming
- Component file: `src/components/Button.tsx`
- Props interface: `ButtonProps` exported from component file
- Follow project naming conventions (PascalCase components, camelCase props)

### Security Considerations
- When `href` is provided and starts with `http`, add `rel="noopener noreferrer"` automatically
- No `dangerouslySetInnerHTML` usage
- `onClick` is called only when the button is not disabled or loading

### Accessibility Requirements
- Disabled state sets both the `disabled` HTML attribute and `aria-disabled="true"`
- Loading state sets `aria-busy="true"` and hides the spinner from screen readers (`aria-hidden="true"` on spinner)
- Focus ring must be visible (use Tailwind `focus-visible:ring-2`)
- `type="button"` default prevents accidental form submission

## Acceptance Criteria

- [ ] Renders all three variants (`primary`, `secondary`, `danger`) with correct Tailwind classes
- [ ] Renders all three sizes (`sm`, `md`, `lg`) with correct padding and text size
- [ ] `disabled` prop prevents `onClick` from firing and applies disabled visual styles
- [ ] `loading` prop shows a spinner, prevents `onClick`, and sets `aria-busy="true"`
- [ ] `fullWidth` prop makes the button stretch to its container width
- [ ] `leadingIcon` and `trailingIcon` render correctly alongside the label
- [ ] When `href` is provided the component renders as an `<a>` element
- [ ] External `href` values include `rel="noopener noreferrer"` automatically
- [ ] Visible focus ring appears on keyboard focus
- [ ] `aria-label` prop is forwarded correctly for icon-only use cases
- [ ] Proper TypeScript interfaces defined and exported; no `any` types
- [ ] Passes TypeScript strict mode checks (`npm run type-check`)
- [ ] Passes ESLint checks (`npm run lint`)
- [ ] No console errors or warnings in the browser
