import React, { useRef, useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment } from '@mui/material';
import { Avatar, Button, Card, CardActions, CardContent, Divider, Typography, CardHeader, TextField} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Autocomplete from '@mui/material/Autocomplete';

import { useDispatch, useSelector } from 'react-redux';
import { dispatchLogin, fetchUser, dispatchGetUser } from '../../../redux/actions/authAction';
import axios from 'axios';
import { dispatchGetAllCandidat, fetchAllCandidat } from '../../../redux/actions/candidatAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
const ManageMail = () => {
    const dispatch = useDispatch()
	
	const token = useSelector(state => state.token)
	const candidats = useSelector(state => state.candidats)

	const [candidatsend, setCandidatSend] = useState()

    const emailbodyRef = useRef();
    const emailsubjectRef = useRef();
    const envoyermail = async()=>{
        const emailbody = emailbodyRef.current.value;
        const emailsubject = emailsubjectRef.current.value;
        console.log(emailsubject)
        console.log(emailbody)
        console.log(candidatsend)

        try {
            const res = await axios.post('/api/candidat/senddynamictxtmail/', {
                candidatsend,
                emailsubject,
                emailbody
            },{
				headers: {Authorization: token}
			})
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() =>{

		fetchAllCandidat(token).then(res =>{
            dispatch(dispatchGetAllCandidat(res))
        })
        
    }, [token, dispatch])
  return (
    <Box
			component="main"
			sx={{
				flexGrow: 1,
				//py: 0
			}}
		>
			<Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
			
					<Typography
						sx={{ mb: 3 }}
						variant="h4"
					>
						Configurer Email
					</Typography>
            </Container>
            <Grid
						container
						spacing={3}
					>
						<ToastContainer />

                        <Grid
						item
						lg={9}
						md={6}
						xs={12}
					>
							<Card>
								<CardHeader
									subheader=""
									title="Envoyer un Email"
								/>
								<Divider />
								<CardContent>
								<Grid
									container
									spacing={3}
								>
                                    <Grid
                                        item
                                        md={12}
                                        xs={12}
                                    >
                                        <Autocomplete
										    multiple
                                            id="tags-outlined"
                                            options={ candidats }
                                            getOptionLabel={(option) => option.Email }
                                            isOptionEqualToValue={(option, value)=> option._id === value._id}
                                            filterSelectedOptions
                                            onChange={(event, newValue) => {
                                                setCandidatSend(newValue)
                                            }}
                                            renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Candidat"
                                                placeholder="Email"
                                                />
                                            )}
                                        />
                                    </Grid>
                                    
                                    <Grid
										item
										md={12}
										xs={12}
                                        
									>
										
								       	<TextField
                                        id="outlined-multiline-static"
                                        label="Objet de l'email"
                                        multiline
                                        fullWidth
                                        inputRef={emailsubjectRef}
                                    />
									
									</Grid>

									<Grid
										item
										md={12}
										xs={12}
                                        
									>
 
                                   	<TextField
                                        id="outlined-multiline-static"
                                        label="Contenu de L'email"
                                        multiline
                                        fullWidth
                                        inputRef={emailbodyRef}
                                    />
                                        
								
									
									</Grid>
									
                                    
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
									onClick={envoyermail}
									
								>
									Envoyer Email
								</Button>
								</Box>
							</Card>
					</Grid>
            </Grid>


    </Box>
  )
}

export default ManageMail
