import {createTheme} from '@mui/material';

export const theme = createTheme({
    direction: 'rtl',
    typography: {
        fontFamily: 'Assistant',
    },
    palette: {
        background: {
            default: '#F1F1F1',
        },
        primary: {
            main: '#fff',
        },
        secondary: {
            main: '#181818',
        },
        text: {
            primary: '#181818',
            secondary: '#fff',
        }
    },
    components: {
        MuiFab: {
            styleOverrides: {
                root: {
                    borderRadius: '35%',
                    margin: 0,
                    top: 'auto',
                    right: 20,
                    bottom: 20,
                    left: 'auto',
                    position: 'fixed',
                }
            }
        },
        MuiInput: {
            defaultProps: {
                disableUnderline: true,
                fullWidth: true,
            },
            styleOverrides: {
                root: {
                    // alignItems: 'baseline',
                }
            }
        },
        MuiInputAdornment: {
            styleOverrides: {
                root: {
                    // alignItems: 'flex-end',
                }
            }
        }
    }
});
