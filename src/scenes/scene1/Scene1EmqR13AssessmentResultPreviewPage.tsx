import { Navigate, useNavigate } from 'react-router-dom';
import { StatusBar } from './components/StatusBar';
import { EmqR13AssessmentResult } from './emq-r13-assessment/EmqR13AssessmentResult';
import {
  createEmqR13AssessmentAnswers,
  getEmqR13AssessmentResultSummary,
} from './emq-r13-assessment/emqR13AssessmentScoring';
import { readEmqR13AssessmentLatest } from './emq-r13-assessment/emqR13AssessmentStorage';

export function Scene1EmqR13AssessmentResultPreviewPage() {
  const latest = readEmqR13AssessmentLatest();
  const navigate = useNavigate();

  if (!latest) {
    return <Navigate to="/scene1-emq-r13-assessment" replace />;
  }

  const summary = getEmqR13AssessmentResultSummary(createEmqR13AssessmentAnswers(latest.answers));

  return (
    <div
      className="scene1-calendar-page scene1-phq9-assessment-page"
      data-testid="scene1-emq-r13-assessment-result-route-shell"
    >
      <StatusBar />

      <div className="scene1-assessment-shell scene1-assessment-shell-compact scene1-phq9-assessment-result-shell">
        <div className="scene1-assessment-body scene1-assessment-body-complete">
          <EmqR13AssessmentResult summary={summary} />
        </div>

        <div className="scene1-assessment-footer scene1-assessment-footer-complete">
          <button
            type="button"
            className="scene1-assessment-secondary-btn"
            onClick={() => navigate('/scene1-emq-r13-assessment')}
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
