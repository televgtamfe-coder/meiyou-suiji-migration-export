import { describe, expect, it } from 'vitest';
import {
  createGad7AssessmentAnswers,
  getGad7AssessmentResultSummary,
} from '../../src/scenes/scene1/gad7-assessment/gad7AssessmentScoring';
import {
  createGad7AssessmentState,
  isGad7AssessmentStepComplete,
} from '../../src/scenes/scene1/gad7-assessment/gad7AssessmentState';

describe('gad7 assessment scoring', () => {
  it('starts with an incomplete first step before the user answers the first three questions', () => {
    const state = createGad7AssessmentState();

    expect(isGad7AssessmentStepComplete(state)).toBe(false);
  });

  it('returns the minimal band for scores in the 0-4 range', () => {
    const summary = getGad7AssessmentResultSummary(
      createGad7AssessmentAnswers({
        gad7Nervous: '1',
        gad7UncontrollableWorry: '1',
        gad7ExcessiveWorry: '1',
        gad7TroubleRelaxing: '1',
      }),
    );

    expect(summary.score).toBe(4);
    expect(summary.level).toBe('minimal');
    expect(summary.levelLabel).toBe('无/极轻微焦虑');
    expect(summary.needsReferral).toBe(false);
    expect(summary.summary).toContain('无或仅有极轻度焦虑症状');
  });

  it('returns the mild band for scores in the 5-9 range', () => {
    const summary = getGad7AssessmentResultSummary(
      createGad7AssessmentAnswers({
        gad7Nervous: '2',
        gad7UncontrollableWorry: '2',
        gad7ExcessiveWorry: '1',
      }),
    );

    expect(summary.score).toBe(5);
    expect(summary.level).toBe('mild');
    expect(summary.levelLabel).toBe('轻度焦虑');
    expect(summary.needsReferral).toBe(false);
    expect(summary.summary).toContain('轻度焦虑症状');
  });

  it('returns the moderate band and referral flag for scores in the 10-14 range', () => {
    const summary = getGad7AssessmentResultSummary(
      createGad7AssessmentAnswers({
        gad7Nervous: '2',
        gad7UncontrollableWorry: '2',
        gad7ExcessiveWorry: '2',
        gad7TroubleRelaxing: '2',
        gad7Restlessness: '2',
      }),
    );

    expect(summary.score).toBe(10);
    expect(summary.level).toBe('moderate');
    expect(summary.levelLabel).toBe('中度焦虑');
    expect(summary.needsReferral).toBe(true);
    expect(summary.summary).toContain('中度焦虑症状');
  });

  it('returns the severe band for scores in the 15-21 range', () => {
    const summary = getGad7AssessmentResultSummary(
      createGad7AssessmentAnswers({
        gad7Nervous: '3',
        gad7UncontrollableWorry: '3',
        gad7ExcessiveWorry: '3',
        gad7TroubleRelaxing: '3',
        gad7Restlessness: '3',
      }),
    );

    expect(summary.score).toBe(15);
    expect(summary.level).toBe('severe');
    expect(summary.levelLabel).toBe('重度焦虑');
    expect(summary.needsReferral).toBe(true);
    expect(summary.summary).toContain('重度焦虑症状');
    expect(summary.advice).toContain('尽快寻求专业支持');
  });

  it('adds personalized feedback for every item scored at least 2', () => {
    const summary = getGad7AssessmentResultSummary(
      createGad7AssessmentAnswers({
        gad7Nervous: '2',
        gad7TroubleRelaxing: '3',
      }),
    );

    expect(summary.personalizedFeedback).toHaveLength(2);
    expect(summary.personalizedFeedback[0]).toContain('紧绷');
    expect(summary.personalizedFeedback[1]).toContain('开机');
  });
});
