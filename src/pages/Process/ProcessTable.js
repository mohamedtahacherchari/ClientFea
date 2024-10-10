import React, { useRef, useState, useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import {useSelector, useDispatch} from 'react-redux';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

import axios from 'axios'
import { Button } from '@mui/material';
import { dispatchGetprocess, fetchprocess } from '../../redux/actions/processAction';
import ProcessTableDetail from './ProcessTableDetail';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const theme = createTheme();

const ProcessTable = (props) => {

	const dispatch = useDispatch()
	
	const token = useSelector(state => state.token)

	//const process = useSelector(state => state.process)
    
    const processbyid = useSelector(state => state.processidReducer)
    const [openDetail, setOpenDetail] = React.useState(false);
    //const process

    const {id: itemvalue }= props
    const cid = itemvalue.candidatid
    const [value, setValue] = useState(itemvalue);


    

    //console.log(value)

	//get all process by id
	//

    /*const getprocess = async () =>{
        let id = value.candidatid
		//console.log(id)
		try {
            const res = await axios.get(`/api/processrecrutement/getbyid/${id}`, {
				headers: {Authorization: token}
			})
			console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }*/

	//console.log(value)

    useEffect(() =>{ 
        /*
        fetchAllprocess(token).then(res =>{
            dispatch(dispatchGetAllprocess(res))
        })*/

        fetchprocess(token,cid).then(res=>{
            dispatch(dispatchGetprocess(res))
        })
        

    })

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xl" >
		
            <CssBaseline />
            <Box
            sx={{
                
                display: 'flex',
                flexDirection: 'column',
                
            }}
            >
                <Typography textAlign={'center'} sx={{ fontWeight: 550 }} mt={2}> PROCESS </Typography>
                
                <Divider  variant="middle"/>
				
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Etape</TableCell>
                            <TableCell >Client</TableCell>
                            <TableCell>Modifier</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {processbyid.map((row)=>(
                            <ProcessTableDetail key={row._id} row={row}  />
                            //console.log(row)
                            
                            //<StyledTableCell>Date</StyledTableCell>
                        ))}
                        </TableBody>
                        
                    </Table>
                </TableContainer>

            </Box>
            </Container>
        </ThemeProvider>
    );
}

export default ProcessTable
