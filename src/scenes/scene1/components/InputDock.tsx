type InputDockProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
};

export function InputDock({ value, onChange, onSend }: InputDockProps) {
  return (
    <div className="input-wrap">
      <div className="input-bar">
        <div className="ib-input">
          <textarea
            aria-label="记录输入"
            placeholder="记录今天的感受"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <button className="ib-send on" type="button" aria-label="发送" onClick={onSend}>
          发
        </button>
      </div>
    </div>
  );
}
