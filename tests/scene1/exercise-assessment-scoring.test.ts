import { describe, expect, it } from 'vitest';
import {
  createExerciseAssessmentAnswers,
  getExerciseAssessmentResultSummary,
} from '../../src/scenes/scene1/exercise-assessment/exerciseAssessmentScoring';
import {
  createExerciseAssessmentState,
  isExerciseAssessmentStepComplete,
} from '../../src/scenes/scene1/exercise-assessment/exerciseAssessmentState';

describe('exercise assessment scoring', () => {
  it('starts with an incomplete questionnaire state before the user answers yes or no', () => {
    const state = createExerciseAssessmentState();

    expect(isExerciseAssessmentStepComplete(state)).toBe(false);
  });

  it('returns the ready result when all answers are no', () => {
    const summary = getExerciseAssessmentResultSummary(createExerciseAssessmentAnswers());

    expect(summary.positiveCount).toBe(0);
    expect(summary.level).toBe('ready');
    expect(summary.title.length).toBeGreaterThan(0);
    expect(summary.resultSummary.length).toBeGreaterThan(0);
    expect(summary.nextStepLabel.length).toBeGreaterThan(0);
    expect(summary.resultExplanation.length).toBeGreaterThan(0);
    expect(summary.disclaimer.length).toBeGreaterThan(0);
  });

  it('returns the same red-light result when any question is positive', () => {
    const summaries = [
      createExerciseAssessmentAnswers({
        exerciseBoneJointSoftTissueIssue: 'yes',
      }),
      createExerciseAssessmentAnswers({
        exerciseHeartDiseaseOrHypertension: 'yes',
      }),
      createExerciseAssessmentAnswers({
        exerciseChestPain: 'yes',
      }),
    ].map(getExerciseAssessmentResultSummary);

    summaries.forEach((summary) => {
      expect(summary.level).toBe('restricted');
      expect(summary.positiveCount).toBeGreaterThan(0);
    });
  });

  it('keeps critical alerts visible inside the red-light result', () => {
    const summary = getExerciseAssessmentResultSummary(
      createExerciseAssessmentAnswers({
        exerciseChestPain: 'yes',
      }),
    );

    expect(summary.level).toBe('restricted');
    expect(summary.criticalAlerts).toHaveLength(1);
  });
});
