import { Navigate, useNavigate } from 'react-router-dom';
import { StatusBar } from './components/StatusBar';
import { PsqiAssessmentResult } from './psqi-assessment/PsqiAssessmentResult';
import {
  createPsqiAssessmentAnswers,
  getPsqiAssessmentResultSummary,
} from './psqi-assessment/psqiAssessmentScoring';
import { readPsqiAssessmentLatest } from './psqi-assessment/psqiAssessmentStorage';

export function Scene1PsqiAssessmentResultPreviewPage() {
  const latest = readPsqiAssessmentLatest();
  const navigate = useNavigate();

  if (!latest) {
    return <Navigate to="/scene1-psqi-assessment" replace />;
  }

  const summary = getPsqiAssessmentResultSummary(createPsqiAssessmentAnswers(latest.answers));

  return (
    <div
      className="scene1-calendar-page scene1-psqi-assessment-page"
      data-testid="scene1-psqi-assessment-result-route-shell"
    >
      <StatusBar />

      <div className="scene1-assessment-shell scene1-assessment-shell-compact scene1-gad7-assessment-result-shell">
        <div className="scene1-assessment-body scene1-assessment-body-complete">
          <PsqiAssessmentResult summary={summary} />
        </div>

        <div className="scene1-assessment-footer scene1-assessment-footer-complete">
          <button
            type="button"
            className="scene1-assessment-secondary-btn"
            onClick={() => navigate('/scene1-psqi-assessment')}
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
