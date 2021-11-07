import React, { createContext, useContext, useState } from 'react';

type SudokuContextProps = {
  numberSelected: string,
  setNumberSelected: React.Dispatch<React.SetStateAction<string>>,
  gameArray: string[],
  setGameArray: React.Dispatch<React.SetStateAction<string[]>>,
  difficulty: string,
  setDifficulty: React.Dispatch<React.SetStateAction<string>>,
  mistakesNumber: number,
  setMistakesNumber: React.Dispatch<React.SetStateAction<number>>,
  gamePaused: boolean,
  setGamePaused: React.Dispatch<React.SetStateAction<boolean>>,
  cellSelected: number,
  setCellSelected: React.Dispatch<React.SetStateAction<number>>,
  initArray: string[],
  setInitArray: React.Dispatch<React.SetStateAction<string[]>>,
  won: number,
  setWon: React.Dispatch<React.SetStateAction<number>>,
  notes: number[][],
  setNotes: React.Dispatch<React.SetStateAction<number[][]>>,
  endGameTimer: number,
  setEndGameTimer: React.Dispatch<React.SetStateAction<number>>,

  // Modes:
  notesMode: boolean,
  setNotesMode: React.Dispatch<React.SetStateAction<boolean>>,

  timerMode: boolean,
  setTimerMode: React.Dispatch<React.SetStateAction<boolean>>,

  mistakesMode: boolean,
  setMistakesMode: React.Dispatch<React.SetStateAction<boolean>>,

  duplicatesMode: boolean,
  setDuplicatesMode: React.Dispatch<React.SetStateAction<boolean>>,

  currentSquareSelectMode: boolean,
  setCurrentSquareSelectMode: React.Dispatch<React.SetStateAction<boolean>>,

  multipleSelectMode: boolean,
  setMultipleSelectMode: React.Dispatch<React.SetStateAction<boolean>>
};


const SudokuContext = createContext<SudokuContextProps>({ numberSelected: '0', setNumberSelected: () => {},
                                                          gameArray: [], setGameArray: () => {},
                                                          difficulty: 'Easy', setDifficulty: () => {},
                                                          timerMode: true, setTimerMode: () => {},
                                                          currentSquareSelectMode: true, setCurrentSquareSelectMode: () => {},
                                                          notes: [], setNotes: () => {},
                                                          mistakesMode: true, setMistakesMode: () => {},
                                                          mistakesNumber: 3, setMistakesNumber: () => {},
                                                          gamePaused: false, setGamePaused: () => {},
                                                          duplicatesMode: false, setDuplicatesMode: () => {},
                                                          cellSelected: -1, setCellSelected: () => {},
                                                          initArray: [], setInitArray: () => {},
                                                          notesMode: false, setNotesMode: () => {},
                                                          multipleSelectMode: true, setMultipleSelectMode: () => {},
                                                          endGameTimer: -1, setEndGameTimer: () => {},
                                                          won: 0, setWon: () => {} });

type SudokuProviderProps = {
  children: React.ReactElement
};

export const SudokuProvider = ({ children }: SudokuProviderProps) => {
  let [ numberSelected, setNumberSelected ] = useState<string>('0');
  let [ gameArray, setGameArray ] = useState<string[]>([]);
  let [ difficulty,setDifficulty ] = useState<string>('Easy');
  let [ timerMode, setTimerMode ] = useState<boolean>(true);
  let [ mistakesMode, setMistakesMode ] = useState<boolean>(true);
  let [ currentSquareSelectMode, setCurrentSquareSelectMode ] = useState<boolean>(true); 
  let [ mistakesNumber, setMistakesNumber ] = useState<number>(3);
  let [ gamePaused, setGamePaused ] = useState<boolean>(false);
  let [ duplicatesMode, setDuplicatesMode ] = useState<boolean>(false);
  let [ cellSelected, setCellSelected ] = useState<number>(-1);
  let [ initArray, setInitArray ] = useState<string[]>([]);
  let [ won, setWon ] = useState<number>(0);
  let [ notes, setNotes ] = useState<number[][]>([]);
  let [ notesMode, setNotesMode ] = useState<boolean>(false);
  let [ multipleSelectMode, setMultipleSelectMode ] = useState<boolean>(true);
  let [ endGameTimer, setEndGameTimer ] = useState<number>(-1); 
 
  return (
    <SudokuContext.Provider value={
      {
        numberSelected, setNumberSelected,
        gameArray, setGameArray,
        difficulty,setDifficulty,
        timerMode, setTimerMode,
        mistakesMode, setMistakesMode,
        mistakesNumber, setMistakesNumber,
        currentSquareSelectMode, setCurrentSquareSelectMode,
        gamePaused, setGamePaused,
        duplicatesMode, setDuplicatesMode,
        cellSelected, setCellSelected,
        initArray, setInitArray,
        won, setWon,
        notes, setNotes,
        notesMode, setNotesMode,
        multipleSelectMode, setMultipleSelectMode,
        endGameTimer, setEndGameTimer
      }
    }>
      {children}
    </SudokuContext.Provider>
  );
};

export const useSudokuContext = (): SudokuContextProps => useContext(SudokuContext);