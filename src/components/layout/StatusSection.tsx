import { Numbers } from '../Numbers';
import { Action } from '../Action';
import { Button } from '@material-ui/core';

type StatusSectionProps = {
  onClickNumber: (number: string) => void,
  onClickUndo: () => void,
  onClickErase: () => void,
  onClickHint: () => void,
  onClickNewGame: () => void,
  onClickNote: () => void,
  notesMode: boolean
};

export const StatusSection = (props: StatusSectionProps) => {
  return (
    <section className="right-content">
      <Button className="new-game-button" color={"secondary"} variant={"contained"} onClick={props.onClickNewGame}>New Game</Button>
      <Numbers onClickNumber={(number) => props.onClickNumber(number)} />
      <div className="actions">
        <Action action='undo' onClickAction={props.onClickUndo} />
        <Action action='erase' onClickAction={props.onClickErase} />
        <Action action='notes' onClickAction={props.onClickNote} />
        <Action action='hint' onClickAction={props.onClickHint} />
      </div>
    </section>
  )
}
