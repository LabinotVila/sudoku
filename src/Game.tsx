import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { GameSection } from './components/layout/GameSection';
import { StatusSection } from './components/layout/StatusSection';
import { Footer } from './components/layout/Footer';
import { getUniqueSudoku } from './solver/UniqueSudoku';
import { useSudokuContext } from './context/SudokuContext';
import { Difficulty } from './components/Difficulty';
import { Timer } from './components/Timer';
import HowToPlay from './components/layout/HowToPlay';
import Mistakes from './components/Mistakes';
import GameOver from './components/layout/GameOver';
import useKey from './utils/keyHandler'

type GameProps = {
  switchTheme: (theme: string) => void,
  currentTheme: string
}

export const Game: React.FC<GameProps> = (props: GameProps) => {
  let { setNumberSelected,
    gameArray, setGameArray,
    difficulty, setDifficulty,
    gamePaused,
    cellSelected, setCellSelected,
    initArray, setInitArray,
    mistakesMode,
    mistakesNumber, setMistakesNumber,
    notesMode, setNotesMode,
    notes, setNotes,
    setTimerMode,
    setWon } = useSudokuContext();
  let [history, setHistory] = useState<string[][]>([]);
  let [solvedArray, setSolvedArray] = useState<string[]>([]);
  let [overlay, setOverlay] = useState<boolean>(false);
  let [timerKey, setTimerKey] = useState<number>(0);

  function _createNewGame(e?: React.ChangeEvent<HTMLSelectElement>) {
    let [temporaryInitArray, temporarySolvedArray] = getUniqueSudoku(difficulty, e);

    let tempNotes: number[][] = Array(81).fill(0).map(row => new Array(9).fill(0))

    setNotes(tempNotes);
    setInitArray(temporaryInitArray);
    setGameArray(temporaryInitArray);
    setSolvedArray(temporarySolvedArray);
    setNumberSelected('0');
    setTimerMode(true);
    setTimerKey(Math.random())
    setMistakesNumber(3);
    setCellSelected(-1);
    setHistory([]);
    setWon(0);
    setNotesMode(false);
  }

  function _isSolved(index: number, value: string) {
    if (gameArray.every((cell: string, cellIndex: number) => {
      if (cellIndex === index)
        return value === solvedArray[cellIndex];
      else
        return cell === solvedArray[cellIndex];
    })) {
      return true;
    }
    return false;
  }

  function _endGame(state: number) {
    setOverlay(true);
    setWon(state);
    setTimerMode(false);
  }

  function _fillCell(index: number, value: string, fillingNote = false) {
    if (fillingNote) {
      let temp = notes.slice();
      let currentRowIndex = Number(value) - 1;

      temp[index][currentRowIndex] = temp[index][currentRowIndex] === 1 ? 0 : 1;
      setNotes(temp);

      return;
    }

    if (initArray[index] === '0') {
      // Direct copy results in interesting set of problems, investigate more!
      let tempArray = gameArray.slice();
      let tempHistory = history.slice();
      let tempNotes = notes.slice();
      tempNotes[index] = new Array(9).fill(0);
      setNotes(tempNotes);

      tempHistory.push(gameArray.slice());
      setHistory(tempHistory);

      tempArray[index] = value;
      setGameArray(tempArray);

      if (_isSolved(index, value)) {
        _endGame(1);
      }
    }
  }

  function _userFillCell(index: number, value: string) {
    if (notesMode) {
      _fillCell(index, value, true);

      return;
    }

    if (value !== solvedArray[index]) {
      if (mistakesMode) {
        setMistakesNumber(mistakesNumber - 1);
      }
    }

    _fillCell(index, value);
  }

  function onClickNewGame() {
    if (gamePaused) return;

    _createNewGame();
  }

  function onClickCell(indexOfArray: number) {
    if (gamePaused || mistakesNumber === 0) return;

    setCellSelected(indexOfArray);
  }

  function onChangeDifficulty(e: React.ChangeEvent<HTMLSelectElement>) {
    setDifficulty(e.target.value);
    _createNewGame(e);
  }

  const onClickNumber = (number: string) => {
    if (initArray[cellSelected] === '0' && gameArray[cellSelected] === number) {
      onClickErase();
      return;
    }

    if (gameArray[cellSelected] !== '0') return;

    _userFillCell(cellSelected, number);
  }

  function onClickUndo() {
    if (gamePaused) return;

    if (history.length) {
      let tempHistory = history.slice();
      let tempArray = tempHistory.pop();
      setHistory(tempHistory);
      if (tempArray !== undefined)
        setGameArray(tempArray);
    }
  }

  function onClickNote() {
    if (gamePaused) return;

    setNotesMode(!notesMode);
    setNumberSelected('-1');
  }

  function onClickErase() {
    if (gamePaused) return;

    if (cellSelected !== -1 && gameArray[cellSelected] !== '0') {
      _fillCell(cellSelected, '0');
    }
  }

  function onClickHint() {
    if (gamePaused) return;

    let emptyIndexes = [];
    for (let i = 0; i < gameArray.length; i++) {
      if (gameArray[i] === '0') emptyIndexes.push(i);
    }

    let randomCell = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    _fillCell(randomCell, solvedArray[randomCell]);
  }

  function onClickOverlay() {
    setOverlay(false);
    _createNewGame();
  }

  useEffect(() => {
    _createNewGame();
    // eslint-disable-next-line
  }, []);

  // 49 === 1
  // 50 === 2


  useEffect(() => {
    if (mistakesNumber === 0) {
      _endGame(-1);
    }
    // eslint-disable-next-line
  }, [mistakesNumber])

  useKey(49, () => onClickNumber('1'));
  useKey(50, () => onClickNumber('2'));
  useKey(51, () => onClickNumber('3'));
  useKey(52, () => onClickNumber('4'));
  useKey(53, () => onClickNumber('5'));
  useKey(54, () => onClickNumber('6'));
  useKey(55, () => onClickNumber('7'));
  useKey(56, () => onClickNumber('8'));
  useKey(57, () => onClickNumber('9'));

  useKey(78, () => setNotesMode(!notesMode)); // N and n
  useKey(68, onClickErase); // D and d
  useKey(85, onClickUndo); // U and u
  useKey(72, onClickHint); // H and h

  function navigateCellLeft() {
    if (cellSelected > 0) setCellSelected(cellSelected - 1);
  }
  function navigateCellUp() {
    if (cellSelected > 8) setCellSelected(cellSelected - 9);
  }
  function navigateCellRight() {
    if (cellSelected < 80) setCellSelected(cellSelected + 1);
  }
  function navigateCellDown() {
    if (cellSelected < 72) setCellSelected(cellSelected + 9);
  }

  useKey(37, navigateCellLeft);
  useKey(38, navigateCellUp);
  useKey(39, navigateCellRight);
  useKey(40, navigateCellDown);

  return (
    <>
      <Header onClickNewGame={onClickNewGame} currentTheme={props.currentTheme} switchTheme={props.switchTheme} />
      <div className={overlay ? "container blur" : "container"}>
        <div className="innercontainer">
          <div className="left-content">
            <div className="gameinfo">
              <Difficulty onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChangeDifficulty(e)} />
              <Mistakes mistakes={mistakesNumber} />
              <Timer key={timerKey} />
            </div>
            <GameSection
              onClick={(indexOfArray: number) => onClickCell(indexOfArray)}
              solvedArray={solvedArray}
            />
          </div>
          <StatusSection
            onClickNewGame={onClickNewGame}
            onClickNumber={(number: string) => onClickNumber(number)}
            onClickUndo={onClickUndo}
            onClickErase={onClickErase}
            onClickHint={onClickHint}
            onClickNote={onClickNote} notesMode={notesMode}
          />
        </div>
        <HowToPlay />
      </div>
      <Footer />
      <GameOver onClickOverlay={onClickOverlay} overlay={overlay} />
    </>
  );
}
