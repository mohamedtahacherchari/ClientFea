import React, { useRef, useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { IconButton, InputAdornment } from '@mui/material';
import { Avatar, Button, Card, CardActions, CardContent, Divider, Typography, CardHeader, TextField} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchLogin, fetchUser, dispatchGetUser } from '../../redux/actions/authAction';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import { dispatchGetAllhardSkill, fetchAllhardSkill } from '../../redux/actions/hardskillAction'
import { dispatchGetAllsoftSkill, fetchAllsoftSkill } from '../../redux/actions/softskillAction'

import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Country, State }  from 'country-state-city';

import { isLength, isMatch } from '../../components/utils/Validation'

import ListItem from '@mui/material/ListItem';
import Skill from './Skill';
import { Link } from 'react-router-dom';

import FrontSheet from './FrontSheet';
import Qualification from './Qualification';

const countries = Country.getAllCountries();


const AddCandidat = () => {
    const dispatch = useDispatch()
	const auth = useSelector(state => state.auth)
	const token = useSelector(state => state.token)
	const softSkills = useSelector(state => state.softSkills)
    const hardSkills = useSelector(state => state.hardSkills)
    const {user} = auth
    
    const CountryRef = useRef();
	const StateRef = useRef();
    const LastNameRef = useRef();
    const FirstNameRef = useRef();
    const EmailRef = useRef();
    const phoneNumberRef = useRef();
    const PositionRef = useRef();
    const disponabiliteRef = useRef();
    const contractRef = useRef();    

    const [selectedcountry, setSelectedCountry] = useState(user.country)
	const [selectedstate, setSelectedState] = useState(user.state)
    const [Disponability, setDisponability] = useState('');
    const [fileData, setFileData] = useState();
	const [Contract, setContract] = useState('');
    
    const data = new FormData();
    const fileChangeHandler = (e) => {
        setFileData(e.target.files[0]);
    };
    const handleradioChange = (event) => {
        setContract(event.target.value);
    };
    const handleselectChange = (event) => {
        setDisponability(event.target.value);
    };
    const onchangeCountry = (e) => {
		setSelectedCountry(e.target.value)
	}
	const onchangeState = (e) => {
		setSelectedState(e.target.value)
	}
    const handleanimation = (e) => {
        e.preventDefault();
    }
    const onSubmitHandler = async(e) => {
        e.preventDefault()
        
        data.append("image", fileData);
        console.log("FileData :", fileData)
        console.log("data :", data)
        
        fetch("http://localhost:5000/single", {
            method: "POST",
            body: data,
        })
            .then((result) => {
                console.log(result)
            console.log("File Sent Successful");
            console.log(result);
            })
            .catch((err) => {
                console.log(err.message);
            });
        
        
    }

    const onSubmitget = async(e) =>{
        fetch("http://localhost:5000/single", {
            method: "GET"
        })
            .then(function(res)  {
                return res.json()
            })
            .then(function(myJson){
                
				console.log(myJson)
                myJson.map(js => (
                    
                    document.getElementById("nom").value = js.FirstName,
                    document.getElementById("prenom").value = js.LastName,
                    document.getElementById("Email").value = js.Email,
                    document.getElementById("TEL").value = js.Phone_Number
                    
                ))
                
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    
    const [open, setOpen] = useState(false);
    const [isHidden, setisHidden] = useState(false)
    const [value, setValue] = useState([]);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [ Language, setLanguages] = useState([])
    const [ Framework, setFramework] = useState([])
    const [ basededonne, setBaseDonne] = useState([])
    const [ controleversion, setControlVersion] = useState([])
    const [ Hskill, setHskill] = useState([])
    const [ sf, setSf ] = useState([])
    const [datafront, setDatafront] = useState('');
	const datapassed = [];
    const [openQ, setOpenQ] = useState(false);
    const dataqualification = [];
    


    const OnSubmitAddCandidat = async (e) =>{
        const lastName = LastNameRef.current.value;
        const firstName = FirstNameRef.current.value;
        const Email = EmailRef.current.value;
        const Phone = phoneNumberRef.current.value;
        const Position = PositionRef.current.value;

        var Status;
        if(Disponability === 1)
            Status = "Actif";
        if(Disponability === 2)
            Status = "Passif";
        if(Disponability === 3)
            Status = "Non Disponible";

        console.log(selectedcountry)
        console.log(selectedstate)
        console.log(lastName)
        console.log(firstName)
        console.log(Email)
        console.log(Phone)
        console.log(Status)
        console.log(Position)
        console.log(Contract)
        console.log("Language: ", Language)
        console.log("Framework: ", Framework)
        console.log("Database :", basededonne)
        console.log("Controle Version :", controleversion)
        console.log("Soft Skills :", sf)

        let hardskill = [ ...Language , ...Framework , ...basededonne , ...controleversion]
        try {
            const res = await axios.post('/api/candidat', {
                FirstName: firstName,
                LastName: lastName,
                Email,
                Phone_Number: Phone,
                Position,
                Contract,
                Status: Disponability,
                Ville: selectedcountry,
                State: selectedstate,
                Cv: "url",
                hardskill,
                softskill: sf
            },{
				headers: {Authorization: token}
			})
            setisHidden(true)
            toast.success('Candidat Ajouter avec succées' , {
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
            toast.error("Erreur", {
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

    const handleClose = () => {
		setOpen(false);
	};

    const handleClickOpen = (e) =>{
        datapassed[0] = LastNameRef.current.value
		datapassed[1] = FirstNameRef.current.value
		datapassed[2] = PositionRef.current.value
		setDatafront(datapassed)
		setOpen(true);
    }

    const handleopenQ = (e)=>{
        setOpenQ(true)
    }

    const handlecloseQ = (e)=>{
        setOpenQ(false)
    }

    useEffect(() =>{
        fetchAllhardSkill(token).then(res =>{
            dispatch(dispatchGetAllhardSkill(res))
        })

        fetchAllsoftSkill(token).then(res =>{
            dispatch(dispatchGetAllsoftSkill(res))
        })

    }, [token, dispatch])

    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                overflow: 'auto',
            }}>
			<Container maxWidth="lg" sx={{ mt: 1, mb: 4 }}>
					<Typography sx={{ mb: 3 }} variant="h4">
						Candidat
					</Typography>
					<Grid container spacing={3}>
						<ToastContainer />
					<Grid item xs={12} md={8} lg={9}>
                    
							<Card>
                                <Link to="/candidats" style={{ textDecoration: "none" , color: '#FFFF'}}>
                                    <Button variant="outlined" component="label" startIcon={<ArrowBackIcon/>}>
                                        Liste candidats
                                    </Button>
                                </Link>
								<CardHeader subheader="formulaire" title="Ajouter un Candidat"/>
                                
                                    <Grid 
                                        container
                                        direction="row"
                                        justifyContent="flex-end"
                                        alignItems="center">
                                        
                                                <Button variant="contained" component="label" startIcon={<UploadFileIcon/>}>
                                                    <input hidden type="file" onChange={fileChangeHandler} />
                                                    Importer CV
                                                </Button>
                                                <Button onClick={onSubmitHandler}>Submit File to Backend</Button>
                                                <Button onClick={onSubmitget}>get data</Button>
                                    </Grid>
                                
								<Divider />
								<CardContent>
								<Grid container spacing={3}>
									<Grid item md={6} xs={12}>
									<TextField
										fullWidth
                                        id="nom"
										label="Nom"
										name="lastName"
                                        autoComplete="LastName"
										inputRef={LastNameRef}
										required
										variant="outlined"
                                        focused
									/>
									
									</Grid>
									<Grid item md={6} xs={12}>
									
									<TextField
										//helperText="Merci de préciser le prénom"
                                        id="prenom" 
										label="Prenom"
										name="firstName"
                                        autoComplete="firstName"
										inputRef={FirstNameRef}
										variant="outlined"
										fullWidth
                                        focused
										required
									/>
									</Grid>
									<Grid item md={6} xs={12}>
										<TextField
											fullWidth
                                            id="Email" 
											label="Adresse e-mail"
											name="email"
											type="email" 
											inputRef={EmailRef}
											variant="outlined"
                                            focused
										/>
									</Grid>
									<Grid item md={6} xs={12}>
									<TextField
										fullWidth
                                        id="TEL"
										label="Numéro de téléphone"
										name="phone"
										inputRef={phoneNumberRef}
										variant="outlined"
                                        onChange={handleanimation}
                                        focused
									/>
									</Grid>
									<Grid item md={6} xs={12}>
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
									<Grid item md={6} xs={12}>
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
                                            focused={true}
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
									<Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="Poste" 
                                            label="Poste" 
                                            inputRef={PositionRef}
                                            fullWidth
                                            autoComplete="Poste"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} sx={{ mb:2 }} >
                                        <FormControl variant="outlined" sx={{minWidth: 350 }}>
                                            <InputLabel id="input-disponability">Disponabilité</InputLabel>
                                            <Select
                                            labelId="select-label-disponability"
                                            id="select-standard"
                                            value={Disponability}
                                            onChange={handleselectChange}
                                            label="Disponabilité"
                                            inputRef={disponabiliteRef}
                                            >
                                                <MenuItem value={1}>Actif</MenuItem>
                                                <MenuItem value={2}>Passif</MenuItem>
                                                <MenuItem value={3}>Non disponible</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <FormControl  sx={{ ml: 5 }}>
                                        <FormLabel id="demo-row-radio-buttons-group-label">Contrat</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            value={Contract}
                                            onChange={handleradioChange}
                                            inputref = {contractRef}>
                                                <FormControlLabel value="Stage" control={<Radio />} label="Stage" />
                                                <FormControlLabel value="CDI" control={<Radio />} label="CDI" />
                                                <FormControlLabel value="CDD" control={<Radio />} label="CDD"  />
                                                <FormControlLabel value="Freelance" control={<Radio />} label="Freelance" />
                                                <FormControlLabel value="Sans Contract" control={<Radio />} label="Sans Contract" />
                                        </RadioGroup>
                                    </FormControl>

                                    <Grid item md={8} xs={12}>
                                        <Autocomplete
                                            multiple
                                            id="tags-outlined"
                                            options={ hardSkills.filter((l)=>{
                                                return l.typeHardskill === 'Languages'
                                            }) }
                                            getOptionLabel={(option) => option.hardskillName}
                                            //defaultValue={[softSkill[13]]}
                                            filterSelectedOptions
                                            value={Language}
                                            onChange={(event, newValue) => {
                                                setLanguages(newValue)
                                                
                                            }}
                                            renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Languages"
                                                placeholder="Languages"
                                            />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item md={8} xs={12}>
                                        <Autocomplete
                                            multiple
                                            id="tags-outlined"
                                            options={hardSkills.filter((f)=>{
                                                return f.typeHardskill === 'Framework'
                                            })}
                                            value={Framework}
                                            onChange={(event, newValue) => {
                                                setFramework(newValue)
                                                
                                            }}
                                            getOptionLabel={(option) => option.hardskillName}
                                            //defaultValue={[softSkill[13]]}
                                            filterSelectedOptions
                                            renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Framework"
                                                placeholder="Framework"
                                            />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item md={8} xs={12}>

                                        <Autocomplete
                                            multiple
                                            id="tags-outlined"
                                            options={hardSkills.filter((bd)=>{
                                                return bd.typeHardskill === 'Base de donnée'
                                            })}
                                            getOptionLabel={(option) => option.hardskillName}
                                            //defaultValue={[softSkill[13]]}
                                            filterSelectedOptions
                                            value={basededonne}
                                            onChange={(event, newValue) => {
                                                setBaseDonne(newValue);
                                                
                                            }}
                                            renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Base de donnée"
                                                placeholder="Base de donnée"
                                            />
                                            )}
                                        />
                                    </Grid>

                                    <Grid item md={8} xs={12}>

                                        <Autocomplete
                                            multiple
                                            id="tags-outlined"
                                            options={hardSkills.filter((cv)=>{
                                                return cv.typeHardskill === 'Contrôle de version'
                                            })}
                                            getOptionLabel={(option) => option.hardskillName}
                                            //defaultValue={[softSkill[13]]}
                                            filterSelectedOptions
                                            value={controleversion}
                                            onChange={(event, newValue) => {
                                                setControlVersion(newValue)
                                                
                                            }}
                                            renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Contrôle de version"
                                                placeholder="Contrôle de version"
                                            />
                                            )}
                                        />
                                    
                                    </Grid>

                                    <Grid item md={8} xs={12}>

                                        <Autocomplete
                                            multiple
                                            id="tags-outlined"
                                            options={softSkills}
                                            getOptionLabel={(option) => option.softskillName}
                                            //defaultValue={[softSkill[13]]}
                                            value={sf}
                                            onChange={(event, newValue) => {
                                                setSf(newValue);
                                            }}
                                            filterSelectedOptions
                                            renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Soft Skill"
                                                placeholder="Soft Skill"
                                            />
                                            )}
                                        />
                                    </Grid>
                                    
                                    <Grid item xs={12}>
                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 150}}>
                                            <form onSubmit={onSubmitHandler}>
                                                <Button variant="contained" component="label" startIcon={<UploadFileIcon/>}>
                                                    <input hidden type="file" onChange={fileChangeHandler} />
                                                    Importer CV
                                                </Button>
                                                {/*<Button type="submit">Submit File to Backend</Button>*/}
                                            </form>
                                        </FormControl>
                                    </Grid>
                                    
                                    <Grid item md={6} xs={12} >
                                        { isHidden &&
                                        (
                                            <>
                                            <Button variant="contained" onClick={handleClickOpen}>FrontSheet</Button>
                                            </>
                                        )}
                                    </Grid>
                                    <Grid item md={6} xs={12} >
                                        { isHidden &&
                                        (
                                            <>
                                            <Button variant="contained" onClick={handleopenQ}>Qualification</Button>
                                            </>
                                        )}
                                    </Grid>

                                    {/* frontsheet */}
                                    <Dialog open={open} onClose={handleClose} maxWidth={'lg'} fullScreen={fullScreen}>
                                        <DialogActions>
                                        </DialogActions>
                                        <FrontSheet frontsheetvariables={datafront }/>

                                    </Dialog>

                                    <Dialog open={openQ} onClose={handlecloseQ} sx={{ '& .MuiDialog-paper': { width: '100%' } }} fullScreen={true}>
                                        <DialogActions>
                                        </DialogActions>
                                        <Qualification qualificationvariables={dataqualification}/>

                                    </Dialog>

								</Grid>
								</CardContent>
								<Divider />
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
									onClick={OnSubmitAddCandidat}
									
								>
                                    Ajouter Candidat
								</Button>
								</Box>
							</Card>
					</Grid>
					</Grid>
				
			</Container>
    	</Box>
    )
}

export default AddCandidat
