import { useSudokuContext } from '../../context/SudokuContext';
import { ReactComponent as Celebration } from '../../svg/celebration.svg'
import { ReactComponent as Sparks } from '../..//svg/sparks.svg'
import { ReactComponent as StopWatch } from '../../svg/stopwatch.svg'
import { formatTime } from '../../utils/formatTime';
import { Button } from '@material-ui/core';

type GameOverProps = {
  overlay: boolean,
  onClickOverlay: () => void
}

export default function GameOver(props: GameOverProps) {
  let { endGameTimer, won } = useSudokuContext();

  return (

    <div className={props.overlay
      ? "overlay overlay--visible"
      : "overlay"
    }
    >
      <div className="sparks" style={won === 1 ? { display: 'inline' } : { display: 'none' }}>
        <Sparks />
      </div>
      <div className="celebration" style={won === 1 ? { display: 'flex' } : { display: 'none' }}>
        <Celebration />
        <Celebration className="right" />
      </div>
      <div className="container">
        <div className="text">{won === 1 ? 'Winner' : 'Game Over'}</div>
        <div className="time" style={won === 1 ? { display: 'flex' } : { display: 'none' }}>
          <div className="logo"><StopWatch /></div>
          <div className="text">{formatTime(endGameTimer)}</div>
        </div>
        <Button className="new-game-button" color="secondary" variant="contained" onClick={props.onClickOverlay}>New Game</Button>
      </div>
    </div>
  )
}