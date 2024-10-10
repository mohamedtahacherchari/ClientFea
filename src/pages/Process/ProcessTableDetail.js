import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {dispatchGetrecrutementbyid,fetchrecrutementbyid} from '../../redux/actions/recrutementAction';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {
	TextField,
    Button
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const ProcessTableDetail = (props) => {

    const dispatch = useDispatch()
	
	const token = useSelector(state => state.token)

    const { row } = props;
    const [open, setOpen] = useState(true);
    
    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                etape
                </TableCell>
                <TableCell >{row.client}
                    
                </TableCell>
                <TableCell scope="row">
                        <Button variant="outlined" startIcon={<BorderColorIcon />}>
                            Modifier
                        </Button>
                   </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                        Etape
                    </Typography>
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                        <TableRow>
                            
                            <TableCell>Nom Etape</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell >Debrief</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {row.Recrutements.map((recrutement)=>(
                            <TableRow key={recrutement._id}>
                            <TableCell component="th" scope="row">
                            {recrutement.RecrutmentStepName}
                            </TableCell>
                            
                            <TableCell >    <TextField
													id="datetime-local"
													label="Next appointment"
													type="datetime-local"
													defaultValue={recrutement.date}
                                                    disabled
													sx={{ width: 250 }}
													InputLabelProps={{
													shrink: true,
													}}
												/></TableCell>
                            <TableCell>
                                    <Button 
                                        variant="contained" 
                                        sx={{ 
                                            backgroundColor: recrutement.RecrutmentStepDescription==='' ? 'grey': 'green', 
                                            ":hover":{backgroundColor: 'grey'} 
                                        }}
                                        /*onClick={getprocess}*/
                                    >
                                        Debrief 
                                    </Button>
                                
                                
                                
                            </TableCell>
                            <TableCell>
                                
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

export default ProcessTableDetail
