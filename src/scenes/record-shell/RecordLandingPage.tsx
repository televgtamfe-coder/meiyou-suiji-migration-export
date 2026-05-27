import { useNavigate } from 'react-router-dom';
import { StatusBar } from '../scene1/components/StatusBar';

const summaryRows = [
  { label: '记录类型', value: '经期开始' },
  { label: '记录时间', value: '今天 09:41' },
  { label: '自动标签', value: '经期 / 腹痛' },
];

const insightRows = [
  '经期记录已同步到周期分析',
  '本条记录会作为当前周期的起始线索保留',
  '后续可继续补充经量、情绪与身体感受',
];

export function RecordLandingPage() {
  const navigate = useNavigate();

  return (
    <div className="app-root">
      <div className="phone-shell record-page-shell">
        <StatusBar />
        <div className="record-page-nav">
          <button type="button" className="record-page-back" aria-label="返回记录首页" onClick={() => navigate('/scene1')}>
            返回
          </button>
          <h1 className="record-page-title">记录详情</h1>
          <span className="record-page-mode">经期</span>
        </div>

        <div className="record-page-body">
          <section className="record-hero-card">
            <p className="record-hero-caption">经期记录已同步到周期分析</p>
            <div className="record-hero-main">
              <div>
                <h2>今天的记录摘要</h2>
                <p>本次记录已沉淀为当前周期的起点，你可以继续补充身体感受与经量变化。</p>
              </div>
              <div className="record-hero-pill">经期开始</div>
            </div>
          </section>

          <section className="record-card">
            <div className="record-card-head">
              <h3>记录详情</h3>
            </div>
            <div className="record-detail-list">
              {summaryRows.map((row) => (
                <div key={row.label} className="record-detail-row">
                  <span className="record-detail-label">{row.label}</span>
                  <span className="record-detail-value">{row.value}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="record-card">
            <div className="record-card-head">
              <h3>AI 提示</h3>
            </div>
            <ul className="record-insight-list">
              {insightRows.map((row) => (
                <li key={row}>{row}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
