import { describe, expect, it } from 'vitest';
import {
  createEmqR13AssessmentAnswers,
  getEmqR13AssessmentResultSummary,
} from '../../src/scenes/scene1/emq-r13-assessment/emqR13AssessmentScoring';
import {
  createEmqR13AssessmentState,
  isEmqR13AssessmentStepComplete,
} from '../../src/scenes/scene1/emq-r13-assessment/emqR13AssessmentState';

describe('emq-r13 assessment scoring', () => {
  it('starts with an incomplete first step before the user answers the first group', () => {
    const state = createEmqR13AssessmentState();

    expect(isEmqR13AssessmentStepComplete(state)).toBe(false);
  });

  it('returns the clear band when both subscales are below the reference cut-offs', () => {
    const summary = getEmqR13AssessmentResultSummary(
      createEmqR13AssessmentAnswers({
        emqR13CheckDone: '1',
        emqR13TimeOrder: '1',
        emqR13ToldByOthers: '1',
        emqR13TipOfTongue: '1',
      }),
    );

    expect(summary.score).toBe(4);
    expect(summary.retrievalScore).toBe(4);
    expect(summary.attentionalTrackingScore).toBe(0);
    expect(summary.level).toBe('clear');
    expect(summary.levelLabel).toBe('当前未见明显困扰');
  });

  it('returns the watch band when only one subscale reaches the project threshold', () => {
    const summary = getEmqR13AssessmentResultSummary(
      createEmqR13AssessmentAnswers({
        emqR13CheckDone: '2',
        emqR13TimeOrder: '2',
        emqR13ToldByOthers: '2',
        emqR13TipOfTongue: '2',
        emqR13ForgetPlanned: '2',
        emqR13ForgetDetails: '2',
        emqR13ForgetPassingInfo: '1',
      }),
    );

    expect(summary.retrievalScore).toBe(13);
    expect(summary.attentionalTrackingScore).toBe(0);
    expect(summary.level).toBe('watch');
    expect(summary.levelLabel).toBe('轻度关注');
  });

  it('returns the track band when both subscales reach the project thresholds', () => {
    const summary = getEmqR13AssessmentResultSummary(
      createEmqR13AssessmentAnswers({
        emqR13CheckDone: '2',
        emqR13TimeOrder: '2',
        emqR13ToldByOthers: '2',
        emqR13TipOfTongue: '2',
        emqR13ForgetPlanned: '2',
        emqR13ForgetDetails: '2',
        emqR13ForgetPassingInfo: '1',
        emqR13ForgetJustSaid: '2',
        emqR13LoseStoryline: '2',
        emqR13MixDetails: '2',
        emqR13RepeatSelf: '1',
      }),
    );

    expect(summary.retrievalScore).toBe(13);
    expect(summary.attentionalTrackingScore).toBe(7);
    expect(summary.level).toBe('track');
    expect(summary.levelLabel).toBe('建议持续跟踪');
  });

  it('returns the evaluate band when both subscales are elevated and total score is high', () => {
    const summary = getEmqR13AssessmentResultSummary(
      createEmqR13AssessmentAnswers({
        emqR13CheckDone: '3',
        emqR13TimeOrder: '3',
        emqR13ToldByOthers: '3',
        emqR13TipOfTongue: '3',
        emqR13ForgetPlanned: '2',
        emqR13ForgetDetails: '2',
        emqR13ForgetPassingInfo: '2',
        emqR13ForgetJustSaid: '3',
        emqR13LoseStoryline: '3',
        emqR13MixDetails: '2',
        emqR13RepeatSelf: '2',
        emqR13RereadWithoutRealizing: '1',
        emqR13MisplaceItems: '1',
      }),
    );

    expect(summary.score).toBeGreaterThanOrEqual(30);
    expect(summary.level).toBe('evaluate');
    expect(summary.levelLabel).toBe('建议进一步评估');
    expect(summary.needsFurtherEvaluation).toBe(true);
  });
});
