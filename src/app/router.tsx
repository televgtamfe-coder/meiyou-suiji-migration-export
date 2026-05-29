import { Navigate, Route, Routes } from 'react-router-dom';
import { Scene1Page } from '../scenes/scene1/Scene1Page';
import { Scene1HomePage } from '../scenes/scene1/Scene1HomePage';
import { Scene1MessagePage } from '../scenes/scene1/Scene1MessagePage';
import { Scene1MyPage } from '../scenes/scene1/Scene1MyPage';
import { Scene1PrepPage } from '../scenes/scene1/Scene1PrepPage';
import { Scene1ParentingPage } from '../scenes/scene1/Scene1ParentingPage';
import { RecordLandingPage } from '../scenes/record-shell/RecordLandingPage';
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

function ScenePrepRouteShell() {
  return (
    <div className="app-root">
      <div className="phone-shell" data-testid="phone-shell">
        <Scene1PrepPage />
      </div>
    </div>
  );
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/scene1-prep" element={<ScenePrepRouteShell />} />
      <Route path="/scene1-parenting" element={<SceneParentingRouteShell />} />
      <Route path="/scene1-home" element={<SceneHomeRouteShell />} />
      <Route path="/scene1-message" element={<SceneMessageRouteShell />} />
      <Route path="/scene1-my" element={<SceneMyRouteShell />} />
      <Route path="/scene1" element={<SceneRouteShell />} />
      <Route path="/scene1-perimenopause" element={<ScenePerimenopauseRouteShell />} />
      <Route path="/scene2" element={<Scene2Page />} />
      <Route path="/scene3" element={<Scene3Page />} />
      <Route path="/record" element={<RecordLandingPage />} />
      <Route path="*" element={<Navigate to="/scene1" replace />} />
    </Routes>
  );
}
