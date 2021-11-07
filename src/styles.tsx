import styled from 'styled-components'

/**
 * Header Settings
 */
export const StyledHeader = styled.header`
    border-color: ${props => props.theme.headerBottomBorderColor};
`;

export const HeaderSudokuLabel = styled.div`
    color: ${props => props.theme.headerSudokuLabelColor} !important;
    width: 15%;
    font-size: 36px;
    font-weight: 700;

    @media only screen and (max-width: 768px) {
        width: 30%;
        font-size: 24px;
    }

    @media only screen and (max-width: 375px) {
        width: 40%;
    }
`;

export const HeaderSettingsLabel = styled.div`
    width: 50%;
    text-align: right;
    color: ${props => props.theme.headerSettingsLabelColor} !important;
    font-size: 20px !important;
    font-weight: 500 !important;

    @media only screen and (max-width: 768px) {
        width: 40%;
    }
`;

/**
 * Game Information
 */
export const GameInfoStaticText = styled.div`
    color: ${props => props.theme.gameInfoStaticTextColor};
    font-size: 22px;
    font-weight: 500;

    @media only screen and (max-width: 768px) {
        font-size: 18px;
    }
 `;
export const GameInfoStaticLevel = styled(GameInfoStaticText)`
    @media only screen and (max-width: 375px) {
        display: none;
    }
`;
export const GameInfoStaticMistakes = styled(GameInfoStaticText)`
    @media only screen and (max-width: 768px) {
        display: none;
    }

    @media only screen and (max-width: 375px) {
        display: none;
    }
 `;

/**
 * Game
 */
export const GameCell = styled.td<{ filled: boolean, userFilled: boolean, highlight: string }>`
    height: 70px;
    width: 70px;
    text-align: center;
    border: 1px solid ${props => props.theme.gameCellBorderWithinColor};
    cursor: pointer;
    color: ${props =>
        props.highlight === 'highlight-duplicate' ? '#FFFFFF' :
            props.highlight === 'red-highlight' ? '#941B0C' :
                props.userFilled ? props.theme.gameCellFontColor :
                    props.filled ? props.theme.gameCellFontColor : 'white'};
    &:nth-child(3n) {
        border-right: 2.5px solid ${props => props.theme.gameCellBorderColor};
    };
    background-color: ${props =>
        props.highlight === 'highlight-duplicate' ? "#EFB8A9" :
            props.highlight === 'highlight' ? props.theme.gameCellHighlight :
                props.highlight === 'highlightcurrent' ? props.theme.gameCellHighlightCurrent :
                    // (props.highlight === 'selected' ? 'var(--color-orange-dark)' :
                    props.highlight === 'red-highlight' ? '#FBC3BC' : props.theme.gameCellBackgroundColor};

    @media only screen and (max-width: 768px) {
        font-size: 36px;
        height: 44px;
        width: 44px;
    }

    @media only screen and (max-width: 375px) {
        font-size: 24px;
        height: 36px;
        width: 36px;
    }
`;
export const GameCellNote = styled.table`
    width: 100%;
    height: 100%;
    font-size: 16px;
    font-weight: 400;
    color: ${props => props.theme.gameCellNoteFontColor};
    background-color: ${props => props.theme.gameCellNoteBackgroundColor};
    overflow: hidden;
    border-collapse: collapse;

    @media only screen and (max-width: 768px) {
        font-size: 12px;
    }
`;
export const GameCellNoteTr = styled.tr`
    height: 33%;
    width: 33%;
    padding: 0;
    margin: 0;
    overflow: hidden;
`;
export const GameCellNoteTd = styled.td`
    padding: 0;
    margin: 0;
    height: 33%;
    width: 33%;
    overflow: hidden;
`;

export const GameBoard = styled.table`
    box-shadow: rgba(${props => props.theme.gameBoardBoxShadow}, 0.2) 0px 20px 30px;
    table-layout: fixed;
    width: 100%;
    font-size: 48px;
    font-weight: 400;
    border: 2.5px solid ${props => props.theme.gameCellBorderColor};
    border-collapse: collapse;

    @media only screen and (max-width: 768px) {
        font-size: 36px;
    }
`;
export const GameBoardThirdChild = styled.tr`
    &:nth-child(3n) {
        border-bottom: 2px solid ${props => props.theme.gameCellBorderColor};
    };
`;

/**
 * Status Section
 */
export const StatusNumber = styled.div<{ selected: boolean }>`
    text-align: center;
    border: 1px solid;
    border-radius: 8px;
    border-color: ${props => props.theme.numbersCellFontColor};
    font-size: 64px;
    font-weight: 600;
    padding: 50px 0;
    cursor: pointer;
    color: ${props => props.selected ? 'var(--color-blue)' : props.theme.numbersCellFontColor};
    background-color: ${props => props.theme.gameCellBackgroundColor};

    @media only screen and (max-width: 768px) {
        font-size: 54px;
        padding: 40px 0;
    }

    @media only screen and (max-width: 375px) {
        width: 100%;
        font-size: 36px;
        border: none;
        padding: 0;
        margin: 0;
    }
`;
export const StatusActionText = styled.p`
    text-align: center;
    font-size: 24px;
    font-weight: 500;
    color: ${props => props.theme.gameCellFontColor};

    @media only screen and (max-width: 768px) {
        font-size: 20px;
    }
`;

/**
 * How To Play
 */
export const HowToPlayTitle = styled.div`
    font-size: 36px;
    font-weight: 600;
    color: ${props => props.theme.howToPlayTitleColor};

    @media only screen and (max-width: 768px) {
        font-size: 24px;
    }
`;
export const HowToPlayDesc = styled.div`
    text-align: justify;
    margin-top: 30px;
    font-size: 22px;
    font-weight: 400;
    line-height: 38px;
    color: ${props => props.theme.howToPlayDescriptionColor};

    @media only screen and (max-width: 768px) {
        font-size: 20px;
    }
`;

export const StyledFooter = styled.div`
    width: 100%;
    background-color: ${props => props.theme.footerBackgroundColor}
`;
export const MenuColor = styled.div`
    width: 15%;
    color: ${props => props.theme.menuButtonColor};
    display: none;

    @media only screen and (max-width: 375px) {
        display: inline;
    }
`;