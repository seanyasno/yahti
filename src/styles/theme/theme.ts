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
        text: {
            primary: '#181818',
            secondary: '#fff',
        }
    }
});
