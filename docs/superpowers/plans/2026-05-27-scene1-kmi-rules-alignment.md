# Scene1 KMI Rules Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align the `scene1` perimenopause assessment KMI section with the rule definitions in `C:\Users\MeetYou\Desktop\围绝经期.md`, including symptom copy, severity semantics, weighted scoring, score bands, and result rendering.

**Architecture:** Keep the existing `scene1` shell, step flow, and current 6-step assessment structure. Introduce a dedicated KMI rules module as the single source of truth for symptom metadata, severity descriptions, weights, and score interpretation; then wire the assessment steps, renderer, and result page to that module so the UI and calculation logic stay consistent.

**Tech Stack:** React 18, TypeScript, Vite, Vitest, Testing Library, existing `scene1` assessment components and state.

---

## File Structure Map

### Existing files to modify

- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\assessmentSteps.ts`
  - Replace generic KMI severity options with symptom-specific definitions sourced from the rules module.
- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\AssessmentStepRenderer.tsx`
  - Render the exact KMI symptom labels, descriptions, options, and calculated result output.
- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\assessmentState.ts`
  - Reuse current answer keys but expose helpers if the scoring module needs typed KMI answer extraction.
- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\styles\base.css`
  - Add minimal styles for denser KMI option descriptions and result breakdown blocks.
- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-assessment-flow.test.tsx`
  - Cover UI text, KMI option semantics, and result output.

### New files to create

- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\kmiRules.ts`
  - Single source of truth for 13 KMI symptoms, labels, option descriptions, and weights.
- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\kmiScoring.ts`
  - Pure functions for weighted KMI score calculation and score-band interpretation.
- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-kmi-rules.test.ts`
  - Verifies that all 13 symptoms, weights, and option semantics match the MD source.
- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-kmi-scoring.test.ts`
  - Verifies weighted scoring and band thresholds.

### Existing files to inspect during execution

- `C:\Users\MeetYou\Desktop\围绝经期.md`
  - Source-of-truth rule document for symptom names, severity descriptions, weights, and thresholds.
- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\PerimenopauseAssessmentShell.tsx`
  - Confirm completion-state footer still behaves correctly after result content becomes dynamic.

### Rollback checkpoints to create

- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-27-scene1-kmi-rules-baseline\`
- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-27-scene1-kmi-rules-step-1\`
- `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-27-scene1-kmi-rules-step-2\`

---

### Task 1: Freeze the current KMI baseline and encode the gap as tests

**Files:**
- Create: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-kmi-rules.test.ts`
- Create: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-kmi-scoring.test.ts`
- Test: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-assessment-flow.test.tsx`

- [ ] **Step 1: Create the rollback baseline checkpoint**

Run:

```powershell
New-Item -ItemType Directory -Force -Path 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-27-scene1-kmi-rules-baseline'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\assessmentSteps.ts' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-27-scene1-kmi-rules-baseline\assessmentSteps.ts'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\assessmentState.ts' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-27-scene1-kmi-rules-baseline\assessmentState.ts'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\AssessmentStepRenderer.tsx' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-27-scene1-kmi-rules-baseline\AssessmentStepRenderer.tsx'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\styles\base.css' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-27-scene1-kmi-rules-baseline\base.css'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-assessment-flow.test.tsx' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-27-scene1-kmi-rules-baseline\scene1-assessment-flow.test.tsx'
```

- [ ] **Step 2: Write the failing KMI rules completeness test**

Create `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-kmi-rules.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { assessmentSteps } from '../../src/scenes/scene1/assessmentSteps';

describe('scene1 KMI rules completeness', () => {
  it('contains all 13 KMI symptom fields across the two KMI steps', () => {
    const kmiFields = assessmentSteps
      .filter((step) => step.title.includes('KMI'))
      .flatMap((step) => step.requiredFields);

    expect(kmiFields).toEqual([
      'kmiHotFlashes',
      'kmiParesthesia',
      'kmiInsomnia',
      'kmiNervousness',
      'kmiMelancholia',
      'kmiVertigo',
      'kmiFatigue',
      'kmiJointPain',
      'kmiHeadache',
      'kmiPalpitations',
      'kmiFormication',
      'kmiSexualImpact',
      'kmiUrinarySymptoms',
    ]);
  });
});
```

- [ ] **Step 3: Write the failing weighted-scoring test**

