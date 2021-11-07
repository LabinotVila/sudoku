import React from 'react';

type ModeProps = {
  mode: string,
  onClickMode: () => void
};

/**
 * React component for the Mistakes Mode / Fast Mode
 * elements in the Status Section.
 */
export const Mode = (props: ModeProps) => {
  return (
    <div className={props.mode === 'mistakes'
      ? "status__action-mistakes-mode"
      : props.mode === 'fast'
        ? "status__action-fast-mode"
        : "status__action-duplicates-mode"}>
      <label className={props.mode === 'mistakes'
        ? "status__action-mistakes-mode-switch"
        : props.mode === 'fast'
          ? "status__action-fast-mode-switch"
          : "status__action-duplicates-mode-switch"}>
        <input type="checkbox" />
        <span className={props.mode === 'mistakes'
          ? "status__action-mistakes-mode-slider"
          : props.mode === 'fast'
            ? "status__action-fast-mode-slider"
            : "status__action-duplicates-mode-slider"}
          onClick={props.onClickMode}
        ></span>
      </label>
      <p className="status__action-text">{props.mode === 'mistakes'
        ? 'Mistakes Mode'
        : props.mode === 'fast'
          ? 'Fast Mode' : 'Duplicates Mode'
      }</p>
    </div>
  )
}
