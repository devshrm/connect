import {
    Box, 
    Typography, 
    Container,
    Button,
    TextField,
    useTheme } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { setLogin } from "../../state";



const defaultTheme = createTheme();

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("password")
});

const initialLoginValues = {
    email: "",
    password: ""
};

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFormSubmit = async (values, onSubmitProps) => {
        console.log(values)
        const loginResponse = await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(values)
        });
        const loginServer = await loginResponse.json();
        onSubmitProps.resetForm();
        if(loginServer){
            console.log("you are logged in");
            dispatch(
                setLogin({
                    user: loginServer.user,
                    token: loginServer.token
                })
            );
            navigate("/home");
        }
    };

    const formik = useFormik({
        initialValues:initialLoginValues,
        validationSchema:loginSchema,
        onSubmit: handleFormSubmit
    });


    return (
            <Container component="main" maxWidth="xs">
                <Box 
                    sx={{
                    marginTop:4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: 2,
                    }}>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                error={Boolean(formik.touched.email) && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                error={Boolean(formik.touched.password) && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}>
                                Sign In
                            </Button>

                            <Typography
                                onClick={() => {
                                   navigate("/register");
                                   formik.resetForm();
                                }}
                                sx={{
                                    textDecoration: "underline",
                                    color: defaultTheme.palette.primary.main,
                                    "&:hover": {
                                    cursor: "pointer",
                                    color: defaultTheme.palette.primary.light,
                                    },
                                }}
                                >
                                Don't have an account? Sign Up here
                            </Typography>
                        </form>  
                </Box>

            </Container>
    );
}

export default LoginForm;