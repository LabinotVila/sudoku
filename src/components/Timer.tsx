import useTimer from '../utils/useTimer';
import { formatTime } from '../utils/formatTime'
import { useSudokuContext } from '../context/SudokuContext';
import { useEffect } from 'react';
import { ReactComponent as PauseButton } from '../svg/pause_button.svg'
import { ReactComponent as PlayButton } from '../svg/play_button.svg'
import { GameInfoStaticText } from '../styles';
import { ButtonBase } from '@material-ui/core';

type TimerProps = {
  key: number
}

/**
 * React component for the Timer in Status Section.
 * Uses the 'useEffect' hook to update the timer every minute.
 */
export const Timer = (props: TimerProps) => {
  const { timer, isPaused, handleStart, handlePause, handleResume } = useTimer(0);

  let { timerMode, gamePaused, setGamePaused, won, setEndGameTimer } = useSudokuContext();

  useEffect(() => {
    if (gamePaused && !isPaused) {
      handlePause();
    } else if (!gamePaused && isPaused) {
      handleResume();
    }
    // eslint-disable-next-line
  }, [gamePaused]);

  useEffect(() => {
    if (won === 1) {
      setEndGameTimer(timer);
    }
    // eslint-disable-next-line
  }, [won])

  // eslint-disable-next-line
  useEffect(() => {
    if (!timerMode && !isPaused) {
      handlePause();
    } else if (timerMode && isPaused) {
      handleResume();
    } else if (timerMode && !isPaused) {
      handleStart();
    }
    // eslint-disable-next-line
  }, [props.key, timerMode])

  const triggerPause = () => setGamePaused(true);
  const triggerResume = () => setGamePaused(false);

  return (
    <div className="time" style={timerMode ? { display: "flex" } : { display: "none" }}>
      <ButtonBase  className="icon" onClick={isPaused ? triggerResume : triggerPause}>{isPaused ? <PlayButton /> : <PauseButton />}</ButtonBase>
      <GameInfoStaticText className="text">{formatTime(timer)}</GameInfoStaticText>
    </div>
  )
}