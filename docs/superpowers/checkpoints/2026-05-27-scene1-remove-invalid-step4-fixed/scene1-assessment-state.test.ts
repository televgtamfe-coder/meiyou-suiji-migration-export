import { describe, expect, it } from 'vitest';
import {
  answerAssessmentField,
  closeAssessmentFlow,
  completeAssessment,
  createAssessmentState,
  goToNextAssessmentStep,
  goToPreviousAssessmentStep,
  isAssessmentStepComplete,
  openAssessmentFlow,
} from '../../src/scenes/scene1/assessmentState';

describe('scene1 assessment state', () => {
  it('starts with the entry modal open and the wizard closed', () => {
    const state = createAssessmentState();

    expect(state.entryModalOpen).toBe(true);
    expect(state.assessmentOpen).toBe(false);
    expect(state.currentStep).toBe(1);
    expect(state.completed).toBe(false);
  });

  it('opens the wizard from the entry modal and resets progress when closed', () => {
    const opened = openAssessmentFlow(createAssessmentState());
    const answered = answerAssessmentField(opened, 'birthDate', '1984-05-01');
    const advanced = goToNextAssessmentStep(answered);
    const closed = closeAssessmentFlow(advanced);

    expect(opened.entryModalOpen).toBe(false);
    expect(opened.assessmentOpen).toBe(true);
    expect(advanced.currentStep).toBe(2);
    expect(closed).toEqual(createAssessmentState());
  });

  it('validates required fields per step and preserves answers while moving backwards', () => {
    let state = openAssessmentFlow(createAssessmentState());

    expect(isAssessmentStepComplete(state)).toBe(true);

    state = goToNextAssessmentStep(state);
    expect(state.currentStep).toBe(2);
    expect(isAssessmentStepComplete(state)).toBe(false);

    state = answerAssessmentField(state, 'birthDate', '1984-05-01');
    state = answerAssessmentField(state, 'heightCm', '165');
    state = answerAssessmentField(state, 'weightKg', '58');

    expect(isAssessmentStepComplete(state)).toBe(true);

    const stepThree = goToNextAssessmentStep(state);
    let answered = answerAssessmentField(stepThree, 'periodPresence', 'yes');
    answered = answerAssessmentField(answered, 'cycleChange', 'shorter');
    answered = answerAssessmentField(answered, 'volumeChange', 'lighter');

    expect(isAssessmentStepComplete(answered)).toBe(false);

    answered = answerAssessmentField(answered, 'lastPeriodQuickOption', 'current-period');
    const steppedBack = goToPreviousAssessmentStep(answered);

    expect(steppedBack.currentStep).toBe(2);
    expect(steppedBack.answers.birthDate).toBe('1984-05-01');
    expect(answered.answers.periodPresence).toBe('yes');
    expect(answered.answers.lastPeriodQuickOption).toBe('current-period');
  });

  it('marks the flow complete after the final step is submitted', () => {
    const finished = completeAssessment({
      ...openAssessmentFlow(createAssessmentState()),
      currentStep: 6,
    });

    expect(finished.completed).toBe(true);
    expect(finished.assessmentOpen).toBe(true);
  });

  it('caps the assessment flow at step 6 because the original design has no standalone step 4 symptom page', () => {
    const advanced = goToNextAssessmentStep({
      ...openAssessmentFlow(createAssessmentState()),
      currentStep: 6,
    });

    expect(advanced.currentStep).toBe(6);
  });
});
