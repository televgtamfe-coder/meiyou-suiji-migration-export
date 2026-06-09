import { describe, expect, it } from 'vitest';
import {
  createIciqAssessmentAnswers,
  getIciqAssessmentResultSummary,
} from '../../src/scenes/scene1/iciq-assessment/iciqAssessmentScoring';

describe('iciq assessment scoring', () => {
  it('returns the none result when the user reports no leakage', () => {
    const summary = getIciqAssessmentResultSummary(createIciqAssessmentAnswers());

    expect(summary.score).toBe(0);
    expect(summary.level).toBe('none');
    expect(summary.leakageType).toBe('none');
  });

  it('returns a severe mixed-leakage result when both stress and urge triggers are selected', () => {
    const summary = getIciqAssessmentResultSummary(
      createIciqAssessmentAnswers({
        iciqLeakFrequency: '4',
        iciqLeakAmount: '4',
        iciqImpact: '8',
        iciqLeakTriggers: ['toilet', 'cough', 'exercise'],
      }),
    );

    expect(summary.score).toBe(16);
    expect(summary.level).toBe('severe');
    expect(summary.leakageType).toBe('mixed');
    expect(summary.typeInsight.length).toBeGreaterThan(0);
  });
});
