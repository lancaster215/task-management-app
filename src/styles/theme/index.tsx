import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#FFD700',
            contrastText: '#000',
        },
        background: {
            default: '#FFFFFF',
            paper: '#F4F4F4',
            green: '#6FC276',
            blue: '#89CFF0',
            red: '#FF6B6B',
            purple: '#A78BFA',
            orange: '#F59E0B',
            teal: '#20C997',
        },
        text: {
            primary: '#161b22',
            secondary: '#666666',
        },
    },
    shape: {
        borderRadius: 12,
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h2: {
            fontSize: '20px',
            fontWeight: 400,
            color: '#161b22'
        },
        h4: {
            fontSize: '10px',
            fontWeight: 400,
            color: '#161b22'
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    border: '1px solid #E0E0E0',
                },
            },
        },
    },
});