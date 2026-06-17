import {
  Phq9AssessmentFieldKey,
  phq9AssessmentFieldCopyMap,
  phq9AssessmentIntro,
  phq9AssessmentOptions,
  phq9AssessmentQuestionnaireTitle,
} from './phq9AssessmentContent';
import { Phq9AssessmentState, getCurrentPhq9AssessmentStep } from './phq9AssessmentState';
import { phq9AssessmentOverviewSummary } from '../assessmentOverviewCopy';

type Phq9AssessmentStepRendererProps = {
  state: Phq9AssessmentState;
  onAnswer: (field: Phq9AssessmentFieldKey, value: string) => void;
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
        {phq9AssessmentOptions.map((option) => (
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

export function Phq9AssessmentStepRenderer({
  state,
  onAnswer,
}: Phq9AssessmentStepRendererProps) {
  const step = getCurrentPhq9AssessmentStep(state);

  return (
    <div className="scene1-assessment-stack">
      <section className="scene1-assessment-block scene1-phq9-assessment-overview">
        <div className="scene1-assessment-step-head scene1-assessment-step-head-compact">
          <h2 className="scene1-assessment-title">{phq9AssessmentQuestionnaireTitle}</h2>
          <p className="scene1-assessment-body-copy">{phq9AssessmentIntro}</p>
          <p className="scene1-assessment-helper">{phq9AssessmentOverviewSummary}</p>
        </div>
      </section>

      <div className="scene1-assessment-step-head scene1-assessment-step-head-compact">
        <h2 className="scene1-assessment-title">{step.title}</h2>
        <p className="scene1-assessment-body-copy">{step.subtitle}</p>
      </div>

      {step.fields.map((field) => (
        <ChoiceRow
          key={field}
          label={phq9AssessmentFieldCopyMap[field].label}
          value={state.answers[field]}
          onSelect={(value) => onAnswer(field, value)}
        />
      ))}
    </div>
  );
}
