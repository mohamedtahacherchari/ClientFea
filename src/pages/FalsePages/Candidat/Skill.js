import React, {useState, useEffect} from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import { experimentalStyled as stylede } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Card, CardContent, Divider, CardHeader} from '@mui/material';


const Item = stylede(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Skill = (props) => {
    const { onClose, value: valueProp, open, softSkill, hardSkill, ...other } = props;

    const [data, setData] = useState([])
    const [value, setValue] = useState(valueProp);

    const [ Language, setLanguages] = useState([])
    const [ Framework, setFramework] = useState([])
    const [ basededonne, setBaseDonne] = useState([])
    const [ controleversion, setControlVersion] = useState([])
    const [ sf, setSf ] = useState([])

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md')); 

    const label = { inputProps: { 'aria-label': 'Checkbox' } };

    const [count, setCount] = useState([]);

    const onClickaddsoftskill = (softskillname) =>{
        setCount(softskillname)
        
    }

    const handleaddTechno = () =>{
        const updatedata = [
            ...data,
            {
                id: 321,
                type: "Language",
                Language: "C++",
                Framework: "",
                DB: "",
                VC: ""
            }
        ];
        setData(updatedata)
    }

    const handleCancel = () => {
        onClose();
    };
    
    const handleOk = () => {
        /*console.log(Language)
        console.log(Framework)
        console.log(basededonne)
        console.log(controleversion)
        console.log(sf)*/
        
        setValue(Language, Framework, basededonne, controleversion, sf)
        console.log(value)
        onClose(value);

        

    };

    useEffect(() => {
        if (!open) {
          setValue(valueProp);
        }
    }, [valueProp, open]);

    return (
        <Dialog
            maxWidth="xs"
            //TransitionProps={{ onEntering: handleEntering }}
            fullScreen={fullScreen}
            open={open}
            {...other}
        >

            <DialogContent dividers>
                <Grid container spacing={3}>
                    <Grid item md={12} sx={{ display:'flex'}}>
					    <Card>
							<CardHeader title="Affecter competence"/>
							<Divider />
							<CardContent>
								<Grid container spacing={3}>
									<Grid item md={8} xs={12}>
                                        <Autocomplete
                                            multiple
                                            id="tags-outlined"
                                            options={ hardSkill.filter((l)=>{
                                                return l.typeHardskill === 'Languages'
                                            }) }
                                            getOptionLabel={(option) => option.hardskillName}
                                            //defaultValue={[softSkill[13]]}
                                            filterSelectedOptions
                                            value={Language}
                                            onChange={(event, newValue) => {
                                                setLanguages(newValue);
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
                                            options={hardSkill.filter((f)=>{
                                                return f.typeHardskill === 'Framework'
                                            })}
                                            value={Framework}
                                            onChange={(event, newValue) => {
                                                setFramework(newValue);
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
                                            options={hardSkill.filter((bd)=>{
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
                                            options={hardSkill.filter((cv)=>{
                                                return cv.typeHardskill === 'Contrôle de version'
                                            })}
                                            getOptionLabel={(option) => option.hardskillName}
                                            //defaultValue={[softSkill[13]]}
                                            filterSelectedOptions
                                            value={controleversion}
                                            onChange={(event, newValue) => {
                                                setControlVersion(newValue);
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
                                            options={softSkill}
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
                                    
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleCancel}>
                Cancel
                </Button>
                <Button onClick={handleOk}>Ok</Button>
            </DialogActions>
            </Dialog>
    )
}

export default Skill
