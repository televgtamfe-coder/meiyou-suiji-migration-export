import { Navigate, useNavigate } from 'react-router-dom';
import { StatusBar } from './components/StatusBar';
import { Phq9AssessmentResult } from './phq9-assessment/Phq9AssessmentResult';
import {
  createPhq9AssessmentAnswers,
  getPhq9AssessmentResultSummary,
} from './phq9-assessment/phq9AssessmentScoring';
import { readPhq9AssessmentLatest } from './phq9-assessment/phq9AssessmentStorage';

export function Scene1Phq9AssessmentResultPreviewPage() {
  const latest = readPhq9AssessmentLatest();
  const navigate = useNavigate();
  if (!latest) {
    return <Navigate to="/scene1-phq9-assessment" replace />;
  }

  const summary = getPhq9AssessmentResultSummary(createPhq9AssessmentAnswers(latest.answers));

  return (
    <div
      className="scene1-calendar-page scene1-phq9-assessment-page"
      data-testid="scene1-phq9-assessment-result-route-shell"
    >
      <StatusBar />

      <div className="scene1-assessment-shell scene1-assessment-shell-compact scene1-phq9-assessment-result-shell">
        <div className="scene1-assessment-body scene1-assessment-body-complete">
          <Phq9AssessmentResult summary={summary} />
        </div>

        <div className="scene1-assessment-footer scene1-assessment-footer-complete">
          <button
            type="button"
            className="scene1-assessment-secondary-btn"
            onClick={() => navigate('/scene1-phq9-assessment')}
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
