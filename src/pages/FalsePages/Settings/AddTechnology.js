import React, {useRef, useState} from 'react'
import { Avatar, Button, Card, CardActions, CardContent, Divider, Typography, CardHeader, TextField} from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTechnology = () => {
    const [type, setType] = useState("softskill");

    const [typehardskill, setTypeHardSkill] = useState("Languages");

    const SoftSkillRef = useRef();
    const HardSkillRef = useRef();
    const HardSkillImgRef = useRef();

    const handleChangeInput = (e)=>{
    
    }
    
    const handleChange = (event) => {
        setType(event.target.value);
    };

    const handleChangehardskill = (event) => {
        setTypeHardSkill(event.target.value);
    }

    const OnSubmitAddSkill = async ()=>{

        if(type === 'softskill'){
            const softskillName = SoftSkillRef.current.value;
            console.log(softskillName)
            try {
                const res = await axios.post('/api/softskills/', {
                    softskillName
                })

                toast.success('soft skill ajouter' , {
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
                toast.error('un erreur a été survenue' , {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }else if(type ==='hardskill'){
            const hardskillName = HardSkillRef.current.value;
            const hardskillImg = HardSkillImgRef.current.value;
            const typeHardskill = typehardskill;
            
            try {
                const res = await axios.post('/api/hardskills/', {
                    typeHardskill,
                    hardskillName,
                    hardskillImg
                })

                toast.success('hard skill ajouter' , {
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
                toast.error('un erreur a été survenue' , {
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

    }

    return (
        <div>
            <Card>
                <ToastContainer/>
				<CardHeader subheader="formulaire" title="Ajouter une compétence"/>
					<Divider />
					<CardContent>
					<Grid container spacing={3}>
                        <Grid item md={12} sx={{ display:'flex', justifyContent:'center'}}>
							
                            <FormControl>
                                <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
                                <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={type}
                                label="Type"
                                onChange={handleChange}
                                >
                                <MenuItem value="softskill">soft skill</MenuItem>
                                <MenuItem value="hardskill">hard skill</MenuItem>
                                </Select>
                                <FormHelperText>Type de competence</FormHelperText>
                            </FormControl>

                        </Grid>

                        {
                            type === "softskill" ? (
                            <>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        label="Soft skill"
                                        name="softskillName"
                                        inputRef={SoftSkillRef}
                                        //onChange={handleChangeInput}
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                            </>):(
                            <>
                                <Grid item md={6} xs={12}>
                                    <FormControl sx={{display:'flex'}}>
                                        <InputLabel id="demo-simple-select-helper-label">Type</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={typehardskill}
                                        label="Type"
                                        onChange={handleChangehardskill}
                                        >
                                        <MenuItem value="Languages">Languages</MenuItem>
                                        <MenuItem value="Framework">Framework</MenuItem>
                                        <MenuItem value="Base de donnée">Base de donnée</MenuItem>
                                        <MenuItem value="Contrôle de version">Contrôle de version</MenuItem>
                                        </Select>
                                        <FormHelperText>Type de competence</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        label="Hard skill"
                                        name="hardskillName"
                                        inputRef={HardSkillRef}
                                        //onChange={handleChangeInput}
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <TextField
                                        label="Icone"
                                        name="hardskillImg"
                                        inputRef={HardSkillImgRef}
                                        //onChange={handleChangeInput}
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                            </>)
                        }
						
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
									onClick={OnSubmitAddSkill}
									//disabled={loading}
								>
									Ajouter Competence
								</Button>
								</Box>
							</Card>
        </div>
    )
}

export default AddTechnology
