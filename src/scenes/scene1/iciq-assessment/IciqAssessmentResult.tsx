import { IciqAssessmentResultSummary } from './iciqAssessmentScoring';

type IciqAssessmentResultProps = {
  summary: IciqAssessmentResultSummary;
};

export function IciqAssessmentResult({ summary }: IciqAssessmentResultProps) {
  return (
    <div className="scene1-gad7-assessment-result-page">
      <section
        className="scene1-assessment-block scene1-gad7-assessment-result-card"
        data-testid="scene1-iciq-assessment-result-main-card"
      >
        <div className="scene1-gad7-assessment-result-card-head">
          <div>
            <span className={`scene1-assessment-result-badge-mini ${summary.tone}`}>
              {summary.levelLabel}
            </span>
            <h2>{summary.title}</h2>
            <strong className="scene1-gad7-assessment-result-insight">
              ICIQ 总分 {summary.score} 分
            </strong>
          </div>

          <div className="scene1-gad7-assessment-result-copy">
            <p>{summary.summary}</p>
          </div>
        </div>

        <div className="scene1-gad7-assessment-result-metrics">
          <div className="scene1-gad7-assessment-result-metric">
            <span>漏尿类型</span>
            <strong>{summary.leakageTypeLabel}</strong>
            <em>根据第 4 题场景判断</em>
          </div>
          <div className="scene1-gad7-assessment-result-metric">
            <span>干预优先级</span>
            <strong>{summary.urgentFlags.length}</strong>
            <em>{summary.urgentFlags.length > 0 ? '存在强化提示' : '先从基础训练入手'}</em>
          </div>
        </div>

        <div className="scene1-gad7-assessment-result-section">
          <h3>类型判断</h3>
          <div className="scene1-gad7-assessment-result-copy">
            <p>{summary.typeInsight}</p>
          </div>
        </div>

        {summary.retestFeedback ? (
          <div
            className="scene1-gad7-assessment-result-section"
            data-testid="scene1-iciq-assessment-result-retest"
          >
            <h3>复测反馈</h3>
            <div className="scene1-gad7-assessment-result-copy">
              <p>{`${summary.retestFeedback.label}：${summary.retestFeedback.summary}`}</p>
            </div>
          </div>
        ) : null}

        {summary.urgentFlags.length > 0 ? (
          <div className="scene1-gad7-assessment-result-section">
            <h3>强化提示</h3>
            <ul className="scene1-gad7-assessment-result-list">
              {summary.urgentFlags.map((item) => (
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
