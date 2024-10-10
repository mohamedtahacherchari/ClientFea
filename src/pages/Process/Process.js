import React, { useState, useEffect, useCallback } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
	Container,
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	TextField
} from '@mui/material';
import axios from "axios";
import {useSelector, useDispatch} from 'react-redux';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { dispatchGetAllprocess, fetchAllprocess } from '../../redux/actions/processAction'
import { dispatchGetAllCandidat, fetchAllCandidat } from '../../redux/actions/candidatAction';
import { dispatchGetAllClient, fetchAllClient } from '../../redux/actions/clientAction'


import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import ProcessTable from './ProcessTable';
import { createTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AffectCandidat from './AffectCandidat';

const onDragEnd = (result, columns, setColumns) => {
	if (!result.destination) return;
	const { source, destination } = result;
  
	if (source.droppableId !== destination.droppableId) {
		const sourceColumn = columns[source.droppableId];
		const destColumn = columns[destination.droppableId];
		const sourceItems = [...sourceColumn.items];
		const destItems = [...destColumn.items];
		const [removed] = sourceItems.splice(source.index, 1);
		destItems.splice(destination.index, 0, removed);
		setColumns({
			...columns,
			[source.droppableId]: {
				...sourceColumn,
				items: sourceItems
			},
			[destination.droppableId]: {
				...destColumn,
				items: destItems
			}
		});
	} else {
		const column = columns[source.droppableId];
		const copiedItems = [...column.items];
		const [removed] = copiedItems.splice(source.index, 1);
		copiedItems.splice(destination.index, 0, removed);
		setColumns({
			...columns,
			[source.droppableId]: {
				...column,
				items: copiedItems
			}
		});
	}
};
const theme = createTheme();

const Process = () => {
	const dispatch = useDispatch()
	
	const token = useSelector(state => state.token)
	const process = useSelector(state => state.process)
	
	const [openp, setOpenp] = useState(false);

	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	const [itemid, setItemid] = useState()
	const [tabname, setTabName] = useState(0)
	const [SearchNameQ, setSearchNameQ]= useState('')

	const handleopenP = (item)=>{
		//console.log(item)
		setItemid(item)
        setOpenp(true)
		//console.log(openp)
    }

    const handlecloseP = (e)=>{
        setOpenp(false)
		//console.log(openp)
    }
	
	const [columns, setColumns] = useState();
/*
	const getcandidatname = async(ide) =>{
		try {
			
			const res = await axios.patch('/api/candidat/getbyid/', {ide}, {
				headers: {Authorization: token}
			})
			return (res.data.FirstName+ " "+ res.data.LastName)
			

		} catch (err) {
			console.log(err)
			return "Name Not Found"
		}
	}*/

	const loadOnce =  useCallback(() =>{
		//console.log("in")
		let itemQ = []
		let itemA = []
		let itemEC = []
		let itemO = []



		for(let i =0; i<process.length; i++){
			//console.log(itemsFromRedux)
			let ide = process[i].candidat
			if(process[i].processlevel === "Qualifie")
			{
				const l = itemQ.length
				itemQ[l] = {
					id: process[i]._id, 
					candidatid : process[i].candidat,
					clientid: process[i].client,
					namecandidat: process[i].namecandidat
					//date : process[i].Date,
				}
				//setItemQ(itemQ)
				//console.log(itemQ)
			}
			else if(process[i].processlevel === "Entretient Client")
			{
				//console.log(candidatProcess[i])
				const l = itemEC.length
				itemEC[l] = {
					id: process[i]._id, 
					candidatid : process[i].candidat,
					clientid: process[i].client,
					namecandidat: process[i].namecandidat

				}
				//console.log(itemEC)
				//console.log(process[i])
			}
			else if (process[i].processlevel === "Offre")
			{
				const l = itemO.length
				itemO[l] = {
					id: process[i]._id, 
					candidatid : process[i].candidat,
					clientid: process[i].client,
					namecandidat: process[i].namecandidat

				}
				//setItemO(itemO)
			}
			else if (process[i].processlevel === "Accepte")
			{
				const l = itemA.length
				itemA[l] = {
					id: process[i]._id, 
					candidatid : process[i].candidat,
					clientid: process[i].client,
					namecandidat: process[i].namecandidat
				}
				//setItemA(itemA)
			}
			else {
				console.log("ERROR")
			}

			let itemsFromRedux = {
				"Q": {
					name: "Qualifié",
					color: "#FFFAE6",
					items: itemQ
				},
				"EC": {
					name: "Entretien Client",
					color: "#EAE6FF",
					items: itemEC
				},
				"O": {
					name: "Offre",
					color: "#DEEBFF",
					items: itemO
				},
				"A": {
					name: "Accepté",
					color: "#E3FCEF",
					items: itemA
				}
			};
			setColumns(itemsFromRedux)
			//console.log(itemsFromRedux)
		}
	},[process])

	useEffect(() =>{
        fetchAllprocess(token).then(res =>{
            dispatch(dispatchGetAllprocess(res))
        })

		fetchAllCandidat(token).then(res =>{
            dispatch(dispatchGetAllCandidat(res))
        })

		fetchAllClient(token).then(res =>{
            dispatch(dispatchGetAllClient(res))
        })

		
		
        
        loadOnce();

    }, [token, dispatch, process, loadOnce])

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
					<Card>
						
						<CardHeader
							//subheader=""
							title="Process"
						/>
						<BottomNavigation
							showLabels
							value={tabname}
							onChange={(event, newValue) => {
							setTabName(newValue);
							}}
						>
							<BottomNavigationAction label="afficher process" icon={<ImportContactsIcon />}  />
							<BottomNavigationAction label="affecter candidat" icon={<PersonAddIcon />} />
						</BottomNavigation>
						<Divider />
						{ tabname === 0 ? (
							<CardContent>
							<TextField type="text" placeholder='Nom de Candidat' onChange={event => {
								setSearchNameQ(event.target.value)

							}} />
								
								<Card
									sx={{ display: "flex", justifyContent: "center", height: "100%" }}
								>
									{
											columns === undefined && 
											"undefined"
										}
										{
									columns !== undefined && 
									<DragDropContext
									onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
									>
										
									{Object.entries(columns).map(([columnId, column], index) => {
										return (
										<div
											style={{
												display: "flex",
												flexDirection: "column",
												alignItems: "center"
											}}
											key={columnId}
										>
											<h2>{column.name}</h2>
											<div style={{ margin: 8 }}>

											<Droppable droppableId={columnId} key={columnId}>
												{(provided, snapshot) => {
												return (
													<div
													{...provided.droppableProps}
													ref={provided.innerRef}
													style={{
														background: snapshot.isDraggingOver
														? "lightblue"
														: "lightgrey",
														padding: 4,
														width: 250,
														minHeight: 500,
														border: "2px dashed #ccc",
														borderRadius: "4px"
													}}
													>
													{column.items.filter((val)=>{
														if(setSearchNameQ=== ""){
															return val
														}else if (val.namecandidat.toLowerCase().includes(SearchNameQ.toLowerCase())){
															return val
														}
													}).map((item, index) => {
														//console.log(item)
														return (
														<div key={item.id} >
															
														<Draggable
															key={item.id}
															draggableId={item.id}
															index={index}
															
														>
															{(provided, snapshot) => {
															return (
																<div
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																style={{
																	userSelect: "none",
																	padding: 16,
																	margin: "0 0 8px 0",
																	minHeight: "50px",
																	backgroundColor: snapshot.isDragging
																	? "#263B4A"
																	: "#456C86",
																	color: "white",
																	
																	...provided.draggableProps.style
																}}
																onClick={
																	
																	()=>{handleopenP(item)}
																	
																}
																>
																	
																	<div style={{
																		display: "flex",
																		alignItems: "center",
																		justifyContent: "flex-start"
																	}}>
																		<img
																			src="https://react-beautiful-dnd.netlify.app/static/media/bmo-min.9c65ecdf.png"
																			alt="logo"
																			style={{
																				width: "40px",
																				height: "40px",
																				borderRadius: "50%",
																				marginRight: "8px",
																				flexShrink: 0,
																				flexGrow: 0
																				//-webkit-box-flex: 0,
																			}}
																		/>
																		{item.namecandidat}
																	</div>
																</div>
															);
															}}
														</Draggable>
														</div>
														);
													})}
													{provided.placeholder} 
													</div>
												);
												}}
											</Droppable>
											</div>
										</div>
										);
									})}

										
									</DragDropContext>

								}
								</Card>

							</CardContent>) : (
							<>
								<AffectCandidat/>
							</>)
						}
						<Dialog open={openp} onClose={handlecloseP} maxWidth={'xl'} fullScreen={fullScreen}>
							<DialogActions>
								<Button variant="contained" onClick={handlecloseP} startIcon={<CloseIcon />} sx={{ mt: 2, ml: 120 }}>
									Fermer
								</Button>
							</DialogActions>
							<ProcessTable id={itemid} />
						</Dialog>
					</Card>

				</Container>
		</Box>
		</>
	)
}

export default Process
