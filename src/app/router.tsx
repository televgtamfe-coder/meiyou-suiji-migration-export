import { Navigate, Route, Routes } from 'react-router-dom';
import { Scene1Page } from '../scenes/scene1/Scene1Page';
import { Scene1HomePage } from '../scenes/scene1/Scene1HomePage';
import { Scene1MessagePage } from '../scenes/scene1/Scene1MessagePage';
import { Scene1MyPage } from '../scenes/scene1/Scene1MyPage';
import { Scene1PrepPage } from '../scenes/scene1/Scene1PrepPage';
import { Scene1ParentingPage } from '../scenes/scene1/Scene1ParentingPage';
import { Scene1PregnancyPage } from '../scenes/scene1/Scene1PregnancyPage';
import { Scene1AssessmentStageComparePage } from '../scenes/scene1/Scene1AssessmentStageComparePage';
import { Scene1AssessmentResultPreviewPage } from '../scenes/scene1/Scene1AssessmentResultPreviewPage';
import { RecordLandingPage } from '../scenes/record-shell/RecordLandingPage';
import { KegelReviewPage } from '../scenes/kegel-review/KegelReviewPage';
import { KegelTrainingPage } from '../scenes/kegel-training/KegelTrainingPage';
import { Scene2Page } from '../scenes/scene2/Scene2Page';
import { Scene3Page } from '../scenes/scene3/Scene3Page';

function SceneRouteShell() {
  return (
    <div className="app-root">
      <div className="phone-shell" data-testid="phone-shell">
        <Scene1Page />
      </div>
    </div>
  );
}

function ScenePerimenopauseRouteShell() {
  return (
    <div className="app-root">
      <div className="phone-shell" data-testid="phone-shell">
        <Scene1Page routeVariant="perimenopause" />
      </div>
    </div>
  );
}

function SceneHomeRouteShell() {
  return (
    <div className="app-root">
      <div className="phone-shell" data-testid="phone-shell">
        <Scene1HomePage />
      </div>
    </div>
  );
}

function SceneMyRouteShell() {
  return (
    <div className="app-root">
      <div className="phone-shell" data-testid="phone-shell">
        <Scene1MyPage />
      </div>
    </div>
  );
}

function SceneMessageRouteShell() {
  return (
    <div className="app-root">
      <div className="phone-shell" data-testid="phone-shell">
        <Scene1MessagePage />
      </div>
    </div>
  );
}

function SceneParentingRouteShell() {
  return (
    <div className="app-root">
      <div className="phone-shell" data-testid="phone-shell">
        <Scene1ParentingPage />
      </div>
    </div>
  );
}

function ScenePregnancyRouteShell() {
  return (
    <div className="app-root">
      <div className="phone-shell" data-testid="phone-shell">
        <Scene1PregnancyPage />
      </div>
    </div>
  );
}

function ScenePrepRouteShell() {
  return (
    <div className="app-root">
      <div className="phone-shell" data-testid="phone-shell">
        <Scene1PrepPage />
      </div>
    </div>
  );
}

function KegelReviewRouteShell() {
  return (
    <div className="app-root">
      <div className="phone-shell" data-testid="phone-shell">
        <KegelReviewPage />
      </div>
    </div>
  );
}

function KegelTrainingRouteShell() {
  return (
    <div className="app-root">
      <div className="phone-shell" data-testid="phone-shell">
        <KegelTrainingPage />
      </div>
    </div>
  );
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/scene1-assessment-result" element={<SceneAssessmentResultRouteShell />} />
      <Route path="/scene1-assessment-stage-compare" element={<SceneAssessmentStageCompareRouteShell />} />
      <Route path="/scene1-prep" element={<ScenePrepRouteShell />} />
      <Route path="/scene1-pregnancy" element={<ScenePregnancyRouteShell />} />
      <Route path="/scene1-parenting" element={<SceneParentingRouteShell />} />
      <Route path="/scene1-home" element={<SceneHomeRouteShell />} />
      <Route path="/scene1-message" element={<SceneMessageRouteShell />} />
      <Route path="/scene1-my" element={<SceneMyRouteShell />} />
      <Route path="/scene1" element={<SceneRouteShell />} />
      <Route path="/scene1-perimenopause" element={<ScenePerimenopauseRouteShell />} />
      <Route path="/scene2" element={<Scene2Page />} />
      <Route path="/scene3" element={<Scene3Page />} />
      <Route path="/kegel-review" element={<KegelReviewRouteShell />} />
      <Route path="/kegel-training" element={<KegelTrainingRouteShell />} />
      <Route path="/record" element={<RecordLandingPage />} />
      <Route path="*" element={<Navigate to="/scene1" replace />} />
    </Routes>
  );
}

function SceneAssessmentStageCompareRouteShell() {
  return (
    <div className="app-root">
      <div className="phone-shell" data-testid="phone-shell">
        <Scene1AssessmentStageComparePage />
      </div>
    </div>
  );
}

function SceneAssessmentResultRouteShell() {
  return (
    <div className="app-root">
      <div className="phone-shell" data-testid="phone-shell">
        <Scene1AssessmentResultPreviewPage />
      </div>
    </div>
  );
}
