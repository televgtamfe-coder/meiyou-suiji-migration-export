import type { CSSProperties } from 'react';
import scene1MyPlaceholder from '../../assets/scene1-my-placeholder.png';
import modeActiveBackground from '../../assets/scene1-my/bg.png';
import memberBadge from '../../assets/scene1-my/e4409bd189e1f10cab6e3d2eb2bb64c8c2e26ea7.png';
import profileAvatar from '../../assets/scene1-my/Frame_2_184989.png';
import settingsIcon from '../../assets/scene1-my/Frame_2_184991.png';
import adFreeIcon from '../../assets/scene1-my/Boolean_operation_2_185028.png';
import widgetsIcon from '../../assets/scene1-my/Frame_2_185043.png';
import cycleIcon from '../../assets/scene1-my/Frame_2_184767.png';
import walletIcon from '../../assets/scene1-my/Frame_2_184789.png';
import profileIcon from '../../assets/scene1-my/Frame_367_70204.png';
import favoriteIcon from '../../assets/scene1-my/Group_367_67872.png';
import orderIcon from '../../assets/scene1-my/Union1.png';
import chevronIcon from '../../assets/scene1-my/Frame_367_68501.png';
import goldBeanIcon from '../../assets/scene1-my/Group_2_184783.png';
import askDoctorIcon from '../../assets/scene1-my/Frame_2_184801.png';
import sleepIcon from '../../assets/scene1-my/Frame_2_184810.png';
import calorieIcon from '../../assets/scene1-my/Frame_2_184817.png';
import calendarIcon from '../../assets/scene1-my/Frame_2_184899.png';
import subsidyIcon from '../../assets/scene1-my/Group_2_184892.png';
import serviceWidgetsIcon from '../../assets/scene1-my/Frame_2_184941.png';
import moreServiceIcon from '../../assets/scene1-my/Frame_2_184948.png';
import { Scene1BottomTabBar } from './components/Scene1BottomTabBar';
import { StatusBar } from './components/StatusBar';

const accountItems = [
  { label: '经期设置', note: '周期28天，经期5天', icon: cycleIcon },
  { label: '钱包', icon: walletIcon },
  { label: '个人主页', icon: profileIcon },
  { label: '收藏', icon: favoriteIcon },
  { label: '订单', icon: orderIcon }
];

const serviceItems = [
  { label: '赚金豆', icon: goldBeanIcon },
  { label: '领补贴', icon: subsidyIcon },
  { label: '问医生', icon: askDoctorIcon },
  { label: '检测睡眠', icon: sleepIcon },
  { label: '计算热量', icon: calorieIcon },
  { label: '记经期', icon: calendarIcon },
  {
    label: '桌面组件',
    icon: serviceWidgetsIcon,
    testId: 'scene1-my-service-icon-widgets',
    iconClassName: 'scene1-my-service-icon-widgets'
  },
  { label: '美柚会员', icon: memberBadge },
  { label: '钱包', icon: walletIcon },
  {
    label: '更多服务',
    icon: moreServiceIcon,
    iconClassName: 'scene1-my-service-icon-more'
  }
];

const modeItems = [
  {
    key: 'period',
    label: '经期模式',
    note: '当前',
    active: true,
    sprite: { x: 14, y: 175, width: 60, height: 43 }
  },
  {
    key: 'prepare',
    label: '备孕模式',
    note: '',
    active: false,
    sprite: { x: 101, y: 175, width: 60, height: 43 }
  },
  {
    key: 'pregnancy',
    label: '怀孕模式',
    note: '',
    active: false,
    sprite: { x: 189, y: 175, width: 60, height: 43 }
  },
  {
    key: 'parenting',
    label: '育儿模式',
    note: '',
    active: false,
    sprite: { x: 276, y: 175, width: 60, height: 43 }
  }
] as const;

