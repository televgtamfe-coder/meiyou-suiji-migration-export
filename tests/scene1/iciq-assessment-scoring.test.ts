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

  it('uses strict trigger combinations when classifying leakage type', () => {
    expect(
      getIciqAssessmentResultSummary(
        createIciqAssessmentAnswers({
          iciqLeakFrequency: '2',
          iciqLeakAmount: '2',
          iciqImpact: '2',
          iciqLeakTriggers: ['cough'],
        }),
      ).leakageType,
    ).toBe('stress');
    expect(
      getIciqAssessmentResultSummary(
        createIciqAssessmentAnswers({
          iciqLeakFrequency: '2',
          iciqLeakAmount: '2',
          iciqImpact: '2',
          iciqLeakTriggers: ['exercise'],
        }),
      ).leakageType,
    ).toBe('stress');
    expect(
      getIciqAssessmentResultSummary(
        createIciqAssessmentAnswers({
          iciqLeakFrequency: '2',
          iciqLeakAmount: '2',
          iciqImpact: '2',
          iciqLeakTriggers: ['toilet'],
        }),
      ).leakageType,
    ).toBe('urge');
    expect(
      getIciqAssessmentResultSummary(
        createIciqAssessmentAnswers({
          iciqLeakFrequency: '2',
          iciqLeakAmount: '2',
          iciqImpact: '2',
          iciqLeakTriggers: ['toilet', 'cough'],
        }),
      ).leakageType,
    ).toBe('mixed');
    expect(
      getIciqAssessmentResultSummary(
        createIciqAssessmentAnswers({
          iciqLeakFrequency: '2',
          iciqLeakAmount: '2',
          iciqImpact: '2',
          iciqLeakTriggers: ['cough', 'sleep'],
        }),
      ).leakageType,
    ).toBe('other');
    expect(
      getIciqAssessmentResultSummary(
        createIciqAssessmentAnswers({
          iciqLeakFrequency: '2',
          iciqLeakAmount: '2',
          iciqImpact: '2',
          iciqLeakTriggers: ['toilet', 'no-reason'],
        }),
      ),
    ).toMatchObject({
      leakageType: 'other',
      urgentFlags: ['无明显原因就漏尿'],
    });
  });

  it('returns retest feedback when a previous score exists', () => {
    const summary = getIciqAssessmentResultSummary(
      createIciqAssessmentAnswers({
        iciqLeakFrequency: '1',
        iciqLeakAmount: '2',
        iciqImpact: '1',
        iciqLeakTriggers: ['cough'],
      }),
      createIciqAssessmentAnswers({
        iciqLeakFrequency: '4',
        iciqLeakAmount: '4',
        iciqImpact: '4',
        iciqLeakTriggers: ['cough'],
      }),
    );

    expect(summary.retestFeedback).toMatchObject({
      label: '较明显改善',
      delta: -8,
    });
  });
});
