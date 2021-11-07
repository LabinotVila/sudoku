import React from "react";
import { useSudokuContext } from "../context/SudokuContext";
import { GameInfoStaticMistakes } from "../styles";

type MistakesProps = {
    mistakes: number
};

export default function Mistakes(props: MistakesProps) {
    let { mistakesMode } = useSudokuContext();

    return (
        <div className="mistakes" style={mistakesMode ? { display: "flex" } : { display: "none" }}>
            <div className="number">{3 - props.mistakes} of 3&nbsp;</div>
            <GameInfoStaticMistakes>Mistakes</GameInfoStaticMistakes>
        </div>
    )
}