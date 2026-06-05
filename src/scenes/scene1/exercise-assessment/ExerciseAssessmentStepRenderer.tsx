import {
  exerciseAssessmentFieldCopyMap,
  ExerciseAssessmentFieldKey,
  exerciseAssessmentStepNotes,
  exerciseAssessmentYesNoOptions,
} from './exerciseAssessmentContent';
import { ExerciseAssessmentState, getCurrentExerciseAssessmentStep } from './exerciseAssessmentState';

type ExerciseAssessmentStepRendererProps = {
  state: ExerciseAssessmentState;
  onAnswer: (field: ExerciseAssessmentFieldKey, value: string) => void;
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
        {exerciseAssessmentYesNoOptions.map((option) => (
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

export function ExerciseAssessmentStepRenderer({
  state,
  onAnswer,
}: ExerciseAssessmentStepRendererProps) {
  const step = getCurrentExerciseAssessmentStep(state);
  const note = exerciseAssessmentStepNotes[step.id];

  return (
    <div className="scene1-assessment-stack">
      <section className="scene1-assessment-block scene1-exercise-assessment-overview">
        <div className="scene1-assessment-step-head scene1-assessment-step-head-compact">
          <h2 className="scene1-assessment-title">PAR-Q 运动能力评估</h2>
          <p className="scene1-assessment-body-copy">
            请回答“是”或“否”（回顾过去或当前状态），用 7 个标准问题快速判断当前是否适合直接开始运动。
          </p>
        </div>
      </section>

      <div className="scene1-assessment-step-head scene1-assessment-step-head-compact">
        <h2 className="scene1-assessment-title">{step.title}</h2>
        <p className="scene1-assessment-body-copy">{step.subtitle}</p>
      </div>

      {step.fields.map((field) => (
        <ChoiceRow
          key={field}
          label={exerciseAssessmentFieldCopyMap[field].label}
          value={state.answers[field]}
          onSelect={(value) => onAnswer(field, value)}
        />
      ))}

      <div className="scene1-assessment-banner scene1-assessment-footnote">
        <strong className="scene1-assessment-footnote-title">{note.title}</strong>
        <p className="scene1-assessment-footnote-body">{note.body}</p>
      </div>
    </div>
  );
}
