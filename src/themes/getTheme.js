import THEMES from '../constants/theme'
import { LIGHT, DARK } from '../themes/'

export default function getTheme(themeName) {
    switch (themeName) {
        case THEMES.LIGHT: return LIGHT;
        case THEMES.DARK: return DARK;
        default: return LIGHT;
    }
}