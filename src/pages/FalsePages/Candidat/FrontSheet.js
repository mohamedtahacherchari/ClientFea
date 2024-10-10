import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import SaveIcon from '@mui/icons-material/Save';
import React, { useEffect, useRef } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from 'react-redux'
//import { useBeforeunload } from 'react-beforeunload';

const theme = createTheme();

function Copyright(props) {
	return (
	  <Typography variant="body2" color="text.secondary" align="center" {...props}>
		{'Copyright © '}
		
		Ce document est la propriété de GREEN LINKS – Cabinet de Consultants en Recrutement – 
		{' '}
		{new Date().getFullYear()}
		{'.'}
	  </Typography>
	);
}

const FrontSheet = ({frontsheetvariables}) => {

    const handleanimation = (e)=>{
        e.preventDefault();
    }

	const LastNameRef = useRef();
  	const FirstNameRef = useRef();
  	const PositionRef = useRef();
	const TrainingRef = useRef();
	const CertificationRef = useRef();
	const Skills_SummaryRef = useRef();
	const Soft_SkillsRef = useRef();
	const Hard_SkillsRef = useRef();
	const LanguagesRef = useRef();
	const Starting_DateRef = useRef();
	const Salary_WantedRef = useRef();
	const Salary_CurrentRef = useRef();
	const DisponabilityRef = useRef();
	const RemarksRef = useRef();

	const token = useSelector(state => state.token)

    const OnSubmitAddCandidatDetailHandler = async (e) => {
		
		const LastName = LastNameRef.current.value;
		const FirstName = FirstNameRef.current.value;
		const Position = PositionRef.current.value;
		const Training = TrainingRef.current.value;
		const Certification = CertificationRef.current.value;
		const Skills_Summary = Skills_SummaryRef.current.value;
		const Soft_Skills = Soft_SkillsRef.current.value;
		const Hard_Skills = Hard_SkillsRef.current.value;
		const Languages = LanguagesRef.current.value;
		const Starting_Date = Starting_DateRef.current.value;
		const Salary_Wanted = Salary_WantedRef.current.value;
		const Salary_Current = Salary_CurrentRef.current.value;
		const Disponability = DisponabilityRef.current.value;
		const Remarks = RemarksRef.current.value;

		try {
			const r = await axios.get('http://localhost:5000/api/candidat/getlastitem', {
				headers: {Authorization: token}
			})

			const ide = r.data[0]._id
			console.log("ide is : ", ide)

            const res = await axios.patch('http://localhost:5000/api/candidat/detail/', {
				ide,
				LastName,
				FirstName,
				Position,
				Training,
				Certification,
				Skills_Summary,
				Soft_Skills,
				Hard_Skills,
				Languages,
				Starting_Date,
				Salary_Wanted,
				Salary_Current,
				Disponability,
				Remarks
            }, {
				headers: {Authorization: token}
			})
			toast.success('Candidat frontsheet a été enregistrer avec success' , {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
        } catch (err) {
			toast.error('Erreur' , {
				position: "top-left",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
            console.log(err)
        }
	}

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xl" >
		
            <CssBaseline />
            <Box
            sx={{
                
                display: 'flex',
                flexDirection: 'column',
                //alignItems: 'center',
            }}
            >
            <Grid item xs={10} sm={5}>
            <Button
                endIcon={<SaveIcon />} 
                type="submit"
                variant="contained"
                onClick={OnSubmitAddCandidatDetailHandler}
                sx={{ mt: 3, mb: 2 }}
            >
                Enregistrer
            </Button>
            </Grid>
            <img src="https://res.cloudinary.com/dcdei4osp/image/upload/v1661342500/logo/greenlinkslogo_se9rnr.png" alt="logo" width= "250px" />
            <Typography mt={2} ml={120}> PROFIL DU CANDIDAT </Typography>
            <Divider  variant="middle"/>
            <Box component="form" noValidate  sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <ToastContainer />
                <Typography mt={4}> CANDIDAT :  </Typography>
                <Grid item xs={10} sm={5}>
                    <TextField
                    required
                    id="LastName"
                    name="LastName"
                    label="Nom"
                    fullWidth
                    autoComplete="LastName"
                    variant="outlined"
                    defaultValue={frontsheetvariables[0]}
                    inputRef={LastNameRef}
                    onChange={handleanimation}
                    onClick={OnSubmitAddCandidatDetailHandler}
                    //focused={true}
                    />
                </Grid>
                <Grid item xs={10} sm={5}>
                    <TextField
                    required			
                    id="FirstName"
                    label="Prenom" 
                    fullWidth
                    autoComplete="FirstName"
                    variant="outlined"
                    defaultValue={frontsheetvariables[1]}
                    inputRef={FirstNameRef}
                    onChange={handleanimation}
                    onClick={OnSubmitAddCandidatDetailHandler}
                    //focused={true}
                    />
                </Grid>
                <Typography mt={5} ml={5}> POSTE :  </Typography>
                <Grid item xs={10} sm={10} ml={7}>
                    <TextField
                    required
                    id="Position" 
                    label="Titre de Poste"
                    margin="dense"
                    fullWidth
                    autoComplete="Position"
                    variant="outlined"
                    defaultValue={frontsheetvariables[2]}
                    inputRef={PositionRef}
                    onChange={handleanimation}
                    onClick={OnSubmitAddCandidatDetailHandler}
                    //focused={true}
                    />
                </Grid>
                <Typography mt={5} > FORMATIONS :  </Typography>
                <Grid item xs={10} sm={10} ml={7}>
                    <TextField
                    required
                    id="Training" 
                    label="Formations"
                    margin="dense"
                    autoComplete="Training"
                    variant="outlined"
                    inputRef={TrainingRef}
                    onChange={handleanimation}
                    onClick={OnSubmitAddCandidatDetailHandler}
                    multiline
                    fullWidth
                    //focused={true}
                    />
                </Grid>
                <Typography mt={5}> CERTIFICATIONS :  </Typography>
                <Grid item xs={10} sm={10} ml={6}>
                    <TextField
                    required
                    id="Certification" 
                    label="Certifications"
                    margin="dense"
                    autoComplete="Certification"
                    variant="outlined"
                    inputRef={CertificationRef}
                    onChange={handleanimation}
                    onClick={OnSubmitAddCandidatDetailHandler}
                    multiline
                    fullWidth
                    //focused={true}
                    />
                </Grid>
                <Typography mt={5}> RÉSUMÉ DES COMPÉTENCES : </Typography>
                <Grid item xs={10} sm={8}>
                    <TextField
                    required
                    id="Skills_Summary"
                    label="Résumé Des Compétences"
                    margin="dense"
                    autoComplete="Skills_Summary"
                    fullWidth
                    variant="outlined"
                    inputRef={Skills_SummaryRef}
                    onChange={handleanimation}
                    onClick={OnSubmitAddCandidatDetailHandler}
                    multiline
                    //focused={true}
                    />
                </Grid>
                <Typography mt={5} mr={5} sx={{textDecoration: 'underline'}}>Compétences fonctionnelles :</Typography>
                <Grid item xs={10} sm={8}>
                    <TextField
                    required
                    id="Soft_Skills"
                    label="Compétences fonctionnelles"
                    margin="dense"
                    autoComplete="Soft_Skills"
                    fullWidth
                    variant="outlined"
                    multiline
                    inputRef={Soft_SkillsRef}
                    onChange={handleanimation}
                    onClick={OnSubmitAddCandidatDetailHandler}

                    //focused={true}
                    />
                </Grid>
                <Typography mt={5} mr={5} sx={{textDecoration: 'underline'}}>Compétences techniques :</Typography>
                <Grid item xs={10} sm={8} mr={11}>
                    <TextField
                    required
                    id="Hard_Skills"
                    label="Compétences Techniques"
                    margin="dense"
                    autoComplete="Hard_Skills"
                    fullWidth
                    variant="outlined"
                    multiline
                    inputRef={Hard_SkillsRef}
                    onChange={handleanimation}
                    onClick={OnSubmitAddCandidatDetailHandler}
                    
                    //focused={true}
                    />
                </Grid>
                <Typography mt={5} mr={11} >Langues :</Typography>
                <Grid item xs={10} sm={8} mr={7}>
                    <TextField
                    required
                    id="Languages"
                    label="Langues"
                    margin="dense"
                    autoComplete="Languages"
                    fullWidth
                    variant="outlined"
                    inputRef={LanguagesRef}
                    onChange={handleanimation}
                    onClick={OnSubmitAddCandidatDetailHandler}
                    //focused={true}
                    />
                </Grid>
                <Typography mt={5} mr={5} >DATE DE COMMENCEMENT :</Typography>
                <Grid item xs={10} sm={8} mr={3}>
                    <TextField
                    required
                    id="Starting_Date"
                    label="DATE DE COMMENCEMENT"
                    margin="dense"
                    autoComplete="Starting_Date"
                    fullWidth
                    variant="outlined"
                    inputRef={Starting_DateRef}
                    onChange={handleanimation}
                    onClick={OnSubmitAddCandidatDetailHandler}
                    //focused={true}
                    />
                </Grid>
                <Typography mt={5} mr={4} > SALAIRE SOUHAITÉ :</Typography>
                <Grid item xs={10} sm={4} >
                    <TextField
                    required
                    id="Salary_Wanted"
                    label="SALAIRE SOUHAITÉ"
                    margin="dense"
                    autoComplete="Salary_Wanted"
                    fullWidth
                    variant="outlined"
                    type='number'
                    inputRef={Salary_WantedRef}
                    onClick={OnSubmitAddCandidatDetailHandler}
                    onChange={handleanimation}
                    //focused={true}
                    />
                </Grid>
                <Typography mt={5} >&nbsp;SALAIRE ACTUELLE :</Typography>
                <Grid item xs={10} sm={4} >
                    <TextField
                    required
                    id="Salary_Current"
                    label="SALAIRE ACTUELLE"
                    margin="dense"
                    autoComplete="Salary_Current"
                    fullWidth
                    variant="outlined"
                    type='number'
                    inputRef={Salary_CurrentRef}
                    onClick={OnSubmitAddCandidatDetailHandler}
                    onChange={handleanimation}
                    //focused={true}
                    />
                </Grid>
                <Typography mt={5} mr={5} >DISPONIBILITÉ ENTRETIENS :</Typography>
                <Grid item xs={10} sm={8} mr={12}>
                    <TextField
                    required
                    id="Disponability"
                    label="DISPONIBILITÉ ENTRETIENS"
                    margin="dense"
                    autoComplete="Disponability"
                    fullWidth
                    variant="outlined"
                    inputRef={DisponabilityRef}
                    onClick={OnSubmitAddCandidatDetailHandler}
                    onChange={handleanimation}
                    //focused={true}
                    />
                </Grid>
                <Typography mt={5} >REMARQUES :</Typography>
                <Grid item xs={10} sm={8} >
                    <TextField
                    required
                    id="Remarks"
                    label="REMARQUES"
                    margin="dense"
                    autoComplete="Remarks"
                    multiline
                    fullWidth
                    variant="outlined"
                    inputRef={RemarksRef}
                    onClick={OnSubmitAddCandidatDetailHandler}
                    onChange={handleanimation}
                    //focused={true}
                    />
                </Grid>
                </Grid>
                
                </Box>
            </Box>
                <Button
                endIcon={<SaveIcon />} 
                type="submit"
                variant="contained"
                onClick={OnSubmitAddCandidatDetailHandler}
                sx={{ mt: 3, mb: 2 }}
                >
                    Enregistrer
                </Button>
      </Container>
            <Copyright/>
        </ThemeProvider>
    )
}

export default FrontSheet
