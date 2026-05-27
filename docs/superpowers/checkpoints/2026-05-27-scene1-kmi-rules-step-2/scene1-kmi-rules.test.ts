import { describe, expect, it } from 'vitest';
import { getAssessmentStep } from '../../src/scenes/scene1/assessmentSteps';

describe('scene1 KMI rules alignment', () => {
  it('keeps the two KMI steps aligned to the 13 required fields in order', () => {
    const kmiFields = [getAssessmentStep(5), getAssessmentStep(6)].flatMap(
      (step) => step.requiredFields
    );

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
