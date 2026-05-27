export function Scene3Page() {
  return (
    <div className="app-root">
      <div className="phone-shell scene3-shell" data-testid="scene3-shell">
        <div className="statusbar">
          <span>9:41</span>
          <div className="sb-r">
            <span className="sb-bars"><i></i><i></i><i></i><i></i></span>
            <div className="sb-batt"><i></i></div>
          </div>
        </div>

        <div className="scene3-page">
          <div className="scene3-head">
            <div>
              <h1 className="scene3-title">记录</h1>
              <p className="scene3-sub">情绪 · 身体 · 体重</p>
            </div>
            <div className="scene3-actions">
              <button type="button" className="scene3-icon-btn" aria-label="日历">📅</button>
              <button type="button" className="scene3-icon-btn" aria-label="搜索">🔍</button>
            </div>
          </div>

          <div className="scene3-placeholder" aria-label="记录页空态">
            <div className="scene3-placeholder-icon" aria-hidden="true">📝</div>
            <p className="scene3-placeholder-title">还没有记录</p>
            <p className="scene3-placeholder-desc">说句话，或点下方按钮开始第一次记录</p>
          </div>

          <div className="scene3-dock">
            <button type="button" className="scene3-dock-btn">开始记录</button>
          </div>
        </div>
      </div>
    </div>
  );
}
