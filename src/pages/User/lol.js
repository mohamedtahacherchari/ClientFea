import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CreateIcon from '@mui/icons-material/Create';

import { isEmpty, isEmail, isLength, isMatch } from "../../components/utils/Validation"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment } from '@mui/material';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cf_password: '',
}

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" /*href="https://mui.com/"*/>
            GreenLinks
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {

    const [showPassword, setShowPassword] = useState(false)

    const handleClick = () =>{
        setShowPassword(!showPassword)
    }

    const handleMouseDown = (e)=>{
        e.preventDefault()
    }

    const [user, setUser] = useState(initialState)

    const { firstName, lastName, email, password, cf_password} = user

    const handleChangeInput = e =>{
        const { name, value } = e.target
        setUser({...user, [name]:value})
    }


   const handleSubmit = async(event) => {
        event.preventDefault();
        if(isEmpty(firstName) || isEmpty(lastName) || isEmpty(password)){
        toast.error("Please fill in all fields.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        return setUser({...user, err: "Please fill in all fields.", success: ''})
        }

        if(!isEmail(email)){
        toast.error("Invalid emails.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        return setUser({...user, err: "Invalid emails.", success: ''})
        }

        if(isLength(password)){
        toast.error("Password must be at least 6 characters.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        return setUser({...user, err: "Password must be at least 6 characters.", success: ''})
        }

        if(!isMatch(password, cf_password)){
        toast.error("Password did not match.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        return setUser({...user, err: "Password did not match.", success: ''})
        }

        try {
                   const {data}= await axios.post('/api/user/register',
                    {firstName, lastName, email, password})
                    setUser({...user, err: '', success: data.msg})
                    toast.success("Check Your Email to activate your account.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                localStorage.setItem("userInfo", JSON.stringify(data))}
            catch (err) {
                        err.response.data.msg &&
            setUser({...user, err:err.response.data.msg, success:''})
            console.log(err)}};





    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <CreateIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    S’inscrire
                    </Typography>
                    <ToastContainer />
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstName"
                            label="Nom"
                            name="firstName"
                            autoComplete="firstName"
                            value={firstName}
                            onChange={handleChangeInput}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastName"
                            label="Prenom"
                            name="lastName"
                            autoComplete="lastName"
                            value={lastName}
                            onChange={handleChangeInput}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={handleChangeInput}

                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type={showPassword?'text':'password'}
                            id="password"
                            value={password}
                            onChange={handleChangeInput}
                            autoComplete="current-password"
                            InputProps={{
                            endAdornment:(
                                <InputAdornment position='end'>
                                    <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="cf_password"
                            label="Confirmer le mot de passe"
                            type={showPassword?'text':'password'}
                            id="cf_password"
                            value={cf_password}
                            onChange={handleChangeInput}
                            autoComplete="current-password"
                            InputProps={{
                            endAdornment:(
                                <InputAdornment position='end'>
                                    <IconButton onClick={handleClick} onMouseDown={handleMouseDown}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            S’inscrire
                        </Button>
                        <Grid container>
                        <Grid item>
                        <Link href="/signin" variant="body2">
                            {"Vous avez un compte ? S'identifier"}
                        </Link>
                        </Grid>
                    </Grid>
                    <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}