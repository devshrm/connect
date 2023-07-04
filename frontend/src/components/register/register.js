import {
    Box, 
    Typography, 
    Container,
    Button,
    TextField,
    useTheme, 
    AppBar,
    Grid} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';

import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";

const theme = createTheme({
    palette: {
        primary: {
            main: '#b3e3a7'
        },
        secondary: {
            main: '#1DA1F2'
        }
    }
});

const initialRegisterValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: ""
}

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
});

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFormSubmit = async (values, onSubmitProps) => {
       
        const registerResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values)
            }
        );
        console.log(registerResponse);
        const savedUser = await registerResponse.json();
        onSubmitProps.resetForm();
        if(savedUser){
            navigate("/")
        }
    }

    const formik = useFormik({
        initialValues: initialRegisterValues,
        validationSchema: registerSchema,
        onSubmit: handleFormSubmit
    })

    return(
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box 
                sx={{
                marginTop:8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                    }}
            >
                <Typography component="h1" variant="h5" color="primary">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                size="small"
                                autoFocus
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                                error={Boolean(formik.touched.firstName) && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="family-name"
                                name="lastName"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                size="small"
                                autoFocus
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.lastName}
                                error={Boolean(formik.touched.lastName) && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                size="small"
                                autoComplete="email"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                error={Boolean(formik.touched.email) && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                size="small"
                                autoComplete="new-password"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                error={Boolean(formik.touched.password) && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="location"
                                label="Location"
                                id="location"
                                size="small"
                                autoComplete="location"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.location}
                                error={Boolean(formik.touched.location) && Boolean(formik.errors.location)}
                                helperText={formik.touched.location && formik.errors.location}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Typography onClick={()=>{
                                navigate("/");
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: theme.palette.secondary.main,
                                "&:hover": {
                                cursor: "pointer",
                                color: theme.palette.secondary.light,
                                },
                            }}
                            >
                               Already have an account? Sign in
                            </Typography>
                        </Grid>
                    </Grid>

                </Box>
                
            </Box>  
            </Container>         
        </ThemeProvider>
    );
}

export default Register;