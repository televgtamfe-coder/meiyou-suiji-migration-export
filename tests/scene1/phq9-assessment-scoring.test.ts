import { describe, expect, it } from 'vitest';
import {
  createPhq9AssessmentAnswers,
  getPhq9AssessmentResultSummary,
} from '../../src/scenes/scene1/phq9-assessment/phq9AssessmentScoring';
import {
  createPhq9AssessmentState,
  isPhq9AssessmentStepComplete,
} from '../../src/scenes/scene1/phq9-assessment/phq9AssessmentState';

describe('phq9 assessment scoring', () => {
  it('starts with an incomplete first step before the user answers the first three questions', () => {
    const state = createPhq9AssessmentState();

    expect(isPhq9AssessmentStepComplete(state)).toBe(false);
  });

  it('returns the minimal band for scores in the 0-4 range', () => {
    const summary = getPhq9AssessmentResultSummary(
      createPhq9AssessmentAnswers({
        phq9LittleInterest: '1',
        phq9LowMood: '1',
        phq9SleepProblem: '1',
        phq9Fatigue: '1',
      }),
    );

    expect(summary.score).toBe(4);
    expect(summary.level).toBe('minimal');
    expect(summary.levelLabel).toBe('无/极少抑郁');
    expect(summary.needsReferral).toBe(false);
    expect(summary.summary).toContain('无或仅有极轻度抑郁症状');
  });

  it('returns the mild band for scores in the 5-9 range', () => {
    const summary = getPhq9AssessmentResultSummary(
      createPhq9AssessmentAnswers({
        phq9LittleInterest: '2',
        phq9LowMood: '2',
        phq9SleepProblem: '1',
      }),
    );

    expect(summary.score).toBe(5);
    expect(summary.level).toBe('mild');
    expect(summary.levelLabel).toBe('轻度抑郁');
    expect(summary.needsReferral).toBe(false);
    expect(summary.summary).toContain('轻度抑郁症状');
  });

  it('returns the moderate band and referral flag for scores in the 10-14 range', () => {
    const summary = getPhq9AssessmentResultSummary(
      createPhq9AssessmentAnswers({
        phq9LittleInterest: '2',
        phq9LowMood: '2',
        phq9SleepProblem: '2',
        phq9Fatigue: '2',
        phq9AppetiteChange: '2',
      }),
    );

    expect(summary.score).toBe(10);
    expect(summary.level).toBe('moderate');
    expect(summary.levelLabel).toBe('中度抑郁');
    expect(summary.needsReferral).toBe(true);
    expect(summary.summary).toContain('中度抑郁症状');
  });

  it('returns the moderately severe band for scores in the 15-19 range', () => {
    const summary = getPhq9AssessmentResultSummary(
      createPhq9AssessmentAnswers({
        phq9LittleInterest: '3',
        phq9LowMood: '3',
        phq9SleepProblem: '3',
        phq9Fatigue: '3',
        phq9AppetiteChange: '3',
      }),
    );

    expect(summary.score).toBe(15);
    expect(summary.level).toBe('moderately-severe');
    expect(summary.levelLabel).toBe('中重度抑郁');
    expect(summary.summary).toContain('中重度抑郁症状');
  });

  it('returns the severe band for scores in the 20-27 range', () => {
    const summary = getPhq9AssessmentResultSummary(
      createPhq9AssessmentAnswers({
        phq9LittleInterest: '3',
        phq9LowMood: '3',
        phq9SleepProblem: '3',
        phq9Fatigue: '3',
        phq9AppetiteChange: '3',
        phq9Worthlessness: '3',
        phq9Concentration: '2',
      }),
    );

    expect(summary.score).toBe(20);
    expect(summary.level).toBe('severe');
    expect(summary.levelLabel).toBe('重度抑郁');
    expect(summary.summary).toContain('重度抑郁症状');
    expect(summary.advice).toContain('尽快寻求心理/精神专科帮助');
  });

  it('adds personalized feedback for every item scored at least 2', () => {
    const summary = getPhq9AssessmentResultSummary(
      createPhq9AssessmentAnswers({
        phq9LittleInterest: '2',
        phq9SleepProblem: '3',
      }),
    );

    expect(summary.personalizedFeedback).toHaveLength(2);
    expect(summary.personalizedFeedback[0]).toContain('兴趣和动力');
    expect(summary.personalizedFeedback[1]).toContain('睡眠');
  });

  it('adds the high priority self-harm block whenever question 9 is at least 1', () => {
    const summary = getPhq9AssessmentResultSummary(
      createPhq9AssessmentAnswers({
        phq9SelfHarmThought: '1',
      }),
    );

    expect(summary.highRiskAlert).toBeTruthy();
    expect(summary.highRiskAlert).toContain('伤害自己');
    expect(summary.highRiskAlert).toContain('不要独自待着');
  });
});
