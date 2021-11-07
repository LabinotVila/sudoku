import React from 'react';
import { useSudokuContext } from '../context/SudokuContext';
import { GameInfoStaticLevel } from '../styles';

type DifficultyProps = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
};

/**
 * React component for the Difficulty Selector.
 */
export const Difficulty = (props: DifficultyProps) => {
  let { difficulty } = useSudokuContext();

  return (
    <div className="difficulty">
      <GameInfoStaticLevel>Level:&nbsp;&nbsp;</GameInfoStaticLevel>
      <select name="select" className="select" defaultValue={difficulty} onChange={props.onChange}>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
        <option value="Evil">Evil</option>
      </select>
    </div>
  )
}
