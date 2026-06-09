import { describe, expect, it } from 'vitest';
import {
  createPsqiAssessmentAnswers,
  getPsqiAssessmentResultSummary,
} from '../../src/scenes/scene1/psqi-assessment/psqiAssessmentScoring';

describe('psqi assessment scoring', () => {
  it('returns the good-sleep result when all component scores are zero', () => {
    const summary = getPsqiAssessmentResultSummary(
      createPsqiAssessmentAnswers({
        psqiBedTime: '23:00',
        psqiSleepLatencyMinutes: '10',
        psqiWakeTime: '07:00',
        psqiSleepDurationHours: '7.5',
      }),
    );

    expect(summary.score).toBe(0);
    expect(summary.level).toBe('good');
    expect(summary.hasPoorSleep).toBe(false);
    expect(summary.componentScores).toEqual({
      subjectiveQuality: 0,
      sleepLatency: 0,
      sleepDuration: 0,
      sleepEfficiency: 0,
      sleepDisturbance: 0,
      sleepMedication: 0,
      daytimeDysfunction: 0,
    });
  });

  it('returns the high-burden result when multiple PSQI components are poor', () => {
    const summary = getPsqiAssessmentResultSummary(
      createPsqiAssessmentAnswers({
        psqiBedTime: '22:30',
        psqiSleepLatencyMinutes: '70',
        psqiWakeTime: '06:00',
        psqiSleepDurationHours: '4.5',
        psqiSleepDisturbanceFallingAsleep: '3',
        psqiSleepDisturbanceWakeUp: '2',
        psqiSleepDisturbanceBathroom: '2',
        psqiSleepDisturbanceBreathing: '2',
        psqiSleepDisturbanceSnoring: '2',
        psqiSleepDisturbanceCold: '2',
        psqiSleepDisturbanceHot: '2',
        psqiSleepDisturbanceDreams: '2',
        psqiSleepDisturbancePain: '2',
        psqiSleepDisturbanceOther: '2',
        psqiSubjectiveQuality: '3',
        psqiSleepMedication: '2',
        psqiDaytimeSleepiness: '2',
        psqiDaytimeEnthusiasm: '2',
      }),
    );

    expect(summary.score).toBe(18);
    expect(summary.level).toBe('high-burden');
    expect(summary.hasPoorSleep).toBe(true);
    expect(summary.componentScores.sleepLatency).toBe(3);
    expect(summary.componentScores.sleepDuration).toBe(3);
    expect(summary.componentScores.sleepEfficiency).toBe(3);
  });
});
