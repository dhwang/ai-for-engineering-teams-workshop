Verify the component at: $ARGUMENTS

Run a structured verification across four areas: TypeScript, rendering, responsive design, and spec alignment. Report a clear pass/fail for each.

---

## Step 1 — Read the component

Read the file at `$ARGUMENTS` (e.g., `src/components/CustomerCard.tsx`).

Extract:
- **Component name** (from the default export or filename)
- **Props interface name and fields**
- **All imports** — verify referenced files exist
- **Tailwind classes used** — note any responsive prefixes (`sm:`, `md:`, `lg:`)

Also read `src/data/mock-customers.ts` to understand the data shapes the component will receive.

---

## Step 2 — TypeScript check

Run the project's type-checker:

```bash
npm run type-check 2>&1
```

Then run the linter:

```bash
npm run lint 2>&1
```

Interpret the output:
- **Pass** — zero errors in the component file
- **Fail** — list each error with file, line number, and error message

Also perform a static review of the component source for:
- Any use of `any` type (implicit or explicit) → flag as ❌
- Props interface exported and correctly named `[ComponentName]Props` → flag absence as ❌
- All imported files exist and the imported symbols are used correctly → flag missing imports as ❌
- No `dangerouslySetInnerHTML` used with dynamic data → flag as ❌ if present

---

## Step 3 — Rendering check

Simulate rendering the component with mock data by reasoning through the code carefully.

Use every distinct customer fixture from `src/data/mock-customers.ts` and trace through the component logic for each:

For each customer, verify:
- **Required fields render**: name, company, healthScore are accessed without crashing on undefined
- **Health score color logic**: confirm score thresholds map to the correct Tailwind color class
  - Score 0–30 → red variant
  - Score 31–70 → yellow variant
  - Score 71–100 → green variant
  - Check boundary values explicitly: 0, 30, 31, 70, 71, 100
- **Domains**: if `domains` is present and non-empty, the domain list renders; if absent or empty, no crash and no empty UI artifact
- **Domain count**: shown only when `domains.length > 1`
- **onClick**: if provided, clicking calls the callback with the correct customer; if omitted, no error

Report any case where the logic would fail or produce incorrect output.

---

## Step 4 — Responsive design check

Inspect the Tailwind classes in the component source for responsive behaviour.

Check for coverage at each required breakpoint:
- **Mobile (320px+)** — base classes (no prefix) must produce a usable layout at narrow widths
- **Tablet (768px+)** — `md:` prefixed classes or layout that naturally adapts
- **Desktop (1024px+)** — `lg:` prefixed classes or layout that naturally adapts

Also verify:
- `max-w-[400px]` or equivalent is present to cap card width
- `min-h-[120px]` or equivalent is present to enforce minimum height
- Text truncation (`truncate`) is used on strings that could overflow (name, company, domain)
- No fixed pixel widths that would break narrow viewports

---

## Step 5 — Spec alignment check

Locate the corresponding spec file at `specs/[component-name]-spec.md` (e.g., `specs/customer-card-spec.md`).

If the spec exists, read it and check each `- [ ]` acceptance criterion against the implementation.

Mark each as ✅ or ❌ with a one-line reason.

If no spec file exists, skip this step and note it in the report.

---

## Step 6 — Report

Output the full verification report in this format:

```
## Verification Report: [ComponentName]
**File:** `$ARGUMENTS`

### 1. TypeScript
| Check                          | Result | Detail |
|-------------------------------|--------|--------|
| type-check passes (no errors) | ✅/❌  | ...    |
| lint passes (no errors)       | ✅/❌  | ...    |
| No `any` types                | ✅/❌  | ...    |
| Props interface exported      | ✅/❌  | ...    |
| All imports resolve           | ✅/❌  | ...    |

### 2. Rendering
| Scenario                          | Result | Detail |
|----------------------------------|--------|--------|
| Renders with high health score   | ✅/❌  | ...    |
| Renders with mid health score    | ✅/❌  | ...    |
| Renders with low health score    | ✅/❌  | ...    |
| Health score boundary values     | ✅/❌  | ...    |
| Renders with multiple domains    | ✅/❌  | ...    |
| Renders with single domain       | ✅/❌  | ...    |
| Renders with no domains          | ✅/❌  | ...    |
| onClick fires with correct data  | ✅/❌  | ...    |
| Renders without onClick prop     | ✅/❌  | ...    |

### 3. Responsive Design
| Breakpoint       | Result | Detail |
|-----------------|--------|--------|
| Mobile (320px+) | ✅/❌  | ...    |
| Tablet (768px+) | ✅/❌  | ...    |
| Desktop (1024px+)| ✅/❌  | ...    |
| max-width cap   | ✅/❌  | ...    |
| min-height      | ✅/❌  | ...    |
| Text overflow   | ✅/❌  | ...    |

### 4. Spec Acceptance Criteria
| Criterion                        | Result | Detail |
|---------------------------------|--------|--------|
| <criterion from spec>           | ✅/❌  | ...    |
| ...                             | ...    | ...    |

---

### Overall Result: PASS / FAIL

**X / Y checks passed.**

### Issues to Fix
- ❌ <check name>: <specific problem and how to fix it>
- ...

*(No issues — all checks passed.)* ← use this if everything passes
```

If there are failures, be specific: include the line number, the failing class or expression, and a concrete suggested fix.
