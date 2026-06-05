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

    expect(summary.title).toBe('你的运动准备度评估已完成');
    expect(summary.positiveCount).toBe(0);
    expect(summary.level).toBe('ready');
    expect(summary.resultSummary).toBe('可直接开始运动');
    expect(summary.nextStepLabel).toBe('继续保持规律运动');
    expect(summary.resultExplanation).toContain('更侧重评估你是否适合安全开始运动');
    expect(summary.disclaimer).toContain('本评估用于运动前健康筛查');
  });

  it('returns the caution result when only the musculoskeletal item is positive', () => {
    const summary = getExerciseAssessmentResultSummary(
      createExerciseAssessmentAnswers({
        exerciseBoneJointSoftTissueIssue: 'yes',
      }),
    );

    expect(summary.positiveCount).toBe(1);
    expect(summary.level).toBe('caution');
    expect(summary.resultSummary).toBe('可以运动但需注意');
    expect(summary.nextStepLabel).toBe('从低强度开始');
    expect(summary.hitQuestionLabels).toEqual([
      '您现在是否（或在过去12个月内）存在骨骼、关节或软组织（肌肉、韧带、肌腱）问题，且可能因增加体力活动而加重？（如果过去有问题但现在不影响活动能力，请回答“否”）',
    ]);
  });

  it('returns the consult result when a non-critical chronic disease item is positive', () => {
    const summary = getExerciseAssessmentResultSummary(
      createExerciseAssessmentAnswers({
        exerciseHeartDiseaseOrHypertension: 'yes',
      }),
    );

    expect(summary.positiveCount).toBe(1);
    expect(summary.level).toBe('consult');
    expect(summary.resultSummary).toBe('建议先专业评估');
    expect(summary.nextStepLabel).toBe('先做健康确认');
    expect(summary.criticalAlerts).toHaveLength(0);
  });

  it('returns the restricted result when a critical alert item is positive', () => {
    const summary = getExerciseAssessmentResultSummary(
      createExerciseAssessmentAnswers({
        exerciseChestPain: 'yes',
      }),
    );

    expect(summary.positiveCount).toBe(1);
    expect(summary.level).toBe('restricted');
    expect(summary.resultSummary).toBe('暂不建议自行开始高强度运动');
    expect(summary.nextStepLabel).toBe('在专业指导下开始');
    expect(summary.criticalAlerts).toContain(
      '您在休息时、日常活动时或进行体力活动时是否感到胸痛？',
    );
  });

  it('returns the restricted result when three items are positive even without a critical alert', () => {
    const summary = getExerciseAssessmentResultSummary(
      createExerciseAssessmentAnswers({
        exerciseHeartDiseaseOrHypertension: 'yes',
        exerciseOtherChronicDisease: 'yes',
        exercisePrescriptionMedication: 'yes',
      }),
    );

    expect(summary.positiveCount).toBe(3);
    expect(summary.level).toBe('restricted');
    expect(summary.resultSummary).toBe('暂不建议自行开始高强度运动');
    expect(summary.hitQuestionLabels).toHaveLength(3);
  });
});
