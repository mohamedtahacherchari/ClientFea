import React, { useRef, useState, useEffect } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar';
import NestedList2 from './NestedList2'

//import { useDispatch, useSelector } from 'react-redux';
//import { dispatchLogin, fetchUser, dispatchGetUser } from '../../redux/actions/authAction';
//import { dispatchGetAllCandidat, fetchAllCandidat } from '../../redux/actions/candidatAction';
//import { dispatchGetAllhardSkill, fetchAllhardSkill } from '../../redux/actions/hardskillAction'
//import { dispatchGetAllsoftSkill, fetchAllsoftSkill } from '../../redux/actions/softskillAction'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import { Avatar, Button, Card, CardActions, CardContent, Divider,
     Typography, CardHeader, TextField ,TablePagination} from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import InputAdornment from '@mui/material/InputAdornment';
import SvgIcon from '@mui/material/SvgIcon';
import { format } from 'date-fns';
import Autocomplete from '@mui/material/Autocomplete';
import axios from "axios"
import SearchIcon from '@mui/icons-material/Search';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmailIcon from '@mui/icons-material/Email';
import { Country, State }  from 'country-state-city';
import { Link } from 'react-router-dom';
const countries = Country.getAllCountries();

export const getInitials = (name = '') => name
  .replace(/\s+/, ' ')
  .split(' ')
  .slice(0, 2)
  .map((v) => v && v[0].toUpperCase())
  .join('');


