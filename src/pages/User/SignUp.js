import React,{useState,useEffect}  from 'react';
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
import { useDispatch ,useSelector} from 'react-redux';
//import { dispatchLogin } from '../../redux/actions/authAction';
import { dispatchLogin, fetchUser, dispatchGetUser } from '../../redux/actions/authAction';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cf_password: '',
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
	const dispatch = useDispatch()  
    const [user, setUser] = useState(initialState)
    const token = useSelector(state => state.token)
    const auth = useSelector(state => state.auth)

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
                    toast.success("Assister à l'acceptation de l'administrateur.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    console.log(data)

                localStorage.setItem("userInfo", JSON.stringify(data));
            }

            catch (err) {
			err.response.data.msg &&
            setUser({...user, err:err.response.data.msg, success:''})
            console.log(err)}

        };
        function storeUserInfo(data) {
            // Convertir l'objet data en une chaîne JSON
            const userInfoJSON = JSON.stringify(data);
            // Stocker la chaîne JSON dans le localStorage sous la clé "userInfo"
            localStorage.setItem("userInfo", userInfoJSON);
          }
          
          // Exemple d'utilisation avec les données que vous avez fournies
          const data = {
            _id: "64d3a4ec6c6cc76e7444483bdb9",
            firstName: "Alex Fabien",
            email: "alex@google.fr",
            role: 988889,
            avatar: "http://res.cloudinary.com/piyushproj/image/upload/v1692279395/lnx6f1nftsowjvh6zowd.jpg",
            token: "eyJhbGciOiJIUzI1Ni3333IsInR5cCI6IkpXVCJ9",
          };
          
        storeUserInfo(data);


        useEffect(() => {

            const firstLogin = localStorage.getItem('firstLogin')
            if(firstLogin){
                const getToken = async () => {
                const res = await axios.post('/api/user/refresh_token', null)
                dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
            }
            getToken()
            }
        },[auth.isLogged, dispatch])
    
        useEffect(() => {
            if(token){
            const getUser = () => {
                dispatch(dispatchLogin())
    
                return fetchUser(token).then(res => {
                dispatch(dispatchGetUser(res))
                })
            }
            getUser()
            }
        },[token, dispatch])

  

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                <CssBaseline />
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
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="firstName"
                                label="Nom"
                                name="firstName"
                                autoComplete="firstName"
                                value={user.firstName}
                                onChange={handleChangeInput}
                                autoFocus
                            />
                              <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="lastName"
                                label="Prénom"
                                name="lastName"
                                autoComplete="lastName"
                                value={user.lastName}
                                onChange={handleChangeInput}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Adresse e-mail"
                                name="email"
                                autoComplete="email"
                                value={user.email}
                                onChange={handleChangeInput}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Mot de passe"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={user.password}
                                onChange={handleChangeInput}
                                autoComplete="new-password"
                                InputProps={{
                                    endAdornment: (
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
                                type={showPassword ? 'text' : 'password'}
                                id="cf_password"
                                value={user.cf_password}
                                onChange={handleChangeInput}
                                autoComplete="new-password"
                                InputProps={{
                                    endAdornment: (
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
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/inv/signin" variant="body2">
                                        {"Vous avez un compte ? S'identifier"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
