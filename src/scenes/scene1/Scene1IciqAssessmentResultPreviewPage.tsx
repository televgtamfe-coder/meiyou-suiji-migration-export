import { Navigate, useNavigate } from 'react-router-dom';
import { StatusBar } from './components/StatusBar';
import { IciqAssessmentResult } from './iciq-assessment/IciqAssessmentResult';
import {
  createIciqAssessmentAnswers,
  getIciqAssessmentResultSummary,
} from './iciq-assessment/iciqAssessmentScoring';
import { readIciqAssessmentLatest } from './iciq-assessment/iciqAssessmentStorage';

export function Scene1IciqAssessmentResultPreviewPage() {
  const latest = readIciqAssessmentLatest();
  const navigate = useNavigate();

  if (!latest) {
    return <Navigate to="/scene1-iciq-assessment" replace />;
  }

  const summary = getIciqAssessmentResultSummary(createIciqAssessmentAnswers(latest.answers));

  return (
    <div
      className="scene1-calendar-page scene1-iciq-assessment-page"
      data-testid="scene1-iciq-assessment-result-route-shell"
    >
      <StatusBar />

      <div className="scene1-assessment-shell scene1-assessment-shell-compact scene1-gad7-assessment-result-shell">
        <div className="scene1-assessment-body scene1-assessment-body-complete">
          <IciqAssessmentResult summary={summary} />
        </div>

        <div className="scene1-assessment-footer scene1-assessment-footer-complete">
          <button
            type="button"
            className="scene1-assessment-secondary-btn"
            onClick={() => navigate('/scene1-iciq-assessment')}
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