const Candidat = () => {



    const [candidatsend, setCandidatSend] = useState()
    const emailbodyRef = useRef();
    const emailsubjectRef = useRef();
    const dispatch = useDispatch()
	const auth = useSelector(state => state.auth)
	const token = useSelector(state => state.token)
	const softSkills = useSelector(state => state.softSkills)
    const hardSkills = useSelector(state => state.hardSkills)
    const candidats = useSelector(state=> state.candidats)
    const {user} = auth

    /*const handlegetsoftskillClick = (row) => {
        console.log(row)
    }*/

    const [selectedCandidatIds, setSelectedCandidatIds] = useState([]);
    const [HSkill, setHSkill] = useState([])
    const [SSkill, setSSkill] = useState([])
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [candidatt, setCandidatss] = useState([])
    const [mail, setMail] = useState(false)

    const [nom, setNom] = useState('')
    const [prenom, setPrenom]= useState('')
    const [status, setStatus]= useState('')
    const [contract, setcontract]= useState('')

  

    const handleSelectAll = (event) => {
        let newSelectedCandidatIds;
        setMail(true)
        if (event.target.checked) {
            newSelectedCandidatIds = candidats.map((candidat) => candidat._id);
        } else {
            newSelectedCandidatIds = [];
            setMail(false)
        }

        setSelectedCandidatIds(newSelectedCandidatIds);
    };

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedCandidatIds.indexOf(id);
          console.log(selectedCandidatIds)
        let newSelectedCandidatIds = [];

        if (selectedIndex === -1) {
            
        newSelectedCandidatIds = newSelectedCandidatIds.concat(selectedCandidatIds, id);
        } else if (selectedIndex === 0) {
        newSelectedCandidatIds = newSelectedCandidatIds.concat(selectedCandidatIds.slice(1));
        } else if (selectedIndex === selectedCandidatIds.length - 1) {
            
        newSelectedCandidatIds = newSelectedCandidatIds.concat(selectedCandidatIds.slice(0, -1));
        } else if (selectedIndex > 0) {
            
        newSelectedCandidatIds = newSelectedCandidatIds.concat(
            selectedCandidatIds.slice(0, selectedIndex),
            selectedCandidatIds.slice(selectedIndex + 1)
        );
        }

        setSelectedCandidatIds(newSelectedCandidatIds);
        if(newSelectedCandidatIds.length!==0){
            setMail(true)
        }else{
            setMail(false)
        }
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const onchangeHardSkill = () =>{
       //candidats.hardskills
        candidats.filter(candidat=>{
            if(HSkill.length === 0){
                console.log(candidat)
            }
            if(HSkill.some(val=> candidat.hardskill.includes(val)))
            {
                console.log(candidat)
            }else {
                console.log("found nothing")
            }
        })
        
    }

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const SendMail = async()=>{

        try {
            const res = await axios.post('/api/candidat/sendmail/', {
                selectedCandidatIds
                
            },{
				headers: {Authorization: token}
			})
            toast.success('Email a été envoyer avec succées' , {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            console.log(error)
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
     /*   fetchAllhardSkill(token).then(res =>{
            dispatch(dispatchGetAllhardSkill(res))
        })

        fetchAllsoftSkill(token).then(res =>{
            dispatch(dispatchGetAllsoftSkill(res))
        })
        fetchAllCandidat(token).then(res =>{
            dispatch(dispatchGetAllCandidat(res))
        })*/
        

    }, [token, dispatch])
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
            {/* Tool Bar */}
            <ToastContainer />
            <Box >
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        m: -1

                    }}
                >
                <Typography sx={{ m: 1 }} variant="h4">
                    Candidats
                </Typography>
                <Box sx={{ m: 1 }}>

             
                 
                    
                        <Button
                            startIcon={(<EmailIcon fontSize="small" />)}
                            sx={{ mr: 1 }}
                           
                        > <NestedList2/>
                      
                        
                        </Button>
                    
                     
                    <Button
                        startIcon={(<UploadFileIcon fontSize="small" />)}
                        sx={{ mr: 1 }}
                        onClick={onchangeHardSkill}
                    >
                        Importer
                    </Button>

                    <Button
                        startIcon={(<DownloadIcon fontSize="small" />)}
                        sx={{ mr: 1 }}
                    >
                        Exporter
                    </Button>
                    
                

                    <Link to="/candidats/add" style={{ textDecoration: "none" , color: '#FFFF'}} >
                        <Button
                            color="primary"
                            variant="contained"
                        >
                            Ajouter Candidats
                        </Button>
                    </Link>
                </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                <Card>
                    <CardContent>
                    <Box >
                        <Grid container spacing={3}>
                                
                                <Grid item md={4} >
                                    <TextField
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <SvgIcon
                                            color="action"
                                            fontSize="small"
                                            >
                                            <SearchIcon />
                                            </SvgIcon>
                                        </InputAdornment>
                                        )
                                    }}
                                    placeholder="Nom"
                                    variant="outlined"
                                    onChange={event => setNom(event.target.value)}
                                    />
                                </Grid>
                                <Grid item md={4}>
                                    <TextField
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <SvgIcon
                                            color="action"
                                            fontSize="small"
                                            >
                                            <SearchIcon />
                                            </SvgIcon>
                                        </InputAdornment>
                                        )
                                    }}
                                    placeholder="Prenom"
                                    variant="outlined"
                                    onChange={event => setPrenom(event.target.value)}
                                    />
                                </Grid>
                                <Grid item md={4}>
                                    <TextField
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <SvgIcon
                                            color="action"
                                            fontSize="small"
                                            >
                                            <SearchIcon />
                                            </SvgIcon>
                                        </InputAdornment>
                                        )
                                    }}
                                    placeholder="Status"
                                    variant="outlined"
                                    onChange={event => setStatus(event.target.value)}
                                    />
                                </Grid>
                                <Grid item md={4}>
                                    <TextField
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <SvgIcon
                                            color="action"
                                            fontSize="small"
                                            >
                                            <SearchIcon />
                                            </SvgIcon>
                                        </InputAdornment>
                                        )
                                    }}
                                    placeholder="Contract"
                                    variant="outlined"
                                    onChange={event => setcontract(event.target.value)}
                                    />
                                </Grid>
                                <Grid item md={4} xs={4}>
                                    <Autocomplete
                                            multiple
                                            id="tags-outlined"
                                            options={softSkills}
                                            getOptionLabel={(option) => option.softskillName}
                                            //defaultValue={[softSkill[13]]}
                                            value={SSkill}
                                            onChange={(event, newValue) => {
                                                setSSkill(newValue);
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
                                <Grid item md={4} xs={4}>
                                    <Autocomplete
                                        multiple
                                        id="tags-outlined"
                                        options={ hardSkills}
                                        getOptionLabel={(option) => option.hardskillName}
                                        //defaultValue={[softSkill[13]]}
                                        filterSelectedOptions
                                        value={HSkill}
                                        onChange={(event, newValue) => {
                                            setHSkill(newValue)
                                        }}
                                        renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="HardSkill"
                                            placeholder="HardSkill"
                                        />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                    </Box>
                    </CardContent>
                </Card>
                </Box>
            </Box>
            
            {/* Candidat Table */}
            <Box sx={{ mt: 3 }}>
                <Card>
                    <PerfectScrollbar>
                        <Box sx={{ minWidth: 1050, overflow: "auto" }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedCandidatIds.length === candidats.length}
                                            color="primary"
                                            indeterminate={
                                                selectedCandidatIds.length > 0
                                                && selectedCandidatIds.length < candidats.length
                                            }
                                            onChange={handleSelectAll}
                                        />

                                        </TableCell>
                                        <TableCell> Photo </TableCell>
                                        <TableCell> Nom </TableCell>
                                        <TableCell> Prenom </TableCell>
                                        <TableCell> Email </TableCell>
                                        <TableCell> Num Tel </TableCell>
                                        <TableCell> Position </TableCell>
                                        <TableCell> Contract </TableCell>
                                        <TableCell> Status </TableCell>
                                        <TableCell> Ville </TableCell>
                                        <TableCell> SoftSkill </TableCell>
                                        <TableCell> HardSkill </TableCell>
                                        <TableCell> FrontSheet </TableCell>
                                        <TableCell> Qualification </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {candidats.slice(0, limit).filter((val)=>{
                                        if(nom==="" && prenom==="" && contract==="" && status===""){
                                            
                                            return val
                                        }
                                        else if (
                                            val.FirstName.toLowerCase().includes(nom.toLowerCase()) && prenom==="" && contract==="" && status===""
                                        ){
                                            return val
                                        }else if (
                                            nom==="" && val.LastName.toLowerCase().includes(prenom.toLowerCase()) && contract==="" && status===""
                                        ){
                                            return val
                                        }else if (
                                            val.FirstName.toLowerCase().includes(nom.toLowerCase()) && val.LastName.toLowerCase().includes(prenom.toLowerCase()) && contract==="" && status===""
                                        ){
                                            return val
                                        }else if (
                                            nom==="" && prenom==="" && contract==="" && val.Status.toLowerCase().includes(status.toLowerCase())
                                        ){
                                            return val
                                        }else if(
                                            nom==="" && val.FirstName.toLowerCase().includes(nom.toLowerCase()) && contract==="" && val.Status.toLowerCase().includes(status.toLowerCase())
                                        ){
                                            return val
                                        }else if(
                                            val.LastName.toLowerCase().includes(prenom.toLowerCase()) && val.FirstName.toLowerCase().includes(nom.toLowerCase()) && contract==="" && val.Status.toLowerCase().includes(status.toLowerCase())
                                        ){
                                            return val
                                        }else if (
                                            nom==="" && prenom==="" && val.Contract.toLowerCase().includes(contract.toLowerCase()) && status===""
                                        ){
                                            return val
                                        }else if (
                                            val.LastName.toLowerCase().includes(prenom.toLowerCase()) && nom==="" && val.Contract.toLowerCase().includes(contract.toLowerCase()) && status===""
                                        ){
                                            return val
                                        }else if (
                                            val.FirstName.toLowerCase().includes(nom.toLowerCase()) && prenom==="" && val.Contract.toLowerCase().includes(contract.toLowerCase()) && status===""
                                        ){
                                            return val
                                        }else if (
                                            val.FirstName.toLowerCase().includes(nom.toLowerCase()) && val.LastName.toLowerCase().includes(prenom.toLowerCase()) && val.Contract.toLowerCase().includes(contract.toLowerCase()) && status===""
                                        ){
                                            return val
                                        }else if (
                                            val.FirstName.toLowerCase().includes(nom.toLowerCase()) && prenom==="" && val.Contract.toLowerCase().includes(contract.toLowerCase()) && status===""
                                        ){
                                            return val
                                        }
                                        else if (
                                            val.FirstName.toLowerCase().includes(nom.toLowerCase()) && val.LastName.toLowerCase().includes(prenom.toLowerCase()) && val.Contract.toLowerCase().includes(contract.toLowerCase()) && val.Status.toLowerCase().includes(status.toLowerCase())
                                        ){
                                            return val
                                        }


                                    }).map((candidat) => (
                                        <TableRow
                                            hover
                                            key={candidat._id}
                                            selected={selectedCandidatIds.indexOf(candidat._id) !== -1}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                checked={selectedCandidatIds.indexOf(candidat._id) !== -1}
                                                onChange={(event) => handleSelectOne(event, candidat._id)}
                                                value="true"
                                                />
                                            </TableCell>
                                            
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        alignItems: 'center',
                                                        display: 'flex'
                                                    }}
                                                    >
                                                    <Avatar
                                                        src={candidat.Photo ? candidat.Photo : "https://res.cloudinary.com/dcdei4osp/image/upload/v1655804847/samples/people/Multimedia__253_j5j3b5.jpg"}
                                                        sx={{ mr: 2 }}
                                                    >
                                                        {getInitials(candidat.Nom)}
                                                    </Avatar>
                                                </Box>
                                            </TableCell>

                                            <TableCell>
                                                {candidat.FirstName}
                                                
                                            </TableCell>
                                            <TableCell>
                                                {candidat.LastName }
                                            </TableCell>
                                            <TableCell>
                                                {candidat.Email}
                                            </TableCell>
                                            <TableCell>
                                                {candidat.Phone_Number}
                                            </TableCell>
                                            <TableCell>
                                                {candidat.Position}
                                            </TableCell>
                                            <TableCell>
                                                {candidat.Contract}
                                            </TableCell>
                                            <TableCell>
                                                {candidat.Status}
                                            </TableCell>
                                            <TableCell>
                                                {candidat.Ville}
                                            </TableCell>
                                            <TableCell>
                                                Soft skills
                                            </TableCell>
                                            <TableCell>
                                                Hard skills
                                            </TableCell>
                                            <TableCell>
                                                FrontSheet
                                            </TableCell>
                                            <TableCell>
                                                Qualification
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </PerfectScrollbar>
                        <TablePagination
                            component="div"
                            count={candidats.length}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleLimitChange}
                            page={page}
                            rowsPerPage={limit}
                            rowsPerPageOptions={[5, 10, 25]}
                        />
                </Card>
            </Box>
            </Container>
            </Box>
        </>
    )
}

export default Candidat
