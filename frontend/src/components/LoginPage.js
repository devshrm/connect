import {
    Box, 
    Typography, 
    Container,
    Button,
    TextField,
    useTheme, 
    AppBar} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import { red } from '@mui/material/colors';

import LoginForm from "./LoginForm.js";

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#b3e3a7'
        },
    },
    typography: {
        h3: {
            color: '#b3e3a7'
        }
    }
});


const LoginPage = () => {
    return(
        <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
            <Container component="main" maxWidth="xs">
                <Typography variant="h3" align='center'>
                    Connect
                </Typography>
                
                <LoginForm />
            </Container>    
        </ThemeProvider>
    
       

    );
};

export default LoginPage;