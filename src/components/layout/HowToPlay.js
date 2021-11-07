import { HowToPlayTitle, HowToPlayDesc } from '../../styles'

export default function HowToPlay() {
    return (
        <div className="how-to-play">
            <HowToPlayTitle>
                How to play
            </HowToPlayTitle>
            <HowToPlayDesc>
                The goal of a Sudoku puzzle game is to fill a 9x9 grid with numbers so that each row, column and 3x3 section
                contain all digits between 1 and 9.  At the beginning of the game, the 9×9 grid will have some of the squares
                filled in. Your job is to use logic to fill in the missing digits and complete the grid.
            </HowToPlayDesc>
            <div className="sharethis-inline-share-buttons" />
        </div>
    )
}