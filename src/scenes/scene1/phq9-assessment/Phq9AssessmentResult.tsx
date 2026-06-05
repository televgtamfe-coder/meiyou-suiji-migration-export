import { Phq9AssessmentResultSummary } from './phq9AssessmentScoring';

type Phq9AssessmentResultProps = {
  summary: Phq9AssessmentResultSummary;
};

export function Phq9AssessmentResult({ summary }: Phq9AssessmentResultProps) {
  return (
    <div className="scene1-phq9-assessment-result-page">
      <section
        className="scene1-assessment-block scene1-phq9-assessment-result-card"
        data-testid="scene1-phq9-assessment-result-main-card"
      >
        <div className="scene1-phq9-assessment-result-card-head">
          <div>
            <span className={`scene1-assessment-result-badge-mini ${summary.tone}`}>
              {summary.levelLabel}
            </span>
            <h2>{summary.title}</h2>
            <strong className="scene1-phq9-assessment-result-insight">
              PHQ-9 总分 {summary.score} 分
            </strong>
          </div>

          <div className="scene1-phq9-assessment-result-copy">
            <p>{summary.summary}</p>
          </div>
        </div>

        <div className="scene1-phq9-assessment-result-metrics">
          <div className="scene1-phq9-assessment-result-metric">
            <span>PHQ-9总分</span>
            <strong>{summary.score}</strong>
            <em>{summary.needsReferral ? '≥10 分，建议积极转介' : '当前症状负担较低'}</em>
          </div>
          <div className="scene1-phq9-assessment-result-metric">
            <span>重点提示</span>
            <strong>{summary.personalizedFeedback.length}</strong>
            <em>{summary.personalizedFeedback.length > 0 ? '已识别重点变化' : '暂无额外提醒'}</em>
          </div>
        </div>

        {summary.highRiskAlert ? (
          <div className="scene1-phq9-assessment-result-risk">
            <h3>高风险提醒</h3>
            <p>{summary.highRiskAlert}</p>
          </div>
        ) : null}

        {summary.personalizedFeedback.length > 0 ? (
          <div className="scene1-phq9-assessment-result-section">
            <h3>重点变化</h3>
            <ul className="scene1-phq9-assessment-result-list">
              {summary.personalizedFeedback.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="scene1-phq9-assessment-result-section">
          <h3>建议方向</h3>
          <div className="scene1-phq9-assessment-result-copy">
            <p>{summary.advice}</p>
          </div>
        </div>

        <div className="scene1-phq9-assessment-result-section">
          <h3>说明</h3>
          <div className="scene1-phq9-assessment-result-copy">
            <p>{summary.disclaimer}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
