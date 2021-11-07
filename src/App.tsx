import React from 'react';
import { Game } from './Game';
import './App.scss';
import { SudokuProvider } from './context/SudokuContext';
import { ThemeProvider } from 'styled-components';
import THEMES from './constants/theme'
import getTheme from './themes/getTheme'
import { createGlobalStyle } from 'styled-components'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export const App: React.FC<{}> = () => {
  const [theme, setTheme] = React.useState(THEMES.LIGHT)

  const customTheme = createMuiTheme({
    palette: {
      secondary: {
        main: '#F9AB55'
      }
    }
  });

  const GlobalStyle = createGlobalStyle<{ lightTheme: boolean }>`
    body {
      background-color: ${props => (props.lightTheme ? '#FFFF' : '#14213D')};
    }`

  const switchTheme = (theme: string) => setTheme(theme);

  return (
    <ThemeProvider theme={getTheme(theme)} >
      <MuiThemeProvider theme={customTheme}>
        <GlobalStyle lightTheme={theme === THEMES.LIGHT} />
        <SudokuProvider>
          <Game currentTheme={theme} switchTheme={switchTheme} />
        </SudokuProvider>
      </MuiThemeProvider>
    </ThemeProvider>
  );
}
