import { useSudokuContext } from '../context/SudokuContext';
import { StatusNumber } from '../styles';

type NumbersProps = {
  onClickNumber: (number: string) => void
};

export const Numbers = ({ onClickNumber } : NumbersProps) => {
  let { numberSelected } = useSudokuContext();

  return (
    <div className="numbers">
      {
        [1,2,3,4,5,6,7,8,9].map((number) => {
          if (numberSelected === number.toString()) {
            return (
              <StatusNumber selected key={number} onClick={() => onClickNumber(number.toString())}>{number}</StatusNumber>
            )
          } else {
            return (
              <StatusNumber selected={false} key={number} onClick={() => onClickNumber(number.toString())}>{number}</StatusNumber>
            )
          }
        })
      }
    </div>
  )
}
