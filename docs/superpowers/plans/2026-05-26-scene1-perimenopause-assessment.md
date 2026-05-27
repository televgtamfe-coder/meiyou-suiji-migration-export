# Scene1 Perimenopause Assessment Content Restoration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the full assessment-page content and structure from the approved design references inside the existing `scene1` visual shell, without changing the current scene1 visual language.

**Architecture:** Keep the current `scene1` phone shell, entry modal, overlay flow, state model, and route structure. Expand the assessment metadata and step renderer so each page regains its missing structural sections, explanatory blocks, grouped forms, and result-transition content while staying inside the existing shell and footer mechanics. Because this export is not a git repo, use file-level checkpoints under `docs/superpowers/checkpoints/` for rollback after each verified milestone.

**Tech Stack:** React 18, TypeScript, Vite, Vitest, Testing Library, existing `src/styles/base.css`, local HTML design references in `C:\Users\MeetYou\Downloads\stitch_github_style_designer_extracted_full\stitch_github_style_designer`.

---

## File Structure Map

### Existing files to modify

- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\assessmentSteps.ts`
  - Expand step metadata, labels, descriptions, and option sets to match the fuller design content.
- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\AssessmentStepRenderer.tsx`
  - Primary restoration point for step layout, grouped cards, helper banners, KMI groups, and result-transition content.
- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\PerimenopauseEntryModal.tsx`
  - Restore fuller intro copy density while preserving the current scene1 modal look.
- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\PerimenopauseAssessmentShell.tsx`
  - Keep shell behavior but ensure header/body/footer still fit the denser restored layouts.
- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\styles\base.css`
  - Add and adjust styles for restored content structure while preserving shell containment.
- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-assessment-flow.test.tsx`
  - Strengthen coverage for restored step content and completion-state structure.
- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-shell.test.tsx`
  - Extend shell containment checks if needed for denser content.
- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-tabbar.test.tsx`
  - Guard against layout regressions exposing the bottom bar.

### Existing files to inspect during execution

- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\Scene1Page.tsx`
  - Verify integration points still behave correctly; avoid unnecessary changes.
- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\assessmentState.ts`
  - Reuse current flow state unless a new content field requires expansion.

### New files to create

- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\.gitkeep`
  - Anchor directory for rollback snapshots.
- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-step-1\`
  - Snapshot after intro/basic-page restoration passes verification.
- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-step-2\`
  - Snapshot after cycle/special/KMI structure restoration passes verification.
- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-step-3\`
  - Snapshot after completion-state restoration and full verification passes.

### Design references to use

- `C:\Users\MeetYou\Downloads\stitch_github_style_designer_extracted_full\stitch_github_style_designer\_3\code.html`
- `C:\Users\MeetYou\Downloads\stitch_github_style_designer_extracted_full\stitch_github_style_designer\_5\code.html`
- `C:\Users\MeetYou\Downloads\stitch_github_style_designer_extracted_full\stitch_github_style_designer\_2\code.html`
- `C:\Users\MeetYou\Downloads\stitch_github_style_designer_extracted_full\stitch_github_style_designer\_4\code.html`
- `C:\Users\MeetYou\Downloads\stitch_github_style_designer_extracted_full\stitch_github_style_designer\kmi_1\code.html`
- `C:\Users\MeetYou\Downloads\stitch_github_style_designer_extracted_full\stitch_github_style_designer\kmi_2\code.html`
- `C:\Users\MeetYou\Downloads\stitch_github_style_designer_extracted_full\stitch_github_style_designer\_1\code.html`

### Execution note

This export workspace has no `.git` directory. Replace commit steps with file-copy checkpoints. Each checkpoint must copy every touched implementation file plus the primary test file into a timestamped folder under `docs/superpowers/checkpoints/`.

---

### Task 1: Prepare rollback checkpoints and verify current baseline

**Files:**
- Create: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\.gitkeep`
- Inspect: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\AssessmentStepRenderer.tsx`
- Inspect: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\styles\base.css`
- Test: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-assessment-flow.test.tsx`

- [ ] **Step 1: Create the checkpoint root**

```text
C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\.gitkeep
```

- [ ] **Step 2: Run the focused baseline verification**

Run: `npm exec vitest run tests/scene1/scene1-assessment-flow.test.tsx tests/scene1/scene1-shell.test.tsx tests/scene1/scene1-tabbar.test.tsx`

Expected: PASS with the current assessment flow green before restoration work starts.

- [ ] **Step 3: Record the baseline checkpoint**

Run:

```powershell
New-Item -ItemType Directory -Force -Path 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-baseline'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\assessmentSteps.ts' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-baseline\assessmentSteps.ts'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\AssessmentStepRenderer.tsx' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-baseline\AssessmentStepRenderer.tsx'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\PerimenopauseEntryModal.tsx' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-baseline\PerimenopauseEntryModal.tsx'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\PerimenopauseAssessmentShell.tsx' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-baseline\PerimenopauseAssessmentShell.tsx'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\styles\base.css' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-baseline\base.css'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-assessment-flow.test.tsx' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-baseline\scene1-assessment-flow.test.tsx'
```

- [ ] **Step 4: Confirm rollback assets exist**

Run: `Get-ChildItem 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-baseline'`

