import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBar } from './components/StatusBar';
import { Gad7AssessmentResult } from './gad7-assessment/Gad7AssessmentResult';
import {
  createGad7AssessmentAnswers,
  createSampleGad7AssessmentAnswers,
  getGad7AssessmentResultSummary,
} from './gad7-assessment/gad7AssessmentScoring';
import { readGad7AssessmentLatest } from './gad7-assessment/gad7AssessmentStorage';

export function Scene1Gad7AssessmentResultPreviewPage() {
  const navigate = useNavigate();
  const summary = useMemo(() => {
    const latest = readGad7AssessmentLatest();
    const answers = latest?.answers
      ? createGad7AssessmentAnswers(latest.answers)
      : createSampleGad7AssessmentAnswers();

    return getGad7AssessmentResultSummary(answers);
  }, []);

  return (
    <div
      className="scene1-calendar-page scene1-gad7-assessment-page"
      data-testid="scene1-gad7-assessment-result-route-shell"
    >
      <StatusBar />

      <div className="scene1-assessment-shell scene1-assessment-shell-compact scene1-gad7-assessment-result-shell">
        <div className="scene1-assessment-body scene1-assessment-body-complete">
          <Gad7AssessmentResult summary={summary} />
        </div>

        <div className="scene1-assessment-footer scene1-assessment-footer-complete">
          <button
            type="button"
            className="scene1-assessment-secondary-btn"
            onClick={() => navigate('/scene1-gad7-assessment')}
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