Create `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-kmi-scoring.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { calculateKmiScore, interpretKmiScore } from '../../src/scenes/scene1/kmiScoring';

describe('scene1 KMI weighted scoring', () => {
  it('uses weighted KMI scoring with a 63-point maximum', () => {
    const score = calculateKmiScore({
      kmiHotFlashes: '3',
      kmiParesthesia: '3',
      kmiInsomnia: '3',
      kmiNervousness: '3',
      kmiMelancholia: '3',
      kmiVertigo: '3',
      kmiFatigue: '3',
      kmiJointPain: '3',
      kmiHeadache: '3',
      kmiPalpitations: '3',
      kmiFormication: '3',
      kmiSexualImpact: '3',
      kmiUrinarySymptoms: '3',
    });

    expect(score.total).toBe(63);
  });

  it('maps weighted totals to the expected severity bands', () => {
    expect(interpretKmiScore(6).band).toBe('normal');
    expect(interpretKmiScore(7).band).toBe('mild');
    expect(interpretKmiScore(16).band).toBe('moderate');
    expect(interpretKmiScore(31).band).toBe('severe');
  });
});
```

- [ ] **Step 4: Run the tests to verify the scoring test fails**

Run: `npm exec vitest run tests/scene1/scene1-kmi-rules.test.ts tests/scene1/scene1-kmi-scoring.test.ts`

Expected: `scene1-kmi-rules.test.ts` may pass, but `scene1-kmi-scoring.test.ts` must fail because `kmiScoring.ts` does not exist yet.

- [ ] **Step 5: Commit the test-only checkpoint**

Run:

```powershell
New-Item -ItemType Directory -Force -Path 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-27-scene1-kmi-rules-step-1'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-kmi-rules.test.ts' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-27-scene1-kmi-rules-step-1\scene1-kmi-rules.test.ts'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-kmi-scoring.test.ts' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-27-scene1-kmi-rules-step-1\scene1-kmi-scoring.test.ts'
```

Expected: both new test files are available for rollback.

---

### Task 2: Create the source-of-truth KMI rules and scoring modules

**Files:**
- Create: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\kmiRules.ts`
- Create: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\kmiScoring.ts`
- Test: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-kmi-scoring.test.ts`

- [ ] **Step 1: Write the KMI rules module**

Create `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\kmiRules.ts`:

```ts
export const kmiFieldOrder = [
  'kmiHotFlashes',
  'kmiParesthesia',
  'kmiInsomnia',
  'kmiNervousness',
  'kmiMelancholia',
  'kmiVertigo',
  'kmiFatigue',
  'kmiJointPain',
  'kmiHeadache',
  'kmiPalpitations',
  'kmiFormication',
  'kmiSexualImpact',
  'kmiUrinarySymptoms',
] as const;

export type KmiFieldKey = (typeof kmiFieldOrder)[number];

export type KmiRule = {
  field: KmiFieldKey;
  label: string;
  weight: number;
  options: Array<{
    value: '0' | '1' | '2' | '3';
    label: string;
    description: string;
  }>;
};

export const kmiRules: KmiRule[] = [
  {
    field: 'kmiHotFlashes',
    label: '潮热出汗',
    weight: 4,
    options: [
      { value: '0', label: '无', description: '无症状' },
      { value: '1', label: '轻度', description: '<3次/日' },
      { value: '2', label: '中度', description: '3-9次/日' },
      { value: '3', label: '重度', description: '>=10次/日' },
    ],
  },
  {
    field: 'kmiParesthesia',
    label: '感觉异常',
    weight: 2,
    options: [
      { value: '0', label: '无', description: '无症状' },
      { value: '1', label: '轻度', description: '偶尔出现' },
      { value: '2', label: '中度', description: '经常出现，有不适感' },
      { value: '3', label: '重度', description: '持续存在且影响生活' },
    ],
  },
];
```

Note: continue the file with the remaining 11 rules using the exact wording from `C:\Users\MeetYou\Desktop\围绝经期.md`.

- [ ] **Step 2: Write the scoring module**

Create `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\kmiScoring.ts`:

```ts
import { kmiFieldOrder, kmiRules, type KmiFieldKey } from './kmiRules';

export type KmiAnswerMap = Partial<Record<KmiFieldKey, string>>;

export function calculateKmiScore(answers: KmiAnswerMap) {
  const details = kmiRules.map((rule) => {
    const severity = Number(answers[rule.field] ?? '0');
    return {
      field: rule.field,
      label: rule.label,
      severity,
      weight: rule.weight,
      score: severity * rule.weight,
    };
  });

  return {
    total: details.reduce((sum, item) => sum + item.score, 0),
    max: 63,
    details,
  };
}

export function interpretKmiScore(total: number) {
  if (total <= 6) return { band: 'normal', label: '正常' };
  if (total <= 15) return { band: 'mild', label: '轻度综合征' };
  if (total <= 30) return { band: 'moderate', label: '中度综合征' };
  return { band: 'severe', label: '重度综合征' };
}

export function pickCompletedKmiAnswers<T extends Record<string, string>>(answers: T): KmiAnswerMap {
  return Object.fromEntries(kmiFieldOrder.map((field) => [field, answers[field] ?? '0'])) as KmiAnswerMap;
}
```

- [ ] **Step 3: Run the scoring tests**

Run: `npm exec vitest run tests/scene1/scene1-kmi-scoring.test.ts`

Expected: PASS.

- [ ] **Step 4: Run the rules completeness test**

Run: `npm exec vitest run tests/scene1/scene1-kmi-rules.test.ts`

Expected: PASS.

- [ ] **Step 5: Save checkpoint 2**

Run:

```powershell
New-Item -ItemType Directory -Force -Path 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-27-scene1-kmi-rules-step-2'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\kmiRules.ts' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-27-scene1-kmi-rules-step-2\kmiRules.ts'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\kmiScoring.ts' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-27-scene1-kmi-rules-step-2\kmiScoring.ts'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-kmi-rules.test.ts' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-27-scene1-kmi-rules-step-2\scene1-kmi-rules.test.ts'
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-kmi-scoring.test.ts' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-27-scene1-kmi-rules-step-2\scene1-kmi-scoring.test.ts'
```

Expected: new source-of-truth files and tests are checkpointed.

---

### Task 3: Replace simplified KMI options with MD-aligned symptom semantics

**Files:**
- Modify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\assessmentSteps.ts`
- Modify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\AssessmentStepRenderer.tsx`
- Modify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\styles\base.css`
- Test: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-assessment-flow.test.tsx`

- [ ] **Step 1: Extend the flow test with the exact KMI option semantics**

Append assertions to `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-assessment-flow.test.tsx`:

```tsx
expect(screen.getByText('<3次/日')).toBeInTheDocument();
expect(screen.getByText('3-9次/日')).toBeInTheDocument();
expect(screen.getByText('偶尔出现')).toBeInTheDocument();
expect(screen.getByText('持续存在且影响生活')).toBeInTheDocument();
expect(screen.getByText('长期失眠且影响白天功能或需要服用安眠药')).toBeInTheDocument();
```

- [ ] **Step 2: Run the flow test to verify it fails**

Run: `npm exec vitest run tests/scene1/scene1-assessment-flow.test.tsx`

Expected: FAIL because current KMI options still render generic labels.

- [ ] **Step 3: Minimal implementation in `assessmentSteps.ts`**

Replace the KMI option definitions so they come from `kmiRules.ts`:

```ts
import { kmiRules } from './kmiRules';

const kmiOptionMap = Object.fromEntries(
  kmiRules.map((rule) => [rule.field, rule.options])
);
```

Then use `kmiOptionMap` for all KMI-related `options` entries instead of `severityOptions`.

- [ ] **Step 4: Minimal implementation in `AssessmentStepRenderer.tsx`**

Update `ChoiceRow` so descriptions render under each option label:

```tsx
{options.map((option) => (
  <button
    key={option.value}
    type="button"
    className={value === option.value ? 'scene1-assessment-choice active' : 'scene1-assessment-choice'}
    onClick={() => onSelect(option.value)}
  >
    <span className="scene1-assessment-choice-label">{option.label}</span>
    {option.description ? (
      <span className="scene1-assessment-choice-description">{option.description}</span>
    ) : null}
  </button>
))}
```

- [ ] **Step 5: Minimal implementation in `base.css`**

Add:

```css
.scene1-assessment-choice {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.scene1-assessment-choice-label {
  font-weight: 600;
}

.scene1-assessment-choice-description {
  font-size: 12px;
  line-height: 1.4;
  color: rgba(64, 46, 50, 0.78);
}
```

- [ ] **Step 6: Re-run the flow test**

Run: `npm exec vitest run tests/scene1/scene1-assessment-flow.test.tsx`

Expected: PASS with the new option descriptions visible.

---

### Task 4: Compute and render the real KMI result

**Files:**
- Modify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\AssessmentStepRenderer.tsx`
- Modify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\assessmentState.ts`
- Test: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-assessment-flow.test.tsx`
- Test: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\tests\scene1\scene1-kmi-scoring.test.ts`

- [ ] **Step 1: Add a failing flow assertion for a real weighted result**

Append to the completion test:

```tsx
expect(screen.getByText('KMI 指数评估')).toBeInTheDocument();
expect(screen.getByText('13 / 63')).toBeInTheDocument();
expect(screen.getByText('轻度综合征')).toBeInTheDocument();
```

Use the specific answer combination already selected in the test so the expected weighted score is deterministic.

- [ ] **Step 2: Run the flow test to verify it fails**

Run: `npm exec vitest run tests/scene1/scene1-assessment-flow.test.tsx`

Expected: FAIL because the result page still shows the hard-coded `28 / 63`.

- [ ] **Step 3: Compute score from current answers**

Update `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\AssessmentStepRenderer.tsx`:

```tsx
import { calculateKmiScore, interpretKmiScore, pickCompletedKmiAnswers } from '../kmiScoring';
```

Then change completion rendering to:

```tsx
function CompletionState({ answers }: { answers: Scene1AssessmentState['answers'] }) {
  const score = calculateKmiScore(pickCompletedKmiAnswers(answers));
  const interpretation = interpretKmiScore(score.total);

  return (
    <div className="scene1-assessment-result-page">
      <section className="scene1-assessment-result-hero">
        <p className="scene1-assessment-kicker">评估已完成</p>
        <span className="scene1-assessment-result-badge">核心结论</span>
        <h2>{interpretation.label}</h2>
      </section>
      <section className="scene1-assessment-result-grid">
        <div className="scene1-assessment-result-score">
          <div className="scene1-assessment-result-score-header">
            <h3>KMI 指数评估</h3>
            <span>{`${score.total} / ${score.max}`}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
```

And pass `state.answers` into it.

- [ ] **Step 4: Add a minimal symptom breakdown**

Under the score summary, render the highest-scoring symptoms:

```tsx
{score.details
  .filter((item) => item.score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, 3)
  .map((item) => (
    <div key={item.field} className="scene1-assessment-result-detail-item">
      <strong>{item.label}</strong>
      <p>{`严重度 ${item.severity}，权重 ${item.weight}，得分 ${item.score}`}</p>
    </div>
  ))}
```

- [ ] **Step 5: Re-run the tests**

Run: `npm exec vitest run tests/scene1/scene1-kmi-scoring.test.ts tests/scene1/scene1-assessment-flow.test.tsx`

Expected: PASS.

---

### Task 5: Full verification and rollback handoff

**Files:**
- Verify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\kmiRules.ts`
- Verify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\kmiScoring.ts`
- Verify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\assessmentSteps.ts`
- Verify: `C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\components\AssessmentStepRenderer.tsx`

- [ ] **Step 1: Run the KMI-focused suite**

Run: `npm exec vitest run tests/scene1/scene1-kmi-rules.test.ts tests/scene1/scene1-kmi-scoring.test.ts tests/scene1/scene1-assessment-flow.test.tsx`

Expected: PASS.

- [ ] **Step 2: Run full regression**

Run: `npm test`

Expected: PASS.

- [ ] **Step 3: Run production build**

Run: `npm run build`

Expected: PASS.

- [ ] **Step 4: Record final rollback snapshot**

Run:

```powershell
Get-ChildItem 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints'
```

Expected: shows the KMI baseline and step checkpoints.

- [ ] **Step 5: Document rollback usage**

Rollback pattern:

```powershell
Copy-Item 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\docs\superpowers\checkpoints\2026-05-27-scene1-kmi-rules-baseline\assessmentSteps.ts' 'C:\Users\MeetYou\Desktop\meiyou-suiji-migration-export\src\scenes\scene1\assessmentSteps.ts' -Force
```

Expected: any touched file can be restored without git.

---

## Self-Review

### Spec coverage

- 13 KMI symptoms checked against the MD source: Tasks 1-3
- Weight rules and 63-point maximum: Tasks 1-2
- Score bands and result classification: Task 2 and Task 4
- UI alignment for severity semantics: Task 3
- Dynamic result output instead of hard-coded score: Task 4
- Rollback safety in a non-git export: Tasks 1, 2, and 5

No gaps found for the KMI-only optimization scope.

### Placeholder scan

- No `TODO` or `TBD` placeholders remain.
- Code-bearing tasks include concrete file paths, code snippets, commands, and expected outcomes.

### Type consistency

- `kmiRules.ts` owns `KmiFieldKey`.
- `kmiScoring.ts` consumes `KmiFieldKey` and exports `calculateKmiScore`, `interpretKmiScore`, and `pickCompletedKmiAnswers`.
- `assessmentSteps.ts` imports KMI options from `kmiRules.ts`.
- `AssessmentStepRenderer.tsx` imports scoring helpers from `kmiScoring.ts`.

No naming mismatches found.