export function Scene1MyPage() {
  return (
    <div className="scene1-my-page" data-testid="scene1-my-shell">
      <StatusBar />

      <div className="scene1-my-scroll">
        <div className="scene1-my-content">
          <header className="scene1-my-header" data-testid="scene1-my-header">
            <div className="scene1-my-profile">
              <img src={profileAvatar} alt="" className="scene1-my-avatar" />
              <div className="scene1-my-profile-copy">
                <button type="button" className="scene1-my-name">
                  <span>一颗小草莓</span>
                  <img src={chevronIcon} alt="" aria-hidden="true" className="scene1-my-inline-chevron" />
                </button>
              </div>
            </div>

            <button type="button" className="scene1-my-settings" aria-label="设置">
              <img src={settingsIcon} alt="" aria-hidden="true" />
            </button>
          </header>

          <section className="scene1-my-member-card" data-testid="scene1-my-member-card">
            <div className="scene1-my-member-row">
              <div className="scene1-my-member-title">
                <img src={memberBadge} alt="" aria-hidden="true" className="scene1-my-member-badge" />
                <span>美柚会员</span>
              </div>
              <button type="button" className="scene1-my-member-cta">
                立即开通
              </button>
            </div>

            <div className="scene1-my-member-features">
              <div className="scene1-my-member-feature">
                <img src={adFreeIcon} alt="" aria-hidden="true" />
                <span>恢复免广告</span>
              </div>
              <div className="scene1-my-member-feature">
                <img
                  src={widgetsIcon}
                  alt=""
                  aria-hidden="true"
                  data-testid="scene1-my-member-widgets-icon"
                  className="scene1-my-member-feature-icon-widgets"
                />
                <span>全部桌面小组件</span>
              </div>
            </div>
          </section>

          <section className="scene1-my-mode-card" data-testid="scene1-my-mode-card">
            <div className="scene1-my-mode-strip">
              <div className="scene1-my-mode-surface" aria-hidden="true" />
              <div className="scene1-my-mode-surface-bottom" aria-hidden="true" />
              <div className="scene1-my-mode-divider scene1-my-mode-divider-left" aria-hidden="true" />
              <div className="scene1-my-mode-divider scene1-my-mode-divider-right" aria-hidden="true" />

              {modeItems.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={item.active ? 'scene1-my-mode-item active' : 'scene1-my-mode-item'}
                  data-testid={`scene1-my-mode-item-${item.key}`}
                >
                  {item.active ? (
                    <img
                      src={modeActiveBackground}
                      alt=""
                      aria-hidden="true"
                      className="scene1-my-mode-active-background"
                    />
                  ) : null}
                  <span className="scene1-my-mode-icon-frame">
                    <span
                      className="scene1-my-mode-sprite"
                      data-testid="scene1-my-mode-sprite"
                      aria-hidden="true"
                      style={
                        {
                          '--scene1-mode-sprite-x': `${item.sprite.x}px`,
                          '--scene1-mode-sprite-y': `${item.sprite.y}px`,
                          '--scene1-mode-sprite-width': `${item.sprite.width}px`,
                          '--scene1-mode-sprite-height': `${item.sprite.height}px`
                        } as CSSProperties
                      }
                    >
                      <img src={scene1MyPlaceholder} alt="" className="scene1-my-mode-sprite-image" />
                    </span>
                  </span>
                  <span className="scene1-my-mode-label">{item.label}</span>
                  <span className="scene1-my-mode-note">{item.note}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="scene1-my-list-card" data-testid="scene1-my-list-card">
            {accountItems.map((item, index) => (
              <button key={item.label} type="button" className="scene1-my-list-item">
                <span className="scene1-my-list-leading">
                  <img src={item.icon} alt="" aria-hidden="true" className="scene1-my-list-icon" />
                </span>
                <span className="scene1-my-list-copy">
                  <span className="scene1-my-list-label">{item.label}</span>
                  {item.note ? <span className="scene1-my-list-note">{item.note}</span> : null}
                </span>
                <img src={chevronIcon} alt="" aria-hidden="true" className="scene1-my-list-chevron" />
                {index < accountItems.length - 1 ? <span className="scene1-my-list-divider" aria-hidden="true" /> : null}
              </button>
            ))}
          </section>

          <section className="scene1-my-service-card" data-testid="scene1-my-service-card">
            <h2>服务</h2>
            <div className="scene1-my-service-grid">
              {serviceItems.map((item) => (
                <button key={item.label} type="button" className="scene1-my-service-item">
                  <span className="scene1-my-service-icon-wrap">
                    <img
                      src={item.icon}
                      alt=""
                      aria-hidden="true"
                      data-testid={item.testId}
                      className={item.iconClassName ? `scene1-my-service-icon ${item.iconClassName}` : 'scene1-my-service-icon'}
                    />
                  </span>
                  <span className="scene1-my-service-label">{item.label}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Scene1BottomTabBar activeTab="me" className="scene1-my-tabbar" />
      <div className="scene1-home-indicator" aria-hidden="true" />
    </div>
  );
}
