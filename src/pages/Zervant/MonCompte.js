import React, { useRef, useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment } from '@mui/material';
import { Avatar, Button, Card, CardActions, CardContent, Divider, Typography, CardHeader, TextField} from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchLogin, fetchUser, dispatchGetUser } from '../../redux/actions/authAction';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Country, State }  from 'country-state-city';

import { isLength, isMatch } from '../../components/utils/Validation'
import { Routes, Route } from 'react-router-dom'
import Coordonnees from './Coordonnees'

const initialState = {
    name: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

const countries = Country.getAllCountries();



const MyProfile = () => {
	const location = useLocation()
	const axiosInstance = axios.create({
		baseURL : process.env.REACT_APP_SERVER_URL,
	  });
	const pathName = location.pathname.split("/");

	const dispatch = useDispatch()
	const auth = useSelector(state => state.auth)
	const token = useSelector(state => state.token)
	const {user} = auth
	const navigate = useNavigate()

	const [data, setData] = useState(initialState)
    const {name, password, cf_password, err, success} = data

	const handleChangeInput = (e)=>{
        e.preventDefault();
    }

	const [showPassword, setShowPassword] = useState(false)

	const handleClick = () =>{
		setShowPassword(!showPassword)
	}
	
	const handleMouseDown = (e)=>{
		e.preventDefault()
	} 
	const handleListItemClick = (event, index) => {
		setSelectedIndex(index)
	};

	const FirstNameRef = useRef();
	const LastNameRef = useRef();
	const phoneNumberRef = useRef();
	const PasswordRef = useRef();
	const CountryRef = useRef();
	const StateRef = useRef();
	const Cf_PasswordRef = useRef();
	const [avatar, setAvatar] = useState(false)
	const [loading, setLoading] = useState(false)
	const [selectedcountry, setSelectedCountry] = useState(user.country)
	const [selectedstate, setSelectedState] = useState(user.state)
	const [selectedIndex, setSelectedIndex] = useState('');

	const onchangeCountry = (e) => {
		setSelectedCountry(e.target.value)
	}

	const onchangeState = (e) => {
		setSelectedState(e.target.value)
	}

	const OnSubmitUpdateUser = () =>{

		const firstName = FirstNameRef.current.value;
		const lastName = LastNameRef.current.value;
		const phoneNumber = phoneNumberRef.current.value;
		const Password = PasswordRef.current.value;
		const Country = CountryRef.current.value;
		const State = StateRef.current.value;
		const Cf_Password = Cf_PasswordRef.current.value;

		if(Password ==='' && Cf_Password === ''){
			console.log("update data without pass")
			try {
				axios.patch('/api/user/update', 
				{
					firstName,
					lastName,
					phoneNumber,
					State,
					Country,
					avatar,
				},{
					headers: {Authorization: token}
				})
				toast.success("Profil a été mis a jour avec succes", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
				
			} catch (err) {
				
				toast.error("un erreur a été survenue", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
				
			}
		}else{
			if(!isLength(Password) && isMatch(Password, Cf_Password)){

				try {
					axios.post('/api/user/updatedata/', 
					{	
						firstName,
						lastName,
						phoneNumber,
						State,
						Country,
						Password,
						avatar,
					},{
						headers: {Authorization: token}
					})

					toast.success("mot de passe a été changer avec success", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					});
					
				} catch (err) {
					
					toast.error("un erreur a été survenue", {
						position: "top-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "colored",
					});
					
				}
			}

			if(isLength(Password)){
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
			}
			if(!isMatch(Password, Cf_Password)){
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
			}
			
		}
	}

	const changeAvatar = async(e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if(!file) return setData({...data, err: "No files were uploaded." , success: ''})

            if(file.size > 1024 * 1024)
                return setData({...data, err: "Size too large." , success: ''})

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setData({...data, err: "File format is incorrect." , success: ''})

            let formData =  new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading(false)
            setAvatar(res.data.url)
            toast.success("avatar a été changer", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
        } catch (err) {
            toast.error("error", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }
	const postDetails = (avatars) => {
		setLoading(true);
		if (avatars === undefined) {
		  toast({
			title: "Please Select an Image!",
			status: "warning",
			duration: 5000,
			isClosable: true,
			position: "bottom",
		  });
		  return;
		}
		console.log(avatars);
		if (avatars.type === "image/jpeg" || avatars.type === "image/png") {
		  const data = new FormData();
		  data.append("file", avatars);
		  data.append("upload_preset", "chat-app");
		  data.append("cloud_name", "piyushproj");
		  fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
			method: "post",
			body: data,
		  })
			.then((res) => res.json())
			.then((data) => {
			  setAvatar(data.url.toString());
			  console.log(data.url.toString());
			  setLoading(false);
			})
			.catch((err) => {
			  console.log(err);
			  setLoading(false);
			});
		} else {
		  toast({
			title: "Please Select an Image!",
			status: "warning",
			duration: 5000,
			isClosable: true,
			position: "bottom",
		  });
		  setLoading(false);
		  return;
		}
	  };

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
			const getUser = async () => {
				dispatch(dispatchLogin())

				return fetchUser(token).then(res => {
					dispatch(dispatchGetUser(res))
				})
			}
			getUser()
		}
	},[token, dispatch])
	const [dark, setDark] = useState(false);

	const darkTheme = createTheme({
        typography: {
            fontFamily: 'Whyte',
        },
        palette:{
			mode:'dark',
		}
    })

	const lightTheme = createTheme({
        typography: {
            fontFamily: 'Whyte',
        },
		palette:{
			background : {
				mode: 'light',
				default: "#f8f8f8"
			},
		}
	})

	return (

		<ThemeProvider theme={dark ? darkTheme : lightTheme}>
		<CssBaseline />
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				//py: 0
			}}
		>
			<Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
			
					
					<Grid
						container
						spacing={3}
					>
                        		
                        		
					<Grid item lg={4} md={6} xs={12}>
						<Card>
							<CardContent>
								<Box>
                              <Typography
								                position=""

								>
                                          <Button
										variant="outlined"
										fullWidth
										required
                                        style={{marginTop:"10px",height:"50px"}}
										selected={pathName[1] === '/myprofile/coordonnees'}
										onClick={(event)=>{navigate('/myprofile/coordonnees')
										handleListItemClick(event, '/myprofile/coordonnees')
									}}
										
									>Coordonnées de l'entreprise
									
									</Button>
								
                                <Button
										variant="outlined"
										fullWidth
										required
                                        style={{marginTop:"10px",height:"50px"}}
									>Paramètres de facturation</Button>
								
                                <Button
										variant="outlined"
										fullWidth
										required
                                        style={{marginTop:"10px",height:"50px"}}
									>Moyens de paiement</Button>
							
                                <Button
										variant="outlined"
										fullWidth
										required
                                        style={{marginTop:"10px",height:"50px"}}
									>Rappels de paiement</Button>
								
                                <Button
										variant="outlined"
										fullWidth
										required
                                        style={{marginTop:"10px",height:"50px"}}
									>Paiements en ligne</Button>
								
                                <Button
										variant="outlined"
										fullWidth
										required
                                        style={{marginTop:"10px",height:"50px"}}
									>Compte utilisateur</Button>
								
                                <Button
										variant="outlined"
										fullWidth
										required
                                        style={{marginTop:"10px",height:"50px"}}
									>Mon abonnement</Button>
							
                                <Button
										variant="outlined"
										fullWidth
										required
                                        style={{marginTop:"10px" ,height:"50px"}}
									>Parrainage</Button>
							
									
								
								</Typography>
								</Box>

							</CardContent>
							<Divider />
						
						</Card>
					</Grid>
			
					</Grid>
					<Box
           
		   >
			   <Routes>
				   <Route path='/myprofile/coordonnees' element={<Coordonnees/>} />
			 </Routes>
		   </Box>
			</Container>
    	</Box>
		</ThemeProvider>
	)
}

export default MyProfile