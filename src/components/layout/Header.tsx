import React from 'react';
import { ReactComponent as SettingsSVG } from '../../svg/settings.svg'
import { ReactComponent as FacebookSVG } from '../../svg/facebook.svg'
import { ReactComponent as MenuSVG } from '../../svg/menu.svg'
import { ReactComponent as WhiteMenuSVG } from '../../svg/white_menu.svg'
import { useSudokuContext } from '../../context/SudokuContext';
import { StyledHeader, HeaderSudokuLabel, HeaderSettingsLabel, MenuColor } from '../../styles'
import { createStyles, FormControl, FormControlLabel, Popover, Radio, RadioGroup, Switch, SwitchClassKey, SwitchProps, Theme, withStyles } from '@material-ui/core';

type HeaderProps = {
  switchTheme: (theme: string) => void,
  currentTheme: string,
  onClickNewGame: () => void
}

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string;
}

interface Props extends SwitchProps {
  classes: Styles;
}

export const Header = (props: HeaderProps) => {
  let {
    timerMode, setTimerMode,
    mistakesMode, setMistakesMode,
    duplicatesMode, setDuplicatesMode,
    currentSquareSelectMode, setCurrentSquareSelectMode,
    multipleSelectMode, setMultipleSelectMode
  } = useSudokuContext();

  const changeTheme = (e: any) => props.switchTheme(e.target.value);

  const toggleTimer = () => setTimerMode(!timerMode);
  const toggleMistakesMode = () => setMistakesMode(!mistakesMode);
  const toggleDuplicates = () => setDuplicatesMode(!duplicatesMode);
  const toggleCurrentSquare = () => setCurrentSquareSelectMode(!currentSquareSelectMode);
  const toggleMultipleSelect = () => setMultipleSelectMode(!multipleSelectMode);

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const IOSSwitch = withStyles((theme: Theme) =>
    createStyles({
      root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
      },
      switchBase: {
        padding: 1,
        '&$checked': {
          transform: 'translateX(16px)',
          color: theme.palette.common.white,
          '& + $track': {
            backgroundColor: '#F9AB55',
            opacity: 1,
            border: 'none',
          },
        },
        '&$focusVisible $thumb': {
          color: '#52d869',
          border: '6px solid #fff',
        },
      },
      thumb: {
        width: 24,
        height: 24,
      },
      track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
      },
      checked: {},
      focusVisible: {},
    }),
  )(({ classes, ...props }: Props) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });

  return (
    <StyledHeader className="header">
      <MenuColor><button onClick={handleClick} className="menu">
        {props.currentTheme === 'light' ? <MenuSVG className="phone_settings" /> : <WhiteMenuSVG className="phone_settings" />}
      </button></MenuColor>

      <HeaderSudokuLabel>SUDOKU</HeaderSudokuLabel>

      <div className="social_icons">
        <FacebookSVG className="facebook-svg"/><div style={{zIndex: 1}} className="sharethis-inline-share-buttons"></div>
      </div>

      <button onClick={handleClick} className="settings">
        <SettingsSVG className="icon" />
        <HeaderSettingsLabel>Settings</HeaderSettingsLabel>
      </button>

      <div className="newgame" onClick={props.onClickNewGame}>New Game</div>

      <Popover
        className="popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className="popover_content">
          <div className="header_text">Change the colour scheme</div>
          <div className="inputs">
            <FormControl component="fieldset">
              <RadioGroup defaultValue={props.currentTheme} onChange={changeTheme}>
                <FormControlLabel value="light" control={<Radio />} label={<div className="radio_text">Light</div>} />
                <FormControlLabel value="dark" control={<Radio />} label={<div className="radio_text">Dark</div>} />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="selects">
            <FormControlLabel control={<IOSSwitch checked={timerMode} onChange={toggleTimer} />} label={<div className="label">Timer</div>} />
            <FormControlLabel control={<IOSSwitch checked={currentSquareSelectMode} onChange={toggleCurrentSquare} />} label={<div className="label">Highlight Current Square</div>} />
            <FormControlLabel control={<IOSSwitch checked={multipleSelectMode} onChange={toggleMultipleSelect} />} label={<div className="label">Highlight Related Squares</div>} />
            <FormControlLabel control={<IOSSwitch checked={duplicatesMode} onChange={toggleDuplicates} />} label={<div className="label">Highlight Duplicates</div>} />
            <FormControlLabel control={<IOSSwitch checked={mistakesMode} onChange={toggleMistakesMode} />} label={<div className="label">Enable Mistakes</div>} />
          </div>
        </div>
      </Popover>
    </StyledHeader>
  )
}
