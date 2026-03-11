Implement a component from the spec file at: $ARGUMENTS

## Instructions

### Step 1 — Read the spec

Read the spec file provided in `$ARGUMENTS` (e.g., `specs/customer-card-spec.md`).

Extract and note the following before writing any code:
- **Component name** (from the Feature heading)
- **Output file path** (from File Structure and Naming in Constraints — typically `src/components/[ComponentName].tsx`)
- **All Acceptance Criteria** (the `- [ ]` checklist) — keep these in working memory as the definition of done
- **Data interface** (from Data Requirements and Integration Requirements)
- **UI and functional requirements**

Also read any files referenced in the spec (e.g., `src/data/mock-customers.ts`) to understand existing types and data shapes.

---

### Step 2 — Check for an existing implementation

Check whether the output file already exists (e.g., `src/components/CustomerCard.tsx`).

- If it exists, read it to understand the current state before making changes.
- Note what's already correct and what needs to be added or changed.

---

### Step 3 — Implement the component

Write the component to `src/components/[ComponentName].tsx`.

Follow these rules strictly:
- Use **TypeScript strict mode** — no `any` types
- Use **Tailwind CSS** for all styling — no inline styles, no CSS modules
- Use **React 19** and **Next.js 15 App Router** conventions
- Export the **props interface** named `[ComponentName]Props` from the component file
- Import types from existing project files (e.g., `src/data/mock-customers.ts`) rather than redefining them
- **XSS prevention**: rely on React's JSX auto-escaping; never use `dangerouslySetInnerHTML` with user data
- No `console.log` or debug statements in the output
- Follow the typography hierarchy and layout described in the spec
- Implement all functional, UI, data, and integration requirements from the spec

---

### Step 4 — Verify against acceptance criteria

After writing the component, go through **each acceptance criterion** from the spec one by one.

For each criterion:
- Reason through whether the implementation satisfies it based on a careful re-read of the code
- Mark it ✅ if satisfied or ❌ if not, with a brief reason

Format your review as:
```
## Acceptance Criteria Verification

- [ ] <criterion text> → ✅ Satisfied: <reason>
- [ ] <criterion text> → ❌ Not met: <reason>
```

---

### Step 5 — Refine if needed

If any criterion is marked ❌, update the implementation to address the gap, then re-verify that criterion.

Repeat until all criteria are marked ✅. Do not stop until all criteria pass.

---

### Step 6 — Final summary

Output a brief summary:
```
## Implementation Complete: [ComponentName]

**File:** `src/components/[ComponentName].tsx`

**All acceptance criteria met:** ✅

**Key implementation decisions:**
- <decision and rationale>
- ...
```
