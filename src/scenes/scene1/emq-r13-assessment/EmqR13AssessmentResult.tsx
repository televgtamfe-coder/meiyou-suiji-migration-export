import { EmqR13AssessmentResultSummary } from './emqR13AssessmentScoring';

type EmqR13AssessmentResultProps = {
  summary: EmqR13AssessmentResultSummary;
};

export function EmqR13AssessmentResult({ summary }: EmqR13AssessmentResultProps) {
  return (
    <div className="scene1-gad7-assessment-result-page">
      <section
        className="scene1-assessment-block scene1-gad7-assessment-result-card"
        data-testid="scene1-emq-r13-assessment-result-main-card"
      >
        <div className="scene1-gad7-assessment-result-card-head">
          <div>
            <span className={`scene1-assessment-result-badge-mini ${summary.tone}`}>
              {summary.levelLabel}
            </span>
            <h2>{summary.title}</h2>
            <strong className="scene1-gad7-assessment-result-insight">EMQ-R13 总分 {summary.score} 分</strong>
          </div>

          <div className="scene1-gad7-assessment-result-copy">
            <p>{summary.summary}</p>
          </div>
        </div>

        <div className="scene1-gad7-assessment-result-metrics">
          <div className="scene1-gad7-assessment-result-metric">
            <span>记忆提取</span>
            <strong>{summary.retrievalScore}</strong>
            <em>{summary.retrievalScore >= 13 ? '已达到项目关注阈值' : '当前未达关注阈值'}</em>
          </div>
          <div className="scene1-gad7-assessment-result-metric">
            <span>注意追踪</span>
            <strong>{summary.attentionalTrackingScore}</strong>
            <em>{summary.attentionalTrackingScore >= 7 ? '已达到项目关注阈值' : '当前未达关注阈值'}</em>
          </div>
        </div>

        {summary.personalizedFeedback.length > 0 ? (
          <div className="scene1-gad7-assessment-result-section">
            <h3>重点变化</h3>
            <ul className="scene1-gad7-assessment-result-list">
              {summary.personalizedFeedback.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="scene1-gad7-assessment-result-section">
          <h3>建议方向</h3>
          <div className="scene1-gad7-assessment-result-copy">
            <p>{summary.advice}</p>
          </div>
        </div>

        <div className="scene1-gad7-assessment-result-section">
          <h3>说明</h3>
          <div className="scene1-gad7-assessment-result-copy">
            <p>{summary.disclaimer}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
