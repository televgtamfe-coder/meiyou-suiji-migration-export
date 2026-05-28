import tabHomeActive from '../../../assets/scene1-tabbar/tab-home-active.png';
import tabRecord from '../../../assets/scene1-tabbar/tab-record.png';
import tabMe from '../../../assets/scene1-tabbar/tab-me.png';
import { useNavigate } from 'react-router-dom';

type Scene1BottomTabKey = 'home' | 'record' | 'feed' | 'message' | 'me';

type Scene1BottomTabBarProps = {
  activeTab: Scene1BottomTabKey;
  className?: string;
};

type Scene1BottomTabItem = {
  key: Scene1BottomTabKey;
  label: string;
  showNotif?: boolean;
};

const bottomTabItems: Scene1BottomTabItem[] = [
  { key: 'home', label: '首页' },
  { key: 'record', label: '记录' },
  { key: 'feed', label: '点滴' },
  { key: 'message', label: '消息' },
  { key: 'me', label: '我的', showNotif: true },
];

function Scene1TabIcon({ type, active }: { type: Scene1BottomTabKey; active: boolean }) {
  if (type === 'home') {
    return (
      <img
        src={tabHomeActive}
        alt=""
        aria-hidden="true"
        className={active ? 'scene1-tab-artwork scene1-tab-artwork-home' : 'scene1-tab-artwork scene1-tab-artwork-home scene1-tab-artwork-home-inactive'}
      />
    );
  }

  if (type === 'record') {
    return (
      <img
        src={tabRecord}
        alt=""
        aria-hidden="true"
        className={active ? 'scene1-tab-artwork scene1-tab-artwork-pinkable' : 'scene1-tab-artwork'}
      />
    );
  }

  if (type === 'feed') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="8.2" y="4.5" width="7.6" height="10.4" rx="3.8" stroke="currentColor" strokeWidth="1.6" />
        <path d="M6.5 10.5a5.5 5.5 0 0 0 11 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 16v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M9.5 19.5h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'message') {
    return (
      <span className="scene1-tab-message-icon" aria-hidden="true">
        <span className="scene1-tab-message-box" />
        <span className="scene1-tab-message-flap scene1-tab-message-flap-left" />
        <span className="scene1-tab-message-flap scene1-tab-message-flap-right" />
      </span>
    );
  }

  return (
    <img
      src={tabMe}
      alt=""
      aria-hidden="true"
      className={active ? 'scene1-tab-artwork scene1-tab-artwork-pinkable' : 'scene1-tab-artwork'}
    />
  );
}

export function Scene1BottomTabBar({ activeTab, className }: Scene1BottomTabBarProps) {
  const navigate = useNavigate();
  const navClassName = className ? `scene1-tabbar prototype-tabbar ${className}` : 'scene1-tabbar prototype-tabbar';

  return (
    <nav className={navClassName} data-testid="scene1-tabbar" aria-label="底部导航">
      {bottomTabItems.map((item) => (
        <button
          key={item.key}
          type="button"
          data-testid={item.key === 'home' ? 'scene1-tab-home' : item.key === 'record' ? 'scene1-tab-record' : undefined}
          className={item.key === activeTab ? 'scene1-tab active' : 'scene1-tab'}
          onClick={() => {
            if (item.key === 'home') {
              navigate('/scene1-home');
            }
            if (item.key === 'record') {
              navigate('/scene1');
            }
            if (item.key === 'feed') {
              navigate('/scene2');
            }
            if (item.key === 'message') {
              navigate('/scene1-message');
            }
            if (item.key === 'me') {
              navigate('/scene1-my');
            }
          }}
        >
          <span className={item.key === 'home' ? 'scene1-tab-icon scene1-tab-icon-home' : 'scene1-tab-icon'}>
            <Scene1TabIcon type={item.key} active={item.key === activeTab} />
          </span>
          <span className="scene1-tab-label">{item.label}</span>
          {item.showNotif ? <span className="scene1-tab-notif" data-testid="scene1-tab-notif" /> : null}
        </button>
      ))}
    </nav>
  );
}