Expected: shows copied implementation and test files for rollback.

---

### Task 2: Restore the entry modal and step 1/7-2/7 content density

**Files:**
- Modify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\PerimenopauseEntryModal.tsx`
- Modify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\assessmentSteps.ts`
- Modify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\AssessmentStepRenderer.tsx`
- Modify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\styles\base.css`
- Test: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-assessment-flow.test.tsx`

- [ ] **Step 1: Extend the failing test coverage for restored intro/basic sections**

Append assertions that verify:

```tsx
expect(screen.getByText('评估须知')).toBeInTheDocument();
expect(screen.getByText('免责声明')).toBeInTheDocument();
expect(screen.getByText('您的数据受到加密保护')).toBeInTheDocument();
expect(screen.getByText('个人生理特征')).toBeInTheDocument();
expect(screen.getByText(/BMI/i)).toBeInTheDocument();
```

- [ ] **Step 2: Run the focused test to verify the new assertions fail**

Run: `npm exec vitest run tests/scene1/scene1-assessment-flow.test.tsx`

Expected: FAIL because at least one of the restored structural blocks is still missing.

- [ ] **Step 3: Restore the intro modal and steps 1/7-2/7 content**

Implementation requirements:

```text
PerimenopauseEntryModal.tsx
- keep current scene1 modal shell
- add fuller copy blocks for purpose, duration, reference-only note, privacy/disclaimer, encryption

assessmentSteps.ts
- keep existing field keys that already work
- ensure step 1 and 2 titles/subtitles match restored structure

AssessmentStepRenderer.tsx
- step 1: include hero intro, feature cards, notice panel, disclaimer block, encrypted-data hint
- step 2: include grouped “个人生理特征” card, unit hints, and BMI helper block

base.css
- add styles for feature cards, notice items, helper panel, grouped input card, BMI info callout
- do not break phone shell containment
```

- [ ] **Step 4: Re-run the focused test**

Run: `npm exec vitest run tests/scene1/scene1-assessment-flow.test.tsx`

Expected: PASS for the intro/basic-page assertions and existing flow tests.

- [ ] **Step 5: Save checkpoint 1**

Run:

```powershell
New-Item -ItemType Directory -Force -Path 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-step-1'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\assessmentSteps.ts' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-step-1\assessmentSteps.ts'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\AssessmentStepRenderer.tsx' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-step-1\AssessmentStepRenderer.tsx'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\PerimenopauseEntryModal.tsx' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-step-1\PerimenopauseEntryModal.tsx'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\styles\base.css' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-step-1\base.css'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-assessment-flow.test.tsx' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-step-1\scene1-assessment-flow.test.tsx'
```

Expected: checkpoint folder populated for rollback.

---

### Task 3: Restore steps 3/7-5/7 grouped content and helper blocks

**Files:**
- Modify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\assessmentSteps.ts`
- Modify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\AssessmentStepRenderer.tsx`
- Modify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\styles\base.css`
- Test: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-assessment-flow.test.tsx`

- [ ] **Step 1: Add failing assertions for missing cycle/special-case structures**

Append assertions covering:

```tsx
expect(screen.getByText('月经周期识别')).toBeInTheDocument();
expect(screen.getByText('月经周期的识别通常需要结合年龄、月经变化和症状综合判断。')).toBeInTheDocument();
expect(screen.getByText('卵巢早衰')).toBeInTheDocument();
expect(screen.getByText('手术史')).toBeInTheDocument();
expect(screen.getByText('激素避孕')).toBeInTheDocument();
expect(screen.getByText('激素替代治疗')).toBeInTheDocument();
```

- [ ] **Step 2: Run the focused test to verify failure**

Run: `npm exec vitest run tests/scene1/scene1-assessment-flow.test.tsx`

Expected: FAIL because the old simplified structure does not render all grouped sections.

- [ ] **Step 3: Restore steps 3/7-5/7**

Implementation requirements:

```text
assessmentSteps.ts
- preserve current working answer keys
- expand step text/options without renaming already-used fields unless tests and state are updated together

AssessmentStepRenderer.tsx
- step 3: title, support panel, explanatory banner, four numbered question groups, date + quick chips
- step 4: restore title, subtitle, two grouped question cards, each with helper meaning
- step 5: restore four dedicated grouped cards plus the bottom explanatory banner

