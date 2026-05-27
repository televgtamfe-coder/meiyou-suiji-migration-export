type SceneControlsProps = {
  onShowAnalysis: () => void;
};

export function SceneControls({ onShowAnalysis }: SceneControlsProps) {
  if (!import.meta.env.DEV) return null;

  return (
    <div style={{ position: 'fixed', right: 16, bottom: 16, zIndex: 9999 }}>
      <button type="button" onClick={onShowAnalysis} aria-label="显示分析提示">
        显示分析提示
      </button>
    </div>
  );
}
