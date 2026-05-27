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

function Scene1TabIcon({ type }: { type: Scene1BottomTabKey }) {
  if (type === 'home') {
    return (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <path
          d="M24.1362 8.49396C24.091 4.96332 18.2852 2.10714 13 2.10714C7.69396 2.10714 1.89286 4.98571 1.89286 8.53543L1.89286 10.3929C1.89286 15.4294 5.97392 19.5104 11.0104 19.5104C16.0469 19.5104 20.128 15.4294 20.128 10.3929L20.1278 8.49396ZM3.07807 8.51031C3.07807 5.62783 7.09514 3.29186 13 3.29186C18.9049 3.29186 22.9219 5.62783 22.9219 8.51031C22.9219 11.3927 18.9049 13.7287 13 13.7287C7.09514 13.7287 3.07807 11.3927 3.07807 8.51031ZM15.1834 4.99766C14.7281 4.46819 13.6341 4.25759 12.74 4.52744C11.846 4.79728 11.4907 5.44492 11.9461 5.97439L13.3583 7.64649C13.466 7.77382 13.6623 7.77382 13.7698 7.64649L15.1753 5.98198C15.4358 5.68443 15.4583 5.31939 15.1834 4.99766ZM18.9322 6.10573C19.7748 6.42132 20.0124 7.07283 19.4628 7.56061C19.1291 7.85704 18.5811 8.02498 18.0134 8.04056L15.1612 8.14257C14.9077 8.15161 14.7832 7.83746 14.9742 7.6707L16.4084 6.41734C16.9581 5.92942 18.0898 5.78958 18.9322 6.10573ZM4.9375 6.93103C4.98806 6.35081 5.84202 5.90596 6.8452 5.9375C7.45451 5.9567 7.97873 6.147 8.28508 6.42391L9.70851 7.67084C9.8995 7.8376 9.77504 8.15175 9.52153 8.14264L6.66333 8.04063C5.66008 8.00908 4.88694 7.51393 4.9375 6.93103ZM5.23033 9.46039C4.68069 9.94831 4.91828 10.5998 5.76085 10.9154C6.60343 11.2309 7.73514 11.0911 8.28478 10.6032L9.71894 9.34982C9.90993 9.18306 9.78547 8.86891 9.53196 8.87801L6.67973 8.98002C6.11206 8.99553 5.56403 9.16354 5.23033 9.46039ZM18.1548 11.0836C19.1579 11.1152 20.0118 10.6704 20.0624 10.0902C20.113 9.50994 19.3399 9.01479 18.3367 8.98324L15.4784 8.88124C15.2249 8.87214 15.1005 9.18629 15.2915 9.35306L16.7149 10.6C17.0213 10.8769 17.5455 11.0673 18.1548 11.0836ZM14.3893 12.4931C13.4952 12.7629 12.4013 12.5523 11.9461 12.0228C11.6696 11.7013 11.6921 11.3362 11.9526 11.0387L13.3583 9.37486C13.4659 9.24754 13.6622 9.24747 13.7698 9.37486L15.1834 11.0481C15.6388 11.5774 15.2835 12.2252 14.3893 12.4931Z"
          fill="currentColor"
          transform="translate(1.5 2.2)"
        />
      </svg>
    );
  }

  if (type === 'record') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4.75" y="5.25" width="14.5" height="14.5" rx="4.1" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8.25 3.9V7.05" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M15.75 3.9V7.05" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M5.65 9.2H18.35" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M9.55 15.45C9.55 13.57 10.77 12.35 12.65 12.35H13.55V16.55H9.55V15.45Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
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
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M5.2 7.2C5.2 5.98 6.18 5 7.4 5H16.6C17.82 5 18.8 5.98 18.8 7.2V15.8C18.8 17.02 17.82 18 16.6 18H7.4C6.18 18 5.2 17.02 5.2 15.8V7.2Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="M6.55 8.1L12 12.45L17.45 8.1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 5.1C8.52 5.1 5.7 7.83 5.7 11.18V18.25L7.68 17.05C8.82 18.5 10.52 19.3 12.35 19.3C15.83 19.3 18.65 16.57 18.65 13.22V11.18C18.65 7.83 15.7 5.1 12 5.1Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12.15" cy="10.85" r="2.45" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9.2 15.2C9.86 13.88 10.88 13.2 12.15 13.2C13.42 13.2 14.43 13.88 15.1 15.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
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
            if (item.key === 'me') {
              navigate('/scene1-my');
            }
          }}
        >
          <span className={item.key === 'home' ? 'scene1-tab-icon scene1-tab-icon-home' : 'scene1-tab-icon'}>
            <Scene1TabIcon type={item.key} />
          </span>
          <span className="scene1-tab-label">{item.label}</span>
          {item.showNotif ? <span className="scene1-tab-notif" data-testid="scene1-tab-notif" /> : null}
        </button>
      ))}
    </nav>
  );
}
