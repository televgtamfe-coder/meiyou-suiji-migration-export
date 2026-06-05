import {
  exerciseAssessmentStepCopy,
  ExerciseAssessmentFieldKey,
  ExerciseAssessmentStepId,
  exerciseAssessmentStepOneFields,
  exerciseAssessmentStepThreeFields,
  exerciseAssessmentStepTwoFields,
} from './exerciseAssessmentContent';

export type ExerciseAssessmentStepDefinition = {
  id: ExerciseAssessmentStepId;
  title: string;
  subtitle: string;
  fields: ExerciseAssessmentFieldKey[];
};

export const exerciseAssessmentSteps: ExerciseAssessmentStepDefinition[] = [
  {
    id: 1,
    title: exerciseAssessmentStepCopy[1].title,
    subtitle: exerciseAssessmentStepCopy[1].subtitle,
    fields: [...exerciseAssessmentStepOneFields],
  },
  {
    id: 2,
    title: exerciseAssessmentStepCopy[2].title,
    subtitle: exerciseAssessmentStepCopy[2].subtitle,
    fields: [...exerciseAssessmentStepTwoFields],
  },
  {
    id: 3,
    title: exerciseAssessmentStepCopy[3].title,
    subtitle: exerciseAssessmentStepCopy[3].subtitle,
    fields: [...exerciseAssessmentStepThreeFields],
  },
];

export function getExerciseAssessmentStep(id: ExerciseAssessmentStepId) {
  const step = exerciseAssessmentSteps.find((item) => item.id === id);

  if (!step) {
    throw new Error(`Unknown exercise assessment step: ${id}`);
  }

  return step;
}
