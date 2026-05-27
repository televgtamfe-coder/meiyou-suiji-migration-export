type FloatingAnalysisNoticeProps = {
  show: boolean;
  text: string;
  onOpen: () => void;
};

export function FloatingAnalysisNotice({ show, text, onOpen }: FloatingAnalysisNoticeProps) {
  if (!show) return null;

  return (
    <div className="proto-notice-wrap">
      <div className="proto-notice-card">
        <button type="button" className="proto-notice-close" aria-label="关闭提示">×</button>
        <p className="proto-notice-text">{text}</p>
        <button type="button" className="proto-notice-link" aria-label="查看分析" onClick={onOpen}>
          查看分析
        </button>
      </div>
    </div>
  );
}
