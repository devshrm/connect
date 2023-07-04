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


import LoginForm from "./LoginForm.js";

const defaultTheme = createTheme({
    palette: {
        primary: {
            main: '#b3e3a7'
        },
        secondary: {
            main: '#d1ff33'
        }
    }
  
});


const Login = () => {
    return(
        <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
            <Box sx={{
                border:1,
                mx:60,
                borderColor: 'purple',
                borderRadius: '16px',
                mt:10,
                pb:5
            }}>
            <Container component="main" maxWidth="xs">
                <Typography py="1em" color="secondary" variant="h3" align='center'>
                    Connect
                </Typography>
                
                <LoginForm />
            </Container>  
            </Box>  
        </ThemeProvider>
    
       

    );
};

export default Login;