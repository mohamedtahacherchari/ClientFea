import React, {useState,useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import {useParams} from 'react-router-dom'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import {  useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
import { json, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {dispatchLogin} from '../../redux/actions/authAction'
import { useDispatch } from 'react-redux'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment } from '@mui/material';
import GoogleOneTapLogin from './GoogleOneTapLogin';
import { Routes, Route } from 'react-router-dom'
import {fetchUser, dispatchGetUser } from '../../redux/actions/authAction';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();





function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
		{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
			GreenLinks
			</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
		</Typography>
	);
}

const InitialState = {
	email: '',
	password: '',

}

export default function SignIn() {
    const [user, setUser] = useState(InitialState);
    const auth = useSelector(state => state.auth)
	const dispatch = useDispatch();
	const navigate = useNavigate();
     const {email, password} = user

	const handleChangeInput = e => {
		const {name, value} = e.target
		setUser({...user, [name]: value})
	}

	const [showPassword, setShowPassword] = useState(false)
	const token = useSelector(state => state.token)

	const handleClick = () =>{
		setShowPassword(!showPassword)
	}

	const handleMouseDown = (e)=>{
		e.preventDefault()
	} 

	const handleSubmit2= async(event) => {

		event.preventDefault();
		try {
		const res = await axios.post('/api/user/login', {email, password},
		{
			headers: {Authorization: token}
		  }
	   
	)
		
		setUser({...user, err: '', success: res.data.msg})
		
		sessionStorage.setItem('firstLogin', true)

		dispatch(dispatchLogin())

	

		toast.success('Bienvenue' , {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		sessionStorage.setItem("userInfo", JSON.stringify(res));
		navigate('/inv/accueil');
		} catch (err) {

	err.response.data.msg && setUser({...user, err: '', success: ''})
		
		
		toast.error("error logging in", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});

		}

	};
	const handleSubmit3 = async (event) => {
		event.preventDefault();
		try {
			const res = await axios.post('/api/user/login', { email, password }, {
				headers: { Authorization: token }
			});
	
			setUser({ ...user, err: '', success: res.data.msg });
			sessionStorage.setItem('firstLogin', true)
           dispatch(dispatchLogin())
		
	
			// Stockage des informations de l'utilisateur dans la session côté serveur
			const storeSessionRes = await axios.post('/api/user/storeSession', { userInfo: res.data });
			if (storeSessionRes.data.error) {
				console.log(storeSessionRes.data.error)
				// Si la session n'est pas stockée avec succès, affichez un message d'erreur et quittez la fonction
				throw new Error(storeSessionRes.data.error);
				
			}
	
			toast.success('Bienvenue', {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			sessionStorage.setItem("userInfo", JSON.stringify(res));
			navigate('/inv/accueil');

			
		} catch (err) {
			err.response.data.msg && setUser({...user, err: '', success: ''})
			setUser({ ...user, err: '', success: '' });
			toast.error(err.message || "error logging in", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const res = await axios.post('/api/user/login', { email, password }, {
				headers: { Authorization: token }
			});
			setUser({ ...user, err: '', success: res.data.msg });
			sessionStorage.setItem('firstLogin', true);
			dispatch(dispatchLogin());
	   // Stockage des informations de l'utilisateur dans la session côté serveur
			const storeSessionRes = await axios.post('/api/user/storeSession', { userInfo: res.data });
			
			if (storeSessionRes.data.message) {
				// La session a été stockée avec succès
				
				toast.success('Bienvenue', {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				sessionStorage.setItem("userInfo", JSON.stringify(res));
				navigate('/inv/accueil');
			} else {
				// En cas d'échec du stockage de la session
				throw new Error(storeSessionRes.data.error);

			}
		} 
		catch (err) {
			setUser({ ...user, err: '', success: '' });
			toast.error(err.message || "error logging in", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};
	

	useEffect(() => {

		const firstLogin = sessionStorage.getItem('firstLogin')
		if(firstLogin){
			const getToken = async () => {
			const res = await axios.post('/api/user/refresh_token', null)
			dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
		}
		getToken()
		}
	},[auth.isLogged, dispatch])

	useEffect(() => {
	//	console.log(token)
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
	console.log(token,"hello hello token")

	return (
		<div>
		<ThemeProvider theme={theme}>
		  <CssBaseline />
		  <Grid container component="main" sx={{ height: '100vh' }}>
			<ToastContainer />
			<Grid item xs={12} component={Paper} elevation={6} square>
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
				  <LoginIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
				  Se connecter
				</Typography>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
				  <TextField
					margin="normal"
					required
					fullWidth
					id="email"
					label="Adresse Email"
					name="email"
					autoComplete="email"
					value={user.email}
					onChange={handleChangeInput}
					autoFocus
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
				  <FormControlLabel
					control={<Checkbox value="remember" color="primary" />}
					label="Se souvenir de moi"
				  />
				  <Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				  >
					Se connecter
				  </Button>
				  <Grid container>
					<Grid item xs>
					  <Link href="/forgot" variant="body2">
						Mot de passe oublié ?
					  </Link>
					</Grid>
					<Grid item>
					  <Link href="/inv/register" variant="body2">
						{"Vous n'avez pas de compte ? S'inscrire"}
					  </Link>
					</Grid>
				  </Grid>
				</Box>
			  </Box>
			</Grid>
		  </Grid>
		</ThemeProvider>
	  </div>
	);
}