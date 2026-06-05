import {
  Gad7AssessmentFieldKey,
  gad7AssessmentFieldCopyMap,
  gad7AssessmentIntro,
  gad7AssessmentOptions,
  gad7AssessmentQuestionnaireTitle,
} from './gad7AssessmentContent';
import { Gad7AssessmentState, getCurrentGad7AssessmentStep } from './gad7AssessmentState';

type Gad7AssessmentStepRendererProps = {
  state: Gad7AssessmentState;
  onAnswer: (field: Gad7AssessmentFieldKey, value: string) => void;
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
        {gad7AssessmentOptions.map((option) => (
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

export function Gad7AssessmentStepRenderer({
  state,
  onAnswer,
}: Gad7AssessmentStepRendererProps) {
  const step = getCurrentGad7AssessmentStep(state);

  return (
    <div className="scene1-assessment-stack">
      <section className="scene1-assessment-block scene1-gad7-assessment-overview">
        <div className="scene1-assessment-step-head scene1-assessment-step-head-compact">
          <h2 className="scene1-assessment-title">{gad7AssessmentQuestionnaireTitle}</h2>
          <p className="scene1-assessment-body-copy">{gad7AssessmentIntro}</p>
        </div>
      </section>

      <div className="scene1-assessment-step-head scene1-assessment-step-head-compact">
        <h2 className="scene1-assessment-title">{step.title}</h2>
        <p className="scene1-assessment-body-copy">{step.subtitle}</p>
      </div>

      {step.fields.map((field) => (
        <ChoiceRow
          key={field}
          label={gad7AssessmentFieldCopyMap[field].label}
          value={state.answers[field]}
          onSelect={(value) => onAnswer(field, value)}
        />
      ))}
    </div>
  );
}
