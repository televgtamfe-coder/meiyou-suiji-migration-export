import { AssessmentFieldKey } from '../assessmentSteps';
import {
  Scene1AssessmentState,
  completeAssessment,
  goToNextAssessmentStep,
  goToPreviousAssessmentStep,
  isAssessmentStepComplete,
  reopenAssessmentFromCompletion,
} from '../assessmentState';
import { AssessmentProgress } from './AssessmentProgress';
import { AssessmentStepRenderer } from './AssessmentStepRenderer';

type PerimenopauseAssessmentShellProps = {
  state: Scene1AssessmentState;
  onAnswer: (field: AssessmentFieldKey, value: string) => void;
  onExitToScene1: () => void;
  onReturnToScene1: () => void;
  onEnterPerimenopauseMode: () => void;
  onNext: (nextState: Scene1AssessmentState) => void;
  onPrevious: (nextState: Scene1AssessmentState) => void;
};

export function PerimenopauseAssessmentShell({
  state,
  onAnswer,
  onExitToScene1,
  onReturnToScene1,
  onEnterPerimenopauseMode,
  onNext,
  onPrevious,
}: PerimenopauseAssessmentShellProps) {
  if (!state.assessmentOpen) {
    return null;
  }

  const canAdvance = state.currentStep === 1 || state.completed || isAssessmentStepComplete(state);
  const nextLabel = state.currentStep === 6 ? '完成评估' : '下一步';
  const handlePrevious = () => {
    if (state.completed) {
      onPrevious(reopenAssessmentFromCompletion(state));
      return;
    }

    if (state.currentStep === 1) {
      onExitToScene1();
      return;
    }

    onPrevious(goToPreviousAssessmentStep(state));
  };

  return (
    <div className="scene1-assessment-shell" data-testid="scene1-assessment-shell">
      {!state.completed ? <AssessmentProgress currentStep={state.currentStep} totalSteps={6} /> : null}

      <div className="scene1-assessment-body">
        <AssessmentStepRenderer state={state} onAnswer={onAnswer} />
      </div>

      <div className="scene1-assessment-footer">
        <button
          type="button"
          className="scene1-assessment-secondary-btn"
          onClick={handlePrevious}
        >
          上一步
        </button>
        {state.completed ? (
          <>
            <button type="button" className="scene1-assessment-secondary-btn" onClick={onReturnToScene1}>
              返回
            </button>
            <button type="button" className="scene1-assessment-primary-btn" onClick={onEnterPerimenopauseMode}>
              进入围绝经期模式
            </button>
          </>
        ) : (
          <button
            type="button"
            className="scene1-assessment-primary-btn"
            disabled={!canAdvance}
            onClick={() => {
              if (state.currentStep === 6) {
                onNext(completeAssessment(state));
                return;
              }

              onNext(goToNextAssessmentStep(state));
            }}
          >
            {nextLabel}
          </button>
        )}
      </div>
    </div>
  );
}
