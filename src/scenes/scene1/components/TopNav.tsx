export function TopNav({ title = '记录' }: { title?: string }) {
  return (
    <div className="nav">
      <div className="nav-title">{title}</div>
      <div className="nav-actions">
        <div className="nav-icon">搜</div>
        <div className="nav-icon">历</div>
      </div>
    </div>
  );
}
