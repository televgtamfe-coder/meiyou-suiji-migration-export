import { BoneAssessmentResultSummary } from './boneAssessmentScoring';

type BoneAssessmentResultProps = {
  summary: BoneAssessmentResultSummary;
};

export function BoneAssessmentResult({ summary }: BoneAssessmentResultProps) {
  return (
    <div className="scene1-bone-assessment-result-page">
      <section
        className="scene1-assessment-block scene1-bone-assessment-result-card"
        data-testid="scene1-bone-assessment-result-main-card"
      >
        <div className="scene1-bone-assessment-result-card-head">
          <div>
            <span className={`scene1-assessment-result-badge-mini ${summary.mainResult.tone}`}>
              {summary.mainResult.label}
            </span>
            <h2>{summary.mainResult.title}</h2>
            <strong className="scene1-bone-assessment-result-insight">{summary.mainResult.insightTitle}</strong>
          </div>
          <div className="scene1-bone-assessment-result-copy">
            <p>{summary.mainResult.summary}</p>
            <p className="scene1-bone-assessment-result-action">{summary.mainResult.actionLabel}</p>
          </div>
        </div>

        <div className="scene1-bone-assessment-result-metrics">
          <div className="scene1-bone-assessment-result-metric">
            <span>OSTA 指数</span>
            <strong>{summary.osta.index.toFixed(1)}</strong>
            <em>{summary.osta.label}</em>
          </div>
          <div className="scene1-bone-assessment-result-metric">
            <span>IOF 阳性项</span>
            <strong>{summary.iof.positiveCount}</strong>
            <em>{summary.iof.label}</em>
          </div>
          {summary.derived.bmi !== null ? (
            <div className="scene1-bone-assessment-result-metric">
              <span>BMI</span>
              <strong>{summary.derived.bmi.toFixed(1)}</strong>
              <em>
                {summary.derived.bmiBelow19
                  ? 'BMI 偏低'
                  : summary.derived.bmiAbove28
                    ? 'BMI 偏高'
                    : 'BMI 参考范围内'}
              </em>
            </div>
          ) : null}
        </div>

        {summary.iof.keyAlertDetails.length > 0 ? (
          <div className="scene1-bone-assessment-result-section">
            <h3>重点提醒</h3>
            <ul className="scene1-bone-assessment-result-list">
              {summary.iof.keyAlertDetails.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      <section
        className="scene1-assessment-block scene1-bone-assessment-result-card scene1-bone-assessment-result-card-secondary"
        data-testid="scene1-bone-assessment-result-vitamin-d-card"
      >
        <div className="scene1-bone-assessment-result-card-head">
          <div>
            <span
              className={`scene1-assessment-result-badge-mini ${
                summary.vitaminD.level === 'high'
                  ? 'orange'
                  : summary.vitaminD.level === 'medium'
                    ? 'pink'
                    : 'green'
              }`}
            >
              {summary.vitaminD.label}
            </span>
            <h2>维生素D风险</h2>
          </div>
          <div className="scene1-bone-assessment-result-copy">
            <p>{summary.vitaminD.summary}</p>
          </div>
        </div>

        <div className="scene1-bone-assessment-result-section">
          <h3>结果解读</h3>
          <div className="scene1-bone-assessment-result-copy">
            <p>{summary.vitaminD.detail}</p>
            <p>{summary.vitaminD.groupSummary}</p>
          </div>
        </div>

        {summary.vitaminD.keyFactors.length > 0 ? (
          <div className="scene1-bone-assessment-result-section">
            <h3>命中因素</h3>
            <ul className="scene1-bone-assessment-result-list">
              {summary.vitaminD.keyFactors.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {summary.vitaminD.improvementTips.length > 0 ? (
          <div className="scene1-bone-assessment-result-section">
            <h3>建议关注</h3>
            <ul className="scene1-bone-assessment-result-list">
              {summary.vitaminD.improvementTips.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="scene1-bone-assessment-result-section">
          <h3>结果说明</h3>
          <div className="scene1-bone-assessment-result-copy">
            <p>{summary.vitaminD.disclaimer}</p>
          </div>
        </div>
      </section>

      <div className="scene1-assessment-footnote scene1-bone-assessment-result-note">
        <strong className="scene1-assessment-footnote-title">结果说明</strong>
        <p className="scene1-assessment-footnote-body">{summary.mainResult.note}</p>
      </div>
    </div>
  );
}
