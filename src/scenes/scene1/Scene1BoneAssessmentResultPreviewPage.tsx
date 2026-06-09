import { Navigate, useNavigate } from 'react-router-dom';
import { StatusBar } from './components/StatusBar';
import { BoneAssessmentResult } from './bone-assessment/BoneAssessmentResult';
import {
  createBoneAssessmentAnswers,
  getBoneAssessmentResultSummary,
} from './bone-assessment/boneAssessmentScoring';
import { readBoneAssessmentLatest } from './bone-assessment/boneAssessmentStorage';

export function Scene1BoneAssessmentResultPreviewPage() {
  const latest = readBoneAssessmentLatest();
  const navigate = useNavigate();
  if (!latest) {
    return <Navigate to="/scene1-bone-assessment" replace />;
  }

  const summary = getBoneAssessmentResultSummary(createBoneAssessmentAnswers(latest.answers));

  return (
    <div
      className="scene1-calendar-page scene1-bone-assessment-page"
      data-testid="scene1-bone-assessment-result-route-shell"
    >
      <StatusBar />

      <div className="scene1-assessment-shell scene1-assessment-shell-compact scene1-bone-assessment-result-shell">
        <div className="scene1-assessment-body scene1-assessment-body-complete">
          <BoneAssessmentResult summary={summary} />
        </div>

        <div className="scene1-assessment-footer scene1-assessment-footer-complete">
          <button
            type="button"
            className="scene1-assessment-secondary-btn"
            onClick={() => navigate('/scene1-bone-assessment')}
          >
            重新评估
          </button>
          <button
            type="button"
            className="scene1-assessment-primary-btn"
            onClick={() => navigate('/scene1')}
          >
            返回
          </button>
        </div>
      </div>
    </div>
  );
}
