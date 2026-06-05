import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from './components/StatusBar';
import { ExerciseAssessmentResult } from './exercise-assessment/ExerciseAssessmentResult';
import {
  createExerciseAssessmentAnswers,
  createSampleExerciseAssessmentAnswers,
  getExerciseAssessmentResultSummary,
} from './exercise-assessment/exerciseAssessmentScoring';
import { readExerciseAssessmentLatest } from './exercise-assessment/exerciseAssessmentStorage';

export function Scene1ExerciseAssessmentResultPreviewPage() {
  const navigate = useNavigate();
  const summary = useMemo(() => {
    const latest = readExerciseAssessmentLatest();
    const answers = latest?.answers
      ? createExerciseAssessmentAnswers(latest.answers)
      : createSampleExerciseAssessmentAnswers();

    return getExerciseAssessmentResultSummary(answers);
  }, []);

  return (
    <div
      className="scene1-calendar-page scene1-exercise-assessment-page"
      data-testid="scene1-exercise-assessment-result-route-shell"
    >
      <StatusBar />

      <div className="scene1-assessment-shell scene1-assessment-shell-compact scene1-exercise-assessment-result-shell">
        <div className="scene1-assessment-body scene1-assessment-body-complete">
          <ExerciseAssessmentResult summary={summary} />
        </div>

        <div className="scene1-assessment-footer scene1-assessment-footer-complete">
          <button
            type="button"
            className="scene1-assessment-secondary-btn"
            onClick={() => navigate('/scene1-exercise-assessment')}
          >
            重新评估
          </button>
          <button
            type="button"
            className="scene1-assessment-primary-btn"
            onClick={() => navigate('/scene1-home')}
          >
            返回
          </button>
        </div>
      </div>
    </div>
  );
}
