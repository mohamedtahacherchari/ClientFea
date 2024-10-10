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

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';

import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { grey } from '@mui/material/colors';
const colorgrey = grey[500];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


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
const Qualification = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xl" >
                <Paper sx={{ width: '1500' }}>
                <Box
                    noValidate
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        m: 'auto',
                        width: 'fit-content',
                    }}
                >
                    <CssBaseline />
                    
                        <Grid item xs={10} sm={5}>
                            <Button
                                endIcon={<SaveIcon />} 
                                type="submit"
                                variant="contained"
                                //onClick={OnSubmitAddCandidatDetailHandler}
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Enregistrer
                            </Button>
                        </Grid>

                            <img src="https://res.cloudinary.com/dcdei4osp/image/upload/v1661342500/logo/greenlinkslogo_se9rnr.png" alt="logo" width= "250px" />
                            <Typography textAlign={'center'} sx={{ fontWeight: 550 }} mt={2} > CANDIDATE QUALIFICATION FORM </Typography>
                            <Typography textAlign={'center'} sx={{ fontWeight: 550 }} mt={2} > Recrutement CDI </Typography>

                            <Divider  variant="middle"/>

                    <TableContainer component={Paper} sx={{width: '100%'}} >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center" colSpan={3}>
                                    VERIFIER LES COORDONNEES CANDIDAT
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> Nom / Prénom :</Typography>                                    
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell>
                                        <Typography textAlign={'left'}> Adresse :</Typography>
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}>Site internet :</Typography>
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                            />
                                        </TableCell>

                                    </TableCell>                                
                                </TableRow>
                                <TableRow >
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> Permis de Travail en France :</Typography>                                    
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell>
                                        <Typography textAlign={'left'}> Tel Fixe :</Typography>
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}>Email :</Typography>
                                            
                                        </TableCell>
                                        <TableCell>
                                        <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                            />
                                        </TableCell>

                                    </TableCell>                            
                                </TableRow>
                                <TableRow >
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> Nationalité :</Typography>                                    
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell>
                                        <Typography textAlign={'left'}> Tel Portable :</Typography>
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                            />
                                        </TableCell>
                                    </TableCell>                            
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TableContainer component={Paper} sx={{width: '100%'}} >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center" colSpan={3}>
                                        CREER LE PREMIER CONTACT
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                                
                                                Poste actuel :
                                            </Typography>                                    
                                            <Typography textAlign={'left'}> 
                                                Employeur
                                            </Typography>
                                            <Typography textAlign={'left'}> 
                                                Type de société
                                            </Typography> 
                                            <Typography textAlign={'left'}>      
                                                Ancienneté
                                            </Typography>
                                            <Typography textAlign={'left'}> 
                                                Tâches quotidiennes
                                            </Typography>
                                            <Typography textAlign={'left'}> 
                                                Taille de l’équipe
                                            </Typography>
                                            <Typography textAlign={'left'}> 
                                                Environnement technique
                                                </Typography>
                                                <Typography textAlign={'left'}> 
                                                Responsabilités
                                                </Typography>
                                                                          
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>                                   
                                </TableRow>
                                    
                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                                
                                                Postes précédents :
                                            </Typography>                                    
                                            <Typography textAlign={'left'}> 
                                                Employeur
                                            </Typography>
                                            <Typography textAlign={'left'}> 
                                                Type de société
                                            </Typography> 
                                            <Typography textAlign={'left'}>      
                                                Ancienneté
                                            </Typography>
                                            <Typography textAlign={'left'}> 
                                                Tâches quotidiennes
                                            </Typography>
                                            <Typography textAlign={'left'}> 
                                                Taille de l’équipe
                                            </Typography>
                                            <Typography textAlign={'left'}> 
                                                Environnement technique
                                            </Typography>
                                            <Typography textAlign={'left'}> 
                                                Responsabilités
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                </TableRow>
                            </TableBody>

                        </Table>

                    </TableContainer>

                    <TableContainer component={Paper} sx={{width: '100%'}}>
                    <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center" colSpan={3}>
                                        MOTIVATION DU CANDIDAT
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                                Pourquoi un nouveau poste ?
                                            </Typography>                                                                          
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                        
                                    </TableCell>                                   
                                </TableRow>
                                    
                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                                Depuis quand recherchez-vous ?
                                            </Typography>                                                                          
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                    
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                            Si le candidat n’est pas en poste :

                                            </Typography>
                                            <Typography textAlign={'left'}>
                                            Pourquoi a-t-il quitté son précédent
                                                employeur ?
                                            </Typography>
                                            <Typography textAlign={'left'}>
                                            Pourquoi a-t-il quitté son précédent
                                            </Typography>
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                    
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                            Demander des références :


                                            </Typography>
                                            <Typography textAlign={'left'}>
                                            A qui puis-je parler pour avoir une
                                            référence sur vos postes
                                            précédents ?
                                            
                                            </Typography>
                                            <Typography textAlign={'left'}>
                                            Nom Prénom Poste Email Tel
                                            Société
                                            </Typography>
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                    
                                </TableRow>
                            </TableBody>

                        </Table>
                    </TableContainer>

                    <TableContainer component={Paper} sx={{width: '100%'}}>

                    <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center" colSpan={3}>
                                        <Typography>
                                            CONNAITRE LES BESOINS DU CANDIDAT
                                        </Typography>
                                        <Typography>
                                            (trouver le meilleur poste pour lui et mieux vendre le poste)
                                        </Typography>
                                    </StyledTableCell>
                                </TableRow>
                                <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                                Votre poste idéal :
                                            </Typography>
                                            <Typography textAlign={'left'}> 
                                                Titre et Rôle
                                            </Typography>                                                                        
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                        
                                    </TableCell>                                   
                                </TableRow>
                                    
                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                            Compétences et technologies recherchées :
                                            </Typography>                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                    
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                            Type de projet (implication recherchée)


                                            </Typography>
                                            <Typography textAlign={'left'}>
                                            Responsabilité :
                                            </Typography>
                                            
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                    
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                                Type de société :
                                                Culture, taille


                                            </Typography>
                                            
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                    
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                            Secteurs d’activité recherchés :

                                            </Typography>
                                            
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                    
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                            Formations souhaitées :

                                            </Typography>
                                            
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                    
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                            Evolution de carrière :

                                            </Typography>
                                            
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                    
                                </TableRow>



                            </TableBody>
                            </TableHead>
                    </Table>
                    </TableContainer>

                    <TableContainer component={Paper} sx={{width: '100%'}} >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center" colSpan={3}>
                                        CREER LE PREMIER CONTACT
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                                
                                            Technologies les plus maîtrisées
                                            </Typography>                                    
                                            <Typography textAlign={'left'}> 
                                            Avec nombre d’années d’expérience
                                            </Typography>
                                            <Typography textAlign={'left'}> 
                                            Dans quel cadre ? (projets, rôle dans le projet, etc.)
                                            </Typography> 
                                            <Typography textAlign={'left'}>      
                                            Qu’est-ce qui le distingue d’un autre candidat ?
                                            </Typography>
                                            <Typography textAlign={'left'}>
                                            Pourquoi
                                            devrait-on l’embaucher lui et pas un autre ?
                                            </Typography>
                                            <Typography textAlign={'left'}> 
                                            Diplômes obtenus :
                                            </Typography>
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>                                   
                                </TableRow>
                                    
                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                                
                                            Compétences commerciales
                                            </Typography>                                    
                                            <Typography textAlign={'left'}> 
                                            Langues maitrisées :
                                            </Typography>
                                            <Typography textAlign={'left'}> 
                                            niveau écrit et oral (souvent différent)
                                            </Typography> 
                                            <Typography textAlign={'left'}>      
                                            conversation téléphonique :
                                            </Typography>
                                            <Typography textAlign={'left'}> 
                                            pratique dans une expérience précédente :
                                            </Typography>
                                            <Typography textAlign={'left'}> 
                                            longs séjours ou expatriation :
                                            </Typography>
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                </TableRow>

                            </TableBody>

                        </Table>

                    </TableContainer>

                    <TableContainer component={Paper} sx={{width: '100%'}} >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center" colSpan={3}>
                                    Discuter de sa mobilité
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                                
                                            Où vivez-vous ?
                                            </Typography>                                    
                                            <Typography textAlign={'left'}> 
                                            Souhait de trajets quotidiens (en temps ou distance) ?
                                            </Typography>
                                            <Typography textAlign={'left'}> 
                                            Permis de conduire ? Moyens de déplacement ?
                                            </Typography> 
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>                                   
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TableContainer component={Paper} sx={{width: '100%'}} >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center" colSpan={3}>
                                    Si déménagement prévu, creuser sur le sérieux de son projet :
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                                
                                            Pourquoi souhaitez-vous déménager ici ?
                                            </Typography>                                    
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                    
                                </TableRow>
                                <TableRow>
                                <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                            Avez-vous déjà vécu ici ? (nouvelle destination)
                                                
                                            </Typography>                                    
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                            Amis / Famille ici ?
                                                
                                            </Typography>                                    
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                            Etes-vous propriétaire ? Vente prévue ?
                                                
                                            </Typography>                                    
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                            Etes-vous propriétaire ? Vente prévue ?
                                            </Typography>
                                            
                                            <Typography textAlign={'left'}> 
                                            Vous êtes vous renseigné sur les coûts de location/vie
                                            quotidienne ?
                                            </Typography>

                                            <Typography textAlign={'left'}> 
                                            Famille ? Conjoint travaille ? prêt à quitter son poste ?
                                            </Typography>

                                            <Typography textAlign={'left'}> 
                                            Enfants ? école ? avez-vous trouvé des écoles ?
                                            Où vivent vos parents ?

                                            </Typography>
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TableContainer component={Paper} sx={{width: '100%'}} >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center" colSpan={3}>
                                    CLOSER SUR LE SALAIRE (bien closer sur le minimum avant de continuer)
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                
                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                                
                                            Salaire actuel / Dernier salaire
                                            </Typography>                                    
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                    
                                </TableRow>

                                <TableRow>
                                <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                            Prétentions salariales
                                                
                                            </Typography>                                    
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                            Salaire minimum 
                                            </Typography>
                                            <Typography textAlign={'left'}>
                                            (en dessous duquel il est inutile de vous appeler pour présenter l’offre)
                                            </Typography>                                    
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TableContainer component={Paper} sx={{width: '100%'}} >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center" colSpan={3}>
                                        CLOSER SUR LES AVANTAGES hors salaire 
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                
                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                                Nombre d’heures travaillées / Nombre Congés / RTT
                                            </Typography>  

                                            <Typography textAlign={'left'}> 
                                            Bonus (quand, combien, garanti ) / Mutuelle
                                            </Typography>  

                                            <Typography textAlign={'left'}> 
                                            Remboursement voyages / Tickets Restaurant
                                            </Typography>  

                                            <Typography textAlign={'left'}> 
                                            Voiture de fonction (+péage, +essence)
                                            </Typography>  

                                            <Typography textAlign={'left'}> 
                                            Téléphone portable / Ordinateur portable
                                            </Typography>  

                                            <Typography textAlign={'left'}> 
                                            Formation (budget annuel)
                                            </Typography>                                    
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                    
                                </TableRow>

                                <TableRow>
                                <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                            Quels avantages sont les plus importants (non négociables) ?
                                                
                                            </Typography>                                    
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TableContainer component={Paper} sx={{width: '100%'}} >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center" colSpan={3}>
                                        DISCUTER DE SA RECHERCHE
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                
                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                            Où avez-vous envoyé votre CV ?
                                            </Typography>  

                                            <Typography textAlign={'left'}> 
                                            Essayer d’obtenir des leads (postes, société, nom du/des managers rencontrés)
                                            </Typography>  

                                            <Typography textAlign={'left'}> 
                                            Bien discuter des différentes opportunités, ce que le
                                            candidat a aimé et moins aimé, comment place t’il notre
                                            opportunité, etc. Maximum d’informations.
                                            </Typography>  
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                    
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                            Entretiens passés
                                            </Typography>  
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                    
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                            Entretiens planifiés
                                            </Typography>  
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                    
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                            Cabinets de recrutement contactés
                                            </Typography>  
                                            <Typography textAlign={'left'}> 
                                            Jobboards avec le CV en ligne
                                            </Typography>  
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                    
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                            Cabinets dPériode de préavis ? Négociable ?
                                            </Typography>  
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TableContainer component={Paper} sx={{width: '100%'}} >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center" colSpan={3}>
                                    DISCUTER DE SA DISPONIBILITE
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                
                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                            Période de préavis ? Négociable ?
                                            </Typography>  

                                            
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                    
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                            Disponibilité entretiens ? avec nous, avec le client ?
                                            </Typography>
                                            <Typography textAlign={'left'}>
                                            Possibilité en journée, pause déjeuner, le matin ?
                                            </Typography>  
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                    
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <TableCell>
                                            <Typography textAlign={'left'}> 
                                            Entreprises à ne pas approcher, 
                                            </Typography>  
                                            <Typography textAlign={'left'}> 
                                            où ne pas présenter sonprofil
                                            </Typography>  
                                            
                                        </TableCell>
                                        <TableCell>
                                            <TextField 
                                                required
                                                id="LastName"
                                                name="LastName"
                                                //label="Nom"
                                                fullWidth
                                                autoComplete="LastName"
                                                variant="outlined"
                                                multiline
                                            />
                                        </TableCell>
                                    </TableCell>
                                    
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TableContainer component={Paper} sx={{width: '100%'}} >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center" colSpan={3}>
                                        <Typography > 
                                        VENDRE VOTRE SERVICE AU CANDIDAT : préciser tout ce que vous allez faire pour lui, essayer de pitcher à nouveau l’exclusivité
                                        </Typography>
                                        <Typography > 
                                        Egalement pensez à lui demander d’enregistrer votre numéro pour identifier vos appels (très important si son CV est en ligne, il recevra beaucoup d’appels)
                                        </Typography>
                                        <Typography > 
                                        VENDRE LES JOBS AU CANDIDAT, utilisez les points clés dont vous avez discuté, importants pour lui et qu’il retrouvera dans ces jobs.
                                        </Typography>
                                        <Typography > 
                                        CONSTRUISEZ VOTRE RESEAU : entourage dans l’IT en recherche, collègues, anciens collègues,le motiver pour des cooptations.       
                                        </Typography>
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                    
                </Box>
                </Paper>
                <br/>
                <Copyright/>
            </Container>
        </ThemeProvider>

    )
}

export default Qualification
