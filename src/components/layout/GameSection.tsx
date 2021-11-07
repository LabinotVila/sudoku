import { useSudokuContext } from '../../context/SudokuContext';
import { GameBoard, GameBoardThirdChild, GameCell, GameCellNote, GameCellNoteTd, GameCellNoteTr } from '../../styles';
import { ReactComponent as BigPlay } from '../../svg/bigpause.svg'

type GameSectionProps = {
  onClick: (indexOfArray: number) => void,
  solvedArray: string[]
};

/**
 * React component for the Game Section
 */
export const GameSection = (props: GameSectionProps) => {
  const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let {
    gameArray,
    duplicatesMode,
    currentSquareSelectMode,
    gamePaused,
    setGamePaused,
    cellSelected,
    notes,
    multipleSelectMode,
    initArray } = useSudokuContext();

  function _isCellRelatedToSelectedCell(row: number, column: number) {
    if (cellSelected === row * 9 + column) {
      return true;
    }
    let rowOfSelectedCell = Math.floor(cellSelected / 9);
    let columnOfSelectedCell = cellSelected % 9;
    if (rowOfSelectedCell === row || columnOfSelectedCell === column) {
      return true;
    }
    return [[0, 3, 0, 3],
    [0, 3, 3, 6],
    [0, 3, 6, 9],
    [3, 6, 0, 3],
    [3, 6, 3, 6],
    [3, 6, 6, 9],
    [6, 9, 0, 3],
    [6, 9, 3, 6],
    [6, 9, 6, 9]
    ].some((array) => {
      if (rowOfSelectedCell > array[0] - 1 && row > array[0] - 1 &&
        rowOfSelectedCell < array[1] && row < array[1] &&
        columnOfSelectedCell > array[2] - 1 && column > array[2] - 1 &&
        columnOfSelectedCell < array[3] && column < array[3])
        return true;
      return false;
    });
  }

  function _isCellSameAsSelectedCell(row: number, column: number) {
    if (cellSelected === row * 9 + column) {
      return true;
    }
    if (gameArray[cellSelected] === '0') {
      return false;
    }
    if (gameArray[cellSelected] === gameArray[row * 9 + column]) {
      return true;
    }
  }

  /**
   * Returns the classes for a cell related to the selected cell.
   */
  function _selectedCell(indexOfArray: number, value: string, highlight: string) {
    let modifiedValue = value !== '0' ? (gamePaused ? <span>&nbsp;</span> : value) : '';

    if (value !== '0') {
      if (initArray[indexOfArray] === '0') {
        return (
          <GameCell filled={false} userFilled={true} highlight={highlight} key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{modifiedValue}</GameCell>
        )
      } else {
        return (
          <GameCell userFilled={false} highlight={highlight} filled key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{modifiedValue}</GameCell>
        )
      }
    } else if (value === '0' && notes[indexOfArray].filter(a => a !== 0).length > 0) {
      return createTableInsideCell(notes, indexOfArray)
    } else {
      return (
        <GameCell filled={false} userFilled={false} highlight={highlight} key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{modifiedValue}</GameCell>
      )
    }
  }


  function createTableInsideCell(values: number[][], indexOfArray: number) {
    return (
      <GameCell filled={false} userFilled={false} highlight={''} onClick={() => props.onClick(indexOfArray)}>
        <GameCellNote>
          <GameCellNoteTr>
            <GameCellNoteTd>{values[indexOfArray][0] === 0 ? '' : 1}</GameCellNoteTd>
            <GameCellNoteTd>{values[indexOfArray][1] === 0 ? '' : 2}</GameCellNoteTd>
            <GameCellNoteTd>{values[indexOfArray][2] === 0 ? '' : 3}</GameCellNoteTd>
          </GameCellNoteTr>
          <GameCellNoteTr>
            <GameCellNoteTd>{values[indexOfArray][3] === 0 ? '' : 4}</GameCellNoteTd>
            <GameCellNoteTd>{values[indexOfArray][4] === 0 ? '' : 5}</GameCellNoteTd>
            <GameCellNoteTd>{values[indexOfArray][5] === 0 ? '' : 6}</GameCellNoteTd>
          </GameCellNoteTr>
          <GameCellNoteTr>
            <GameCellNoteTd>{values[indexOfArray][6] === 0 ? '' : 7}</GameCellNoteTd>
            <GameCellNoteTd>{values[indexOfArray][7] === 0 ? '' : 8}</GameCellNoteTd>
            <GameCellNoteTd>{values[indexOfArray][8] === 0 ? '' : 9}</GameCellNoteTd>
          </GameCellNoteTr>
        </GameCellNote>
      </GameCell>
    )
  }

  /**
   * Returns the classes or a cell not related to the selected cell.
   */
  function _unselectedCell(indexOfArray: number, value: string) {
    let modifiedValue = value !== '0' ? (gamePaused ? <span>&nbsp;</span> : value) : (notes[indexOfArray].every(a => a !== 0) ? "More" : '');

    if (value !== '0') {
      if (initArray[indexOfArray] === '0') {
        if (gameArray[indexOfArray] !== props.solvedArray[indexOfArray]) {
          return (
            <GameCell filled userFilled={false} highlight='red-highlight' key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{modifiedValue}</GameCell>
          )
        } else {
          return (
            <GameCell highlight={''} filled={false} userFilled={true} key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{modifiedValue}</GameCell>
          )
        }
      } else {
        return (
          <GameCell filled userFilled={false} highlight={''} key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{modifiedValue}</GameCell>
        )
      }
    } else if (value === '0' && notes[indexOfArray].filter(a => a !== 0).length > 0) {
      return createTableInsideCell(notes, indexOfArray);
    } else {
      return (
        <GameCell filled={false} userFilled={false} highlight={''} key={indexOfArray} onClick={() => props.onClick(indexOfArray)}>{modifiedValue}</GameCell>
      )
    }
  }

  function resumeGame() {
    setGamePaused(false);
  }

  return (
    <section className="game">
      <BigPlay onClick={resumeGame} className="big_play_button" style={gamePaused ? {display: "inline"} : {display: "none"}} />
      <GameBoard style={gamePaused ? { opacity: 0.05 } : { opacity: 1 }}>
        <tbody>
          {
            rows.map((row) => {
              return (
                <GameBoardThirdChild key={row}>
                  {
                    rows.map((column) => {
                      const indexOfArray = row * 9 + column;
                      const value = gameArray[indexOfArray];

                      if (cellSelected === indexOfArray) {
                        let condition = value === '0' || gameArray[indexOfArray] === props.solvedArray[indexOfArray];
                        return _selectedCell(indexOfArray, value, condition ? (currentSquareSelectMode ? 'highlightcurrent' : multipleSelectMode ? 'highlight' : 'nohighlight') : 'red-highlight');
                      }

                      if (_isCellRelatedToSelectedCell(row, column)) {
                        let condition = value === '0' || gameArray[indexOfArray] === props.solvedArray[indexOfArray];
                        return _selectedCell(indexOfArray, value, condition ? (multipleSelectMode ? 'highlight' : 'nohighlight') : 'red-highlight')
                      }

                      if (cellSelected !== -1 && _isCellSameAsSelectedCell(row, column)) {
                        if (duplicatesMode) {
                          return _selectedCell(indexOfArray, value, 'highlight-duplicate');
                        } else {
                          return _unselectedCell(indexOfArray, value);
                        }
                      } else {
                        return _unselectedCell(indexOfArray, value);
                      }
                    })
                  }
                </GameBoardThirdChild>
              )
            })
          }
        </tbody>
      </GameBoard>
    </section>
  )
}