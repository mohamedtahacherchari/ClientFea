import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconButton, InputAdornment } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {
	Container,
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Checkbox,
	Divider,
	FormControlLabel,
	Grid,
	Typography,
	TextField
} from '@mui/material';

import axios from "axios";
import {useSelector} from 'react-redux'

import { Country, State }  from 'country-state-city';
const countries = Country.getAllCountries();

const Client = () => {

	const token = useSelector(state => state.token)

	const [selectedcountry, setSelectedCountry] = useState()
	const [selectedstate, setSelectedState] = useState()
	const [show2, setShow2] = useState(false)
	const [show3, setShow3] = useState(false)
	const [show4, setShow4] = useState(false)
	const [show5, setShow5] = useState(false)
	const [show6, setShow6] = useState(false)
	
	const FirstNameRef = useRef();
	const LastNameRef = useRef();
	const phoneNumberRef = useRef();
	const phoneNumber2Ref = useRef();
	const companyNameRef = useRef();
	const EmailRef = useRef();
	const CountryRef = useRef();
	const StateRef = useRef();

	const StepName1Ref = useRef();
	const Description1Ref = useRef();
	const StepName2Ref = useRef();
	const Description2Ref = useRef();
	const StepName3Ref = useRef();
	const Description3Ref = useRef();
	const StepName4Ref = useRef();
	const Description4Ref = useRef();
	const StepName5Ref = useRef();
	const Description5Ref = useRef();
	const StepName6Ref = useRef();
	const Description6Ref = useRef();
	const StepName7Ref = useRef();
	const Description7Ref = useRef();
	const StepName8Ref = useRef();
	const Description8Ref = useRef();
	const StepName9Ref = useRef();
	const Description9Ref = useRef();
	const StepName10Ref = useRef();
	const Description10Ref = useRef();

	const onchangeCountry = (e) => {
		setSelectedCountry(e.target.value)
	}

	const onchangeState = (e) => {
		setSelectedState(e.target.value)
	}

	let StepName1 = ''
	let StepName2 = ''
	let StepName3 = ''
	let StepName4 = ''
	let StepName5 = ''
	let StepName6 = ''
	let StepName7 = ''
	let StepName8 = ''
	let StepName9 = ''
	let StepName10 = ''

	let Description1 = ''
	let Description2 = ''
	let Description3 = ''
	let Description4 = ''
	let Description5 = ''
	let Description6 = ''
	let Description7 = ''
	let Description8 = ''
	let Description9 = ''
	let Description10 = ''

	const OnSubmitHandler = async(e) =>{
		const FirstName = FirstNameRef.current.value;
		const LastName = LastNameRef.current.value;
		const Phone_Number = phoneNumberRef.current.value;
		const Phone_Number2 = phoneNumber2Ref.current.value;
		const CompanyName = companyNameRef.current.value;
		const Email = EmailRef.current.value;
		const Country = CountryRef.current.value;
		const State = StateRef.current.value;

		console.log(FirstName, LastName, Phone_Number, Phone_Number2, CompanyName, Email, Country, State)

		StepName1 = StepName1Ref.current.value;
		Description1 = Description1Ref.current.value;

		StepName2 = StepName2Ref.current.value;
		Description2 = Description2Ref.current.value;

		StepName3 = StepName3Ref.current.value;
		Description3 = Description3Ref.current.value;

		StepName4 = StepName4Ref.current.value;
		Description4 = Description4Ref.current.value;

		StepName5 = StepName5Ref.current.value;
		Description5 = Description5Ref.current.value;

		if(show2!==false){
			StepName6 = StepName6Ref.current.value;
			Description6 = Description6Ref.current.value;
		}

		if(show3!==false){
			StepName7 = StepName7Ref.current.value;
			Description7 = Description7Ref.current.value;
		}

		if(show4!==false){
			StepName8 = StepName8Ref.current.value;
			Description8 = Description8Ref.current.value;
		}

		if(show5!==false){
			StepName9 = StepName9Ref.current.value;
			Description9 = Description9Ref.current.value;
		}

		if(show6!==false){
			StepName10 = StepName10Ref.current.value;
			Description10 = Description10Ref.current.value;
		}

		console.log(StepName1, Description1)
		console.log(StepName2, Description2)
		console.log(StepName3, Description3)
		console.log(StepName4, Description4)
		console.log(StepName5, Description5)
		console.log(StepName6, Description6)
		console.log(StepName7, Description7)
		console.log(StepName8, Description8)
		console.log(StepName9, Description9)
		console.log(StepName10, Description10)

		try {
			const res = await axios.post('/api/client', {
				FirstName, 
				LastName, 
				Phone_Number, 
				Phone_Number2, 
				CompanyName, 
				Email, 
				Country, 
				State,
				StepName1,
				Description1,
				StepName2,
				Description2,
				StepName3,
				Description3,
				StepName4,
				Description4,
				StepName5,
				Description5,
				StepName6,
				Description6,
				StepName7,
				Description7,
				StepName8,
				Description8,
				StepName9,
				Description9,
				StepName10,
				Description10,
			}, {
				headers: {Authorization: token}
			})

			toast.success('Client Ajouter avec Succées' , {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} catch (err) {
			console.log(err)
			toast.error('Un erreur a été produit' , {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
		
	}

	return (
		<>
			<Box
			component="main"
			sx={{
				flexGrow: 1,
				py: 8
			}}
			>
			<Container maxWidth="lg">
			<ToastContainer />
				<Card>
					<CardHeader
						subheader="Ajouter Client"
						title="Clients"
					/>
					<Divider />
					<CardContent>
						
					<Grid container spacing={3}>
						<Grid item md={6} xs={12}>
							<TextField
								helperText="Merci de préciser le prénom"
								label="Prenom"
								name="firstName"
								inputRef={FirstNameRef}
								variant="outlined"
								fullWidth
								required
							/>
								
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label="Nom"
								name="lastName"
								inputRef={LastNameRef}
								required
								
								variant="outlined"
							/>
									
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label="Adresse e-mail"
								name="email"
								type="email" 
								id="email"
								inputRef={EmailRef}
								variant="outlined"
								
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label="Numéro de téléphone"
								name="phone"
								inputRef={phoneNumberRef}
								type="number"
								variant="outlined"
							/>
						</Grid>
						
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label="Numéro de téléphone fixe"
								name="phone2"
								inputRef={phoneNumber2Ref}
								type="number"
								variant="outlined"
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label="Nom de l'entreprise"
								name="companyName"
								inputRef={companyNameRef}
								variant="outlined"
							/>
						</Grid>
						<Grid item md={6} xs={12} >
							<TextField
								fullWidth
								label="Sélectionnez Pays"
								name="country"
								onChange={onchangeCountry}
								inputRef={CountryRef}
								required
								select
								SelectProps={{ native: true }}
								value={selectedcountry}
								variant="outlined"
							>
							{
								countries.map((option) => (
									<option
										key={option.name}
										//value={option.value}
										value={option.isoCode}
										>
										{option.name}
									</option>
								))
							}
							</TextField>

						</Grid>
						
						<Grid item md={6} xs={12} >
							<TextField
								fullWidth
								label="Sélectionnez Ville"
								name="state"
								onChange={onchangeState}
								inputRef={StateRef}
								required
								select
								SelectProps={{ native: true }}
								value={selectedstate}
								variant="outlined"
							>
							{
								State.getStatesOfCountry(selectedcountry).map((option) => (
									<option
										key={option.name}
										//value={option.value}
										value={option.isoCode}
									>
										{option.name}
									</option>
								))
							}
										
							</TextField>

						</Grid>
						
					</Grid>
					</CardContent>
					<Divider />

					
					<CardHeader
						title="Process de Recrutement"
					/>

					<Divider />
					
					<CardContent>
						<Grid container spacing={3}>
						<Grid item md={5} xs={12}>
							<TextField
								fullWidth
								label="Nom de l'etape "
								name="StepName1"
								inputRef={StepName1Ref}
								variant="outlined"
							/>
							
						</Grid>

						<Grid item md={5} xs={12}>
							<TextField
								fullWidth
								label="Description"
								name="Description1"
								inputRef={Description1Ref}
								variant="outlined"
							/>
						</Grid>

						<Grid item md={5} xs={12}>
							<TextField
								fullWidth
								label="Nom de l'etape"
								name="StepName2"
								inputRef={StepName2Ref}
								variant="outlined"
							/>
							
						</Grid>

						<Grid item md={5} xs={12}>
							<TextField
								fullWidth
								label="Description"
								name="Description2"
								inputRef={Description2Ref}
								variant="outlined"
							/>
						</Grid>

						<Grid item md={5} xs={12}>
							<TextField
								fullWidth
								label="Nom de l'etape"
								name="StepName3"
								inputRef={StepName3Ref}
								variant="outlined"
							/>
							
						</Grid>

						<Grid item md={5} xs={12}>
							<TextField
								fullWidth
								label="Description"
								name="Description"
								inputRef={Description3Ref}
								variant="outlined"
							/>
						</Grid>

						<Grid item md={5} xs={12}>
							<TextField
								fullWidth
								label="Nom de l'etape"
								name="StepName"
								inputRef={StepName4Ref}
								variant="outlined"
							/>
							
						</Grid>

						<Grid item md={5} xs={12}>
							<TextField
								fullWidth
								label="Description"
								name="Description"
								inputRef={Description4Ref}
								variant="outlined"
							/>
						</Grid>

						{/* Etape 5 */}
						<Grid item md={5} xs={12}>
							<TextField
								fullWidth
								label="Nom de l'etape"
								name="StepName5"
								inputRef={StepName5Ref}
								variant="outlined"
							/>
							
						</Grid>

						<Grid item md={5} xs={12}>
							<TextField
								fullWidth
								label="Description"
								name="Description5"
								inputRef={Description5Ref}
								variant="outlined"
							/>
						</Grid>
					
						<Grid item md={1} xs={12}>
							<IconButton aria-label="add" size="large" onClick={()=>setShow2(true)}>
								<AddIcon />
							</IconButton>
						</Grid>


						{/* Etape 6 */}
						{show2 ? (<>
							<Grid item md={5} xs={12}>
							<TextField
								fullWidth
								label="Nom de l'etape"
								name="StepName6"
								inputRef={StepName6Ref}
								variant="outlined"
							/>
							
						</Grid>

						<Grid item md={5} xs={12}>
							<TextField
								fullWidth
								label="Description"
								name="Description"
								inputRef={Description6Ref}
								variant="outlined"
							/>
						</Grid>

						<Grid item md={1} xs={12}>
							<IconButton aria-label="delete" size="large" onClick={()=>setShow2(false)}>
								<DeleteIcon />
							</IconButton>
						</Grid>
						
						<Grid item md={1} xs={12}>
							<IconButton aria-label="add" size="large" onClick={()=>setShow3(true)}>
								<AddIcon />
							</IconButton>
						</Grid>
						</>
						) : (<></>)}
						
						{show3 ? (<>
							<Grid item md={5} xs={12}>
							<TextField
								fullWidth
								label="Nom de l'etape"
								name="StepName7"
								inputRef={StepName7Ref}
								variant="outlined"
							/>
							
						</Grid>

						<Grid item md={5} xs={12}>
							<TextField
								fullWidth
								label="Description"
								name="Description"
								inputRef={Description7Ref}
								variant="outlined"
							/>
						</Grid>

						<Grid item md={1} xs={12}>
							<IconButton aria-label="delete" size="large" onClick={()=>setShow3(false)}>
								<DeleteIcon />
							</IconButton>
						</Grid>
						
						<Grid item md={1} xs={12}>
							<IconButton aria-label="add" size="large" onClick={()=>setShow4(true)}>
								<AddIcon />
							</IconButton>
						</Grid>
						</>):(<></>)}

						{show4 ? (<>
							<Grid item md={5} xs={12}>
							<TextField
								fullWidth
								label="Nom de l'etape"
								name="StepName"
								inputRef={StepName8Ref}
								variant="outlined"
							/>
							
						</Grid>

						<Grid item md={5} xs={12}>
							<TextField
								fullWidth
								label="Description"
								name="Description"
								inputRef={Description8Ref}
								variant="outlined"
							/>
						</Grid>

						<Grid item md={1} xs={12}>
							<IconButton aria-label="delete" size="large" onClick={()=>setShow4(false)}>
								<DeleteIcon />
							</IconButton>
						</Grid>
						
						<Grid item md={1} xs={12}>
							<IconButton aria-label="add" size="large" onClick={()=>setShow5(true)}>
								<AddIcon />
							</IconButton>
						</Grid>
						</>):(<></>)}

						{show5 ? (<>
							<Grid item md={5} xs={12}>
							<TextField
								fullWidth
								label="Nom de l'etape"
								name="StepName"
								inputRef={StepName9Ref}
								variant="outlined"
							/>
							
						</Grid>

						<Grid item md={5} xs={12}>
							<TextField
								fullWidth
								label="Description"
								name="Description9"
								inputRef={Description9Ref}
								variant="outlined"
							/>
						</Grid>

						<Grid item md={1} xs={12}>
							<IconButton aria-label="delete" size="large" onClick={()=>setShow5(false)}>
								<DeleteIcon />
							</IconButton>
						</Grid>
						
						<Grid item md={1} xs={12}>
							<IconButton aria-label="add" size="large" onClick={()=>setShow6(true)}>
								<AddIcon />
							</IconButton>
						</Grid>
						</>):(<></>)}

						{show6 ? (<>
							<Grid item md={5} xs={12}>
							<TextField
								fullWidth
								label="Nom de l'etape"
								name="StepName"
								inputRef={StepName10Ref}
								variant="outlined"
							/>
							
						</Grid>

						<Grid item md={5} xs={12}>
							<TextField
								fullWidth
								label="Description"
								name="Description10"
								inputRef={Description10Ref}
								variant="outlined"
							/>
						</Grid>

						<Grid item md={1} xs={12}>
							<IconButton aria-label="delete" size="large" onClick={()=>setShow6(false)}>
								<DeleteIcon />
							</IconButton>
						</Grid>						
						</>):(<></>)}


					</Grid>
					</CardContent>

					<Box
						sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						p: 2
						}}
					>
						<Button
						color="primary"
						variant="contained"
						onClick={OnSubmitHandler}
						>
						Ajouter Client
						</Button>
					</Box>
					</Card>
				
				
				<Box sx={{ pt: 3 }}>
				

				</Box>
			</Container>
			
			</Box>
		</>
	)
}

export default Client
