import { describe, expect, it } from 'vitest';
import { getBoneHealthDecision, getExerciseDecision } from '../../src/scenes/scene1/resultDecision';
import type { AssessmentAnswers } from '../../src/scenes/scene1/assessmentState';
import type { KmiScoreDetail } from '../../src/scenes/scene1/kmiScoring';

function createAnswers(overrides: Partial<AssessmentAnswers> = {}): AssessmentAnswers {
  return {
    age: '42',
    heightCm: '165',
    weightKg: '58',
    periodPresence: 'yes',
    cycleChange: 'same',
    volumeChange: 'same',
    lastPeriodDate: '',
    lastPeriodQuickOption: 'forgot',
    ovarianFailure: 'no',
    surgeryHistory: 'none',
    hormonalContraception: 'no',
    hormoneReplacementTherapy: 'no',
    kmiHotFlashes: '0',
    kmiParesthesia: '0',
    kmiInsomnia: '0',
    kmiNervousness: '0',
    kmiMelancholia: '0',
    kmiVertigo: '0',
    kmiFatigue: '0',
    kmiJointPain: '0',
    kmiHeadache: '0',
    kmiPalpitations: '0',
    kmiFormication: '0',
    kmiSexualImpact: '0',
    kmiUrinarySymptoms: '0',
    ...overrides,
  };
}

function createDetails(overrides: Partial<Record<KmiScoreDetail['field'], number>> = {}): KmiScoreDetail[] {
  const defaults: Record<KmiScoreDetail['field'], number> = {
    kmiHotFlashes: 0,
    kmiParesthesia: 0,
    kmiInsomnia: 0,
    kmiNervousness: 0,
    kmiMelancholia: 0,
    kmiVertigo: 0,
    kmiFatigue: 0,
    kmiJointPain: 0,
    kmiHeadache: 0,
    kmiPalpitations: 0,
    kmiFormication: 0,
    kmiSexualImpact: 0,
    kmiUrinarySymptoms: 0,
  };

  return Object.entries({ ...defaults, ...overrides }).map(([field, severity]) => ({
    field: field as KmiScoreDetail['field'],
    label: field,
    severity,
    weight: 1,
    score: severity,
  }));
}

describe('result decision helpers', () => {
  it('raises bone health risk when ovarian failure or ovary surgery is present', () => {
    const answers = createAnswers({
      weightKg: '44',
      ovarianFailure: 'yes',
      surgeryHistory: 'ovary',
      hormoneReplacementTherapy: 'no',
    });
    const details = createDetails({
      kmiJointPain: 2,
      kmiFatigue: 2,
    });

    const result = getBoneHealthDecision(answers, details);

    expect(result.label).toContain('高风险');
    expect(result.summary).toContain('风险偏高');
  });

  it('keeps exercise screening at green light when no risk clues are present', () => {
    const answers = createAnswers();
    const details = createDetails();

    const result = getExerciseDecision(answers, details);

    expect(result.label).toBe('绿灯：可循序渐进运动');
  });

  it('switches exercise screening to red light when palpitations or vertigo are moderate', () => {
    const answers = createAnswers();
    const details = createDetails({
      kmiPalpitations: 2,
      kmiVertigo: 2,
    });

    const result = getExerciseDecision(answers, details);

    expect(result.label).toBe('红灯：建议先医学评估');
  });
});
