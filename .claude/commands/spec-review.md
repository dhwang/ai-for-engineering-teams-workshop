Review the spec file at: $ARGUMENTS

Validate it against the project spec template at `templates/spec-template.md`.

## Instructions

1. **Read both files**: the spec at the provided path and the template at `templates/spec-template.md`.

2. **Check for required top-level sections** and grade each as ✅ Present, ⚠️ Incomplete, or ❌ Missing:
   - `Context` — must explain purpose, system fit, and intended users
   - `Requirements` — must include functional, UI, data, and integration requirements
   - `Constraints` — must include tech stack, performance, design, file/naming, and security
   - `Acceptance Criteria` — must have testable, checkboxed criteria covering happy path, edge cases, UX, and integration

3. **For each section present**, check for completeness:
   - Context: Does it describe purpose, how it fits the system, and who uses it?
   - Requirements: Are all four sub-sections covered (Functional, UI, Data, Integration)?
   - Constraints: Are all five sub-sections covered (Tech stack, Performance, Design, File structure, Security)?
   - Acceptance Criteria: Are criteria written as checkboxes `- [ ]`? Do they cover edge cases and integration points?

4. **Identify specific gaps** with actionable suggestions, e.g.:
   - "Requirements is missing an Integration Requirements sub-section — add how this component is used by its parent"
   - "Acceptance Criteria has no edge case checks — add criteria for empty/null data states"

5. **Return a structured summary**:

```
## Spec Review: <filename>

### Section Checklist
| Section              | Status        | Notes |
|----------------------|---------------|-------|
| Context              | ✅ / ⚠️ / ❌  | ...   |
| Requirements         | ✅ / ⚠️ / ❌  | ...   |
| Constraints          | ✅ / ⚠️ / ❌  | ...   |
| Acceptance Criteria  | ✅ / ⚠️ / ❌  | ...   |

### Overall Score: X / 4 sections complete

### Actionable Feedback
- <specific gap and how to fix it>
- ...

### Summary
<1–2 sentence verdict on spec readiness>
```
