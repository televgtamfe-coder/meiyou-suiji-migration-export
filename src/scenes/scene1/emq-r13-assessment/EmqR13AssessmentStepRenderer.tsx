import {
  EmqR13AssessmentFieldKey,
  emqR13AssessmentFieldCopyMap,
  emqR13AssessmentIntro,
  emqR13AssessmentOptions,
  emqR13AssessmentQuestionnaireTitle,
} from './emqR13AssessmentContent';
import { EmqR13AssessmentState, getCurrentEmqR13AssessmentStep } from './emqR13AssessmentState';
import { emqR13AssessmentOverviewSummary } from '../assessmentOverviewCopy';

type EmqR13AssessmentStepRendererProps = {
  state: EmqR13AssessmentState;
  onAnswer: (field: EmqR13AssessmentFieldKey, value: string) => void;
};

type ChoiceRowProps = {
  label: string;
  value: string;
  onSelect: (value: string) => void;
};

function ChoiceRow({ label, value, onSelect }: ChoiceRowProps) {
  return (
    <div className="scene1-assessment-block">
      <h3 className="scene1-assessment-question">{label}</h3>
      <div className="scene1-assessment-choice-grid">
        {emqR13AssessmentOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={value === option.value ? 'scene1-assessment-choice active' : 'scene1-assessment-choice'}
            onClick={() => onSelect(option.value)}
          >
            <span className="scene1-assessment-choice-label">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function EmqR13AssessmentStepRenderer({
  state,
  onAnswer,
}: EmqR13AssessmentStepRendererProps) {
  const step = getCurrentEmqR13AssessmentStep(state);

  return (
    <div className="scene1-assessment-stack">
      <section className="scene1-assessment-block scene1-gad7-assessment-overview">
        <div className="scene1-assessment-step-head scene1-assessment-step-head-compact">
          <h2 className="scene1-assessment-title">{emqR13AssessmentQuestionnaireTitle}</h2>
          <p className="scene1-assessment-body-copy">{emqR13AssessmentIntro}</p>
          <p className="scene1-assessment-helper">{emqR13AssessmentOverviewSummary}</p>
        </div>
      </section>

      <div className="scene1-assessment-step-head scene1-assessment-step-head-compact">
        <h2 className="scene1-assessment-title">{step.title}</h2>
        <p className="scene1-assessment-body-copy">{step.subtitle}</p>
      </div>

      {step.fields.map((field) => (
        <ChoiceRow
          key={field}
          label={emqR13AssessmentFieldCopyMap[field].label}
          value={state.answers[field]}
          onSelect={(value) => onAnswer(field, value)}
        />
      ))}
    </div>
  );
}
