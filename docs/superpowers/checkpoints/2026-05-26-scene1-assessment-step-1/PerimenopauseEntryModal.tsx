type PerimenopauseEntryModalProps = {
  open: boolean;
  onStart: () => void;
  onDismiss: () => void;
};

export function PerimenopauseEntryModal({
  open,
  onStart,
  onDismiss,
}: PerimenopauseEntryModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="scene1-assessment-backdrop" data-testid="scene1-entry-modal">
      <div className="scene1-entry-modal" role="dialog" aria-modal="true" aria-labelledby="scene1-entry-title">
        <div className="scene1-entry-hero" aria-hidden="true">
          <span className="scene1-entry-orb scene1-entry-orb-large" />
          <span className="scene1-entry-orb scene1-entry-orb-small" />
        </div>
        <div className="scene1-entry-body">
          <p className="scene1-entry-kicker">围绝经期评估</p>
          <h2 id="scene1-entry-title" className="scene1-entry-title">
            开启您的围绝经期健康评估
          </h2>
          <p className="scene1-entry-copy">
            只需 3-5 分钟，帮助您了解身体状态，并为后续健康管理提供更完整的参考依据。
          </p>

          <div className="scene1-entry-highlights" aria-hidden="true">
            <span>基础信息</span>
            <span>周期变化</span>
            <span>KMI 评估</span>
          </div>

          <div className="scene1-entry-feature-stack">
            <div className="scene1-entry-feature-card">
              <strong>健康参考</strong>
              <p>结果用于健康管理参考，不能替代临床诊断与正式治疗建议。</p>
            </div>
            <div className="scene1-entry-feature-card">
              <strong>隐私保护</strong>
              <p>评估内容仅用于当前流程分析，敏感信息以加密方式进行保护。</p>
            </div>
          </div>

          <div className="scene1-entry-disclaimer">
            <strong>评估说明</strong>
            <p>如果您近期有明显不适、异常出血或持续症状，请及时线下就医。</p>
          </div>

          <button type="button" className="scene1-entry-primary" onClick={onStart}>
            立即评估
          </button>
          <button type="button" className="scene1-entry-secondary" onClick={onDismiss}>
            稍后再说
          </button>
        </div>
      </div>
    </div>
  );
}
