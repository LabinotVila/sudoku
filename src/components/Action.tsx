import { ReactComponent as UndoIcon } from '../svg/undo.svg'
import { ReactComponent as HintsIcon } from '../svg/hints.svg'
import { ReactComponent as EraseIcon } from '../svg/erase.svg'
import { ReactComponent as NotesIcon } from '../svg/notes.svg'

import { ReactComponent as NotesOn } from '../svg/notesOn.svg'
import { ReactComponent as NotesOff } from '../svg/notesOff.svg'

import { useSudokuContext } from '../context/SudokuContext';
import { StatusActionText } from '../styles'

type ActionProps = {
  action: string,
  onClickAction: () => void
};

type SvgProps = {
  action: string
};

type NotesSvgProps = {
  action: string,
  state: boolean
}

const Svg = (props: SvgProps) => {
  if (props.action === 'undo') {
    return (
      <UndoIcon className="icon undo-icon" />
    )
  } else if (props.action === 'erase') {
    return (
      <EraseIcon className="icon" />
    )
  } else if (props.action === 'notes') {
    return (
      <NotesIcon className="icon" />
    )
  } else if (props.action === 'hint') {
    return (
      <HintsIcon className="icon" />
    )
  } else {
    return null;
  }
}

const NotesSvg = (props: NotesSvgProps) => {
  return (
    <div style={{ position: "relative" }}>
      <NotesIcon className="icon" />
      {props.state ? <NotesOn className="notes-icon" /> : <NotesOff className="notes-icon" />}
    </div>
  )
}

/**
 * React component for the Action buttons in the Status Section.
 */
export const Action = (props: ActionProps) => {
  let { notesMode } = useSudokuContext();


  return (
    <div onClick={props.onClickAction} >
      {props.action === 'notes' ? <NotesSvg action={props.action} state={notesMode} /> : <Svg action={props.action} />}
      <StatusActionText>
        {
          props.action === 'undo'
            ? 'Undo'
            : props.action === 'erase'
              ? 'Erase'
              : props.action === 'hint'
                ? 'Hints'
                : props.action === 'notes'
                  ? 'Notes' : ''
        }</StatusActionText>
    </div>
  )
}