base.css
- add grouped card header styling, banners, support panels, numbered questions, chip row, split stacks
```

- [ ] **Step 4: Re-run the focused test**

Run: `npm exec vitest run tests/scene1/scene1-assessment-flow.test.tsx`

Expected: PASS with the restored middle-step assertions green.

- [ ] **Step 5: Save checkpoint 2**

Run:

```powershell
New-Item -ItemType Directory -Force -Path 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-step-2'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\assessmentSteps.ts' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-step-2\assessmentSteps.ts'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\AssessmentStepRenderer.tsx' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-step-2\AssessmentStepRenderer.tsx'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\styles\base.css' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-step-2\base.css'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-assessment-flow.test.tsx' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-step-2\scene1-assessment-flow.test.tsx'
```

Expected: checkpoint folder populated for rollback.

---

### Task 4: Restore KMI step structure and result-transition completion page

**Files:**
- Modify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\AssessmentStepRenderer.tsx`
- Modify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\PerimenopauseAssessmentShell.tsx`
- Modify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\styles\base.css`
- Test: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-assessment-flow.test.tsx`

- [ ] **Step 1: Add failing assertions for restored KMI and completion structures**

Append assertions covering:

```tsx
expect(screen.getByText('KMI 问卷第一部分')).toBeInTheDocument();
expect(screen.getByText('您的身体正在经历变化')).toBeInTheDocument();
expect(screen.getByText('身体症状')).toBeInTheDocument();
expect(screen.getByText('神经与感受')).toBeInTheDocument();
expect(screen.getByText('生活质量')).toBeInTheDocument();
expect(screen.getByText('核心结论')).toBeInTheDocument();
expect(screen.getByText('接下来的行动指南')).toBeInTheDocument();
```

- [ ] **Step 2: Run the focused test to verify failure**

Run: `npm exec vitest run tests/scene1/scene1-assessment-flow.test.tsx`

Expected: FAIL because the KMI pages and completion state are still structurally simplified.

- [ ] **Step 3: Restore KMI pages and completion state**

Implementation requirements:

```text
AssessmentStepRenderer.tsx
- step 6: render six symptom cards with unified severity choices and a bottom guidance block
- step 7: render grouped sections for body symptoms, nerve/sensation, life quality, and a side-card translated to mobile stack
- completed state: replace simple success message with result-transition layout derived from `_1`, including conclusion section, KMI summary area, symptom interpretation, actions, and two bottom actions

PerimenopauseAssessmentShell.tsx
- preserve the current compact arrow header and footer mechanics
- ensure completion state still uses the same footer actions or explicitly swaps to the result-page actions if implemented inside renderer

base.css
- add KMI grouped layouts, result summary card, action list cards, and completion-state spacing
```

- [ ] **Step 4: Re-run the focused test**

Run: `npm exec vitest run tests/scene1/scene1-assessment-flow.test.tsx`

Expected: PASS with restored KMI and completion content.

- [ ] **Step 5: Save checkpoint 3**

Run:

```powershell
New-Item -ItemType Directory -Force -Path 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-step-3'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\AssessmentStepRenderer.tsx' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-step-3\AssessmentStepRenderer.tsx'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\PerimenopauseAssessmentShell.tsx' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-step-3\PerimenopauseAssessmentShell.tsx'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\styles\base.css' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-step-3\base.css'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-assessment-flow.test.tsx' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-step-3\scene1-assessment-flow.test.tsx'
```

Expected: checkpoint folder populated for rollback.

---

### Task 5: Run full regression verification and document rollback usage

**Files:**
- Verify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\styles\base.css`
- Verify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-assessment-flow.test.tsx`
- Verify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-shell.test.tsx`
- Verify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-tabbar.test.tsx`

- [ ] **Step 1: Run the full test suite**

Run: `npm test`

Expected: PASS with all scene1, scene2, scene3, record, and smoke tests green.

- [ ] **Step 2: Run production build verification**

Run: `npm run build`

Expected: PASS with a fresh `dist/` bundle.

- [ ] **Step 3: Run standalone export verification**

Run: `node scripts/build-standalone.js`

Expected: PASS with files copied from `dist` to `docs`.

- [ ] **Step 4: Verify checkpoint folders for rollback**

Run: `Get-ChildItem 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints'`

Expected: baseline, step-1, step-2, and step-3 checkpoint directories are present.

- [ ] **Step 5: Document rollback procedure in the handoff**

Rollback command pattern:

```powershell
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-26-scene1-assessment-step-2\AssessmentStepRenderer.tsx' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\AssessmentStepRenderer.tsx' -Force
```

Expected: specific file can be restored from any checkpoint without git.

---

## Self-Review

### Spec coverage

- Preserve current scene1 visual style: Tasks 2-4 explicitly restore structure without changing outer shell
- Restore fuller entry copy: Task 2
- Restore steps 1/7 to 5/7 grouped content: Tasks 2-3
- Restore KMI step structure: Task 4
- Replace simple completion state with result-transition layout: Task 4
- Keep phone shell containment and top/bottom bar integrity: Tasks 2-5
- Add rollback checkpoints because there is no git repo: Tasks 1-5

No spec gaps found.

### Placeholder scan

- No `TODO` / `TBD` placeholders remain.
- Each task contains exact files, commands, expected outcomes, and concrete structural targets.

### Type consistency

- Existing types and field keys are preserved unless intentionally expanded in `assessmentSteps.ts`
- Primary renderer remains `AssessmentStepRenderer`
- Primary shell remains `PerimenopauseAssessmentShell`
- Checkpoint path naming stays consistent across all tasks

No naming inconsistencies found.
