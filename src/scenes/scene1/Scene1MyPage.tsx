import scene1MyPlaceholder from '../../assets/scene1-my-placeholder.png';
import { Scene1BottomTabBar } from './components/Scene1BottomTabBar';
import { StatusBar } from './components/StatusBar';

export function Scene1MyPage() {
  return (
    <div className="scene1-my-page" data-testid="scene1-my-shell">
      <StatusBar />

      <div className="scene1-my-scroll">
        <div className="scene1-my-placeholder-wrap">
          <img
            src={scene1MyPlaceholder}
            alt="我的页面占位预览"
            className="scene1-my-placeholder"
            data-testid="scene1-my-placeholder"
          />
        </div>
      </div>

      <Scene1BottomTabBar activeTab="me" className="scene1-my-tabbar" />
      <div className="scene1-home-indicator" aria-hidden="true" />
    </div>
  );
}
