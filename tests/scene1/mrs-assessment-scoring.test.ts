import { describe, expect, it } from 'vitest';
import {
  createMrsAssessmentAnswers,
  getMrsAssessmentResultSummary,
} from '../../src/scenes/scene1/mrs-assessment/mrsAssessmentScoring';

describe('mrs assessment scoring', () => {
  it('returns the minimal result when every item is zero', () => {
    const summary = getMrsAssessmentResultSummary(createMrsAssessmentAnswers());

    expect(summary.score).toBe(0);
    expect(summary.level).toBe('minimal');
    expect(summary.somaticScore).toBe(0);
    expect(summary.psychologicalScore).toBe(0);
    expect(summary.urogenitalScore).toBe(0);
    expect(summary.severeDimensions).toEqual([]);
  });

  it('marks severe impact and exposes all three heavy-hit dimensions when the cutoffs are reached', () => {
    const summary = getMrsAssessmentResultSummary(
      createMrsAssessmentAnswers({
        mrsHotFlashes: '3',
        mrsHeartDiscomfort: '1',
        mrsSleepProblem: '2',
        mrsDepressiveMood: '1',
        mrsIrritability: '1',
        mrsAnxiety: '1',
        mrsExhaustion: '1',
        mrsSexualProblems: '1',
        mrsBladderProblems: '1',
        mrsVaginalDryness: '0',
        mrsJointPain: '2',
      }),
    );

    expect(summary.score).toBe(14);
    expect(summary.level).toBe('severe');
    expect(summary.somaticScore).toBe(8);
    expect(summary.psychologicalScore).toBe(4);
    expect(summary.urogenitalScore).toBe(2);
    expect(summary.severeDimensions).toEqual(['somatic', 'psychological', 'urogenital']);
  });
});
