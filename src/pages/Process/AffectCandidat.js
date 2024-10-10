import React, { useRef, useState, useEffect, useCallback } from 'react'
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
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { dispatchGetAllprocess, fetchAllprocess } from '../../redux/actions/processAction'
import { dispatchGetAllCandidat, fetchAllCandidat } from '../../redux/actions/candidatAction';
import { dispatchGetAllClient, fetchAllClient } from '../../redux/actions/clientAction'
import {useSelector, useDispatch} from 'react-redux';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const AffectCandidat = () => {
    const dispatch = useDispatch()
	
	const token = useSelector(state => state.token)
	const process = useSelector(state => state.process)
	const candidats = useSelector(state => state.candidats)
	const clients = useSelector(state => state.client)

	const [candidataffect, setCandidatAffect] = useState()	
	const [clientaffect, setClientAffect] = useState()
    const [stepnumber, setstepNumber] = useState(0)
	const [startDate, setStartDate] = useState(new Date());

    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
	const [show3, setShow3] = useState(false)
	const [show4, setShow4] = useState(false)
	const [show5, setShow5] = useState(false)
	const [show6, setShow6] = useState(false)
    const [show7, setShow7] = useState(false)
    const [show8, setShow8] = useState(false)
    const [show9, setShow9] = useState(false)
    const [show10, setShow10] = useState(false)

    const StepName1Ref = useRef();
	const Description1Ref = useRef();
	const Datetime1Ref = useRef();
	
	const StepName2Ref = useRef();
	const Description2Ref = useRef();
	const Datetime2Ref = useRef();

	const StepName3Ref = useRef();
	const Description3Ref = useRef();
	const Datetime3Ref = useRef();

	const StepName4Ref = useRef();
	const Description4Ref = useRef();
	const Datetime4Ref = useRef();

	const StepName5Ref = useRef();
	const Description5Ref = useRef();
	const Datetime5Ref = useRef();

	const StepName6Ref = useRef();
	const Description6Ref = useRef();
	const Datetime6Ref = useRef();

	const StepName7Ref = useRef();
	const Description7Ref = useRef();
	const Datetime7Ref = useRef();

	const StepName8Ref = useRef();
	const Description8Ref = useRef();
	const Datetime8Ref = useRef();

	const StepName9Ref = useRef();
	const Description9Ref = useRef();
	const Datetime9Ref = useRef();

	const StepName10Ref = useRef();
	const Description10Ref = useRef();
	const Datetime10Ref = useRef();


    const getclientstep = useCallback(()=>{
        if(stepnumber>=1){
            setShow1(true)
            setShow2(false)
            setShow3(false)
            setShow4(false)
            setShow5(false)
            setShow6(false)
            setShow7(false)
            setShow8(false)
            setShow9(false)
            setShow10(false)
            if(stepnumber>=2){
                setShow2(true)
                setShow3(false)
                setShow4(false)
                setShow5(false)
                setShow6(false)
                setShow7(false)
                setShow8(false)
                setShow9(false)
                setShow10(false)
                if(stepnumber>=3){
                    setShow3(true)
                    setShow4(false)
                    setShow5(false)
                    setShow6(false)
                    setShow7(false)
                    setShow8(false)
                    setShow9(false)
                    setShow10(false)
                    if(stepnumber>=4){
                        setShow4(true)
                        setShow5(false)
                        setShow6(false)
                        setShow7(false)
                        setShow8(false)
                        setShow9(false)
                        setShow10(false)
                        if(stepnumber>=5){
                            setShow5(true)
                            setShow6(false)
                            setShow7(false)
                            setShow8(false)
                            setShow9(false)
                            setShow10(false)
                            if(stepnumber>=6){
                                setShow6(true)
                                setShow7(false)
                                setShow8(false)
                                setShow9(false)
                                setShow10(false)
                                if(stepnumber>=7){
                                    setShow7(true)
                                    setShow8(false)
                                    setShow9(false)
                                    setShow10(false)
                                    if(stepnumber>=8){
                                        setShow8(true)
                                        setShow9(false)
                                        setShow10(false)
                                        if(stepnumber>=9){
                                            setShow9(true)
                                            setShow10(false)
                                            if(stepnumber===10){
                                                setShow10(true)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, [stepnumber]);

    const onSubmitHandler = async()=>{
		let StepName1 = ''
        let StepName2 = ''
        let StepName3 = ''
        let StepName4 = ''
        let StepName5 = ''
        let StepName6 = ''
        let StepName7 = ''
        let StepName8 = ''
        let StepName9 = ''
        let StepName10 = ''

        let Description1 = ''
        let Description2 = ''
        let Description3 = ''
        let Description4 = ''
        let Description5 = ''
        let Description6 = ''
        let Description7 = ''
        let Description8 = ''
        let Description9 = ''
        let Description10 = ''

		let datetime1 = ''
		let datetime2 = ''
		let datetime3 = ''
		let datetime4 = ''
		let datetime5 = ''
		let datetime6 = ''
		let datetime7 = ''
		let datetime8 = ''
		let datetime9 = ''
		let datetime10 = ''

        if(show1!==false){
        StepName1 = StepName1Ref.current.value;
		Description1 = Description1Ref.current.value;
		datetime1 = Datetime1Ref.current.value;
		}

        if(show2!==false){
		StepName2 = StepName2Ref.current.value;
		Description2 = Description2Ref.current.value;
		datetime2 = Datetime2Ref.current.value;
		}

        if(show3!==false){
		StepName3 = StepName3Ref.current.value;
		Description3 = Description3Ref.current.value;
		datetime3 = Datetime3Ref.current.value;
		}

        if(show4!==false){
		StepName4 = StepName4Ref.current.value;
		Description4 = Description4Ref.current.value;
		datetime4 = Datetime4Ref.current.value;
		}

        if(show5!==false){
		StepName5 = StepName5Ref.current.value;
		Description5 = Description5Ref.current.value;
		datetime5 = Datetime5Ref.current.value;
		}

        if(show6!==false){
        StepName6 = StepName6Ref.current.value;
		Description6 = Description6Ref.current.value;
		datetime6 = Datetime6Ref.current.value;
		}

        if(show7!==false){
        StepName7 = StepName7Ref.current.value;
		Description7 = Description7Ref.current.value;
		datetime7 = Datetime7Ref.current.value;
		}

        if(show8!==false){
        StepName8 = StepName8Ref.current.value;
		Description8 = Description8Ref.current.value;
		datetime8 = Datetime8Ref.current.value;
		}

        if(show9!==false){
        StepName9 = StepName9Ref.current.value;
		Description9 = Description9Ref.current.value;
		datetime9 = Datetime9Ref.current.value;
		}

        if(show10!==false){
        StepName10 = StepName10Ref.current.value;
		Description10 = Description10Ref.current.value;
		datetime10 = Datetime10Ref.current.value;
		}

        //console.log(candidataffect, clientaffect)
        /*
		console.log(StepName1, StepName2, StepName3, StepName4, StepName5, StepName6, StepName7, StepName8, StepName9, StepName10)
        console.log(Description1, Description2, Description3, Description4, Description5, Description6, Description7, Description8, Description9, Description10)
        */
		let namecandidat = candidataffect.FirstName + " " + candidataffect.LastName
        
		
        try {
            const res = await axios.post('/api/processrecrutement',{
                candidat: candidataffect,
                client: clientaffect,
                namecandidat,
				StepName1, 
				StepName2, 
				StepName3, 
				StepName4, 
				StepName5, 
				StepName6, 
				StepName7, 
				StepName8, 
				StepName9, 
				StepName10,
				Description1,
				Description2, 
				Description3, 
				Description4, 
				Description5, 
				Description6, 
				Description7, 
				Description8, 
				Description9, 
				Description10,
				datetime1,
				datetime2,
				datetime3,
				datetime4,
				datetime5,
				datetime6,
				datetime7,
				datetime8,
				datetime9,
				datetime10
            },{
                headers: {Authorization: token}
            })
			toast.success('Le candidat a été affecter avec succées' , {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
        } catch (err) {
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

    const setstepHandler = useCallback(async()=>{
        if(show1===true){
            let ide = clientaffect.RecrutementSteps[0]
            try {
                const res = await axios.patch('/api/recrutementstep/getbyid/', {ide}, {
					headers: {Authorization: token}
				})

                StepName1Ref.current.value = res.data.StepName
                Description1Ref.current.value = res.data.StepDescription
            } catch (err) {
                console.log(err)
            }
        }
        if(show2===true){
            let ide = clientaffect.RecrutementSteps[1]
            try {
                const res = await axios.patch('/api/recrutementstep/getbyid/', {ide}, {
					headers: {Authorization: token}
				})

                StepName2Ref.current.value = res.data.StepName
                Description2Ref.current.value = res.data.StepDescription
            } catch (err) {
                console.log(err)
            }
        }
        if(show3===true){
            let ide = clientaffect.RecrutementSteps[2]
            try {
                const res = await axios.patch('/api/recrutementstep/getbyid/', {ide}, {
					headers: {Authorization: token}
				})

                StepName3Ref.current.value = res.data.StepName
                Description3Ref.current.value = res.data.StepDescription
            } catch (err) {
                console.log(err)
            }
        }
        if(show4===true){
            let ide = clientaffect.RecrutementSteps[3]
            try {
                const res = await axios.patch('/api/recrutementstep/getbyid/', {ide}, {
					headers: {Authorization: token}
				})

                StepName4Ref.current.value = res.data.StepName
                Description4Ref.current.value = res.data.StepDescription
            } catch (err) {
                console.log(err)
            }
        }
        if(show5===true){
            let ide = clientaffect.RecrutementSteps[4]
            try {
                const res = await axios.patch('/api/recrutementstep/getbyid/', {ide}, {
					headers: {Authorization: token}
				})

                StepName5Ref.current.value = res.data.StepName
                Description5Ref.current.value = res.data.StepDescription
            } catch (err) {
                console.log(err)
            }
        }
        if(show6===true){
            let ide = clientaffect.RecrutementSteps[5]
            try {
                const res = await axios.patch('/api/recrutementstep/getbyid/', {ide}, {
					headers: {Authorization: token}
				})

                StepName6Ref.current.value = res.data.StepName
                Description6Ref.current.value = res.data.StepDescription
            } catch (err) {
                console.log(err)
            }
        }
        if(show7===true){
            let ide = clientaffect.RecrutementSteps[6]
            try {
                const res = await axios.patch('/api/recrutementstep/getbyid/', {ide}, {
					headers: {Authorization: token}
				})

                StepName7Ref.current.value = res.data.StepName
                Description7Ref.current.value = res.data.StepDescription
            } catch (err) {
                console.log(err)
            }
        }
        if(show8===true){
            let ide = clientaffect.RecrutementSteps[7]
            try {
                const res = await axios.patch('/api/recrutementstep/getbyid/', {ide}, {
					headers: {Authorization: token}
				})

                StepName8Ref.current.value = res.data.StepName
                Description8Ref.current.value = res.data.StepDescription
            } catch (err) {
                console.log(err)
            }

        }
        if(show9===true){
            let ide = clientaffect.RecrutementSteps[8]
            try {
                const res = await axios.patch('/api/recrutementstep/getbyid/', {ide}, {
					headers: {Authorization: token}
				})

                StepName9Ref.current.value = res.data.StepName
                Description9Ref.current.value = res.data.StepDescription
            } catch (err) {
                console.log(err)
            }
        }
        if(show10===true){
            let ide = clientaffect.RecrutementSteps[9]
            try {
                const res = await axios.patch('/api/recrutementstep/getbyid/', {ide}, {
					headers: {Authorization: token}
				})

                StepName10Ref.current.value = res.data.StepName
                Description10Ref.current.value = res.data.StepDescription
            } catch (err) {
                console.log(err)
            }
        }
    },[clientaffect])

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
/*
        const getclientstep = useCallback(()=>{
            if(stepnumber>=1){
                setShow1(true)
                setShow2(false)
                setShow3(false)
                setShow4(false)
                setShow5(false)
                setShow6(false)
                setShow7(false)
                setShow8(false)
                setShow9(false)
                setShow10(false)
                if(stepnumber>=2){
                    setShow2(true)
                    setShow3(false)
                    setShow4(false)
                    setShow5(false)
                    setShow6(false)
                    setShow7(false)
                    setShow8(false)
                    setShow9(false)
                    setShow10(false)
                    if(stepnumber>=3){
                        setShow3(true)
                        setShow4(false)
                        setShow5(false)
                        setShow6(false)
                        setShow7(false)
                        setShow8(false)
                        setShow9(false)
                        setShow10(false)
                        if(stepnumber>=4){
                            setShow4(true)
                            setShow5(false)
                            setShow6(false)
                            setShow7(false)
                            setShow8(false)
                            setShow9(false)
                            setShow10(false)
                            if(stepnumber>=5){
                                setShow5(true)
                                setShow6(false)
                                setShow7(false)
                                setShow8(false)
                                setShow9(false)
                                setShow10(false)
                                if(stepnumber>=6){
                                    setShow6(true)
                                    setShow7(false)
                                    setShow8(false)
                                    setShow9(false)
                                    setShow10(false)
                                    if(stepnumber>=7){
                                        setShow7(true)
                                        setShow8(false)
                                        setShow9(false)
                                        setShow10(false)
                                        if(stepnumber>=8){
                                            setShow8(true)
                                            setShow9(false)
                                            setShow10(false)
                                            if(stepnumber>=9){
                                                setShow9(true)
                                                setShow10(false)
                                                if(stepnumber===10){
                                                    setShow10(true)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })*/
        getclientstep()
        setstepHandler()
        
    }, [token, dispatch, getclientstep, setstepHandler])
    
    return (
        <>
        <CardContent>
			<Card sx={{ display: "flex", justifyContent: "center", height: "100%" }} >
			<ToastContainer />
				<br/>
				<Grid container spacing={3} sx={{ mt: 2}} >
					<Grid
						item
						md={4}
						xs={12}
					>
						<Autocomplete
													
				    	id="tags-outlined"
						options={ candidats }
						getOptionLabel={(option) => option.FirstName + " " +option.LastName }
						isOptionEqualToValue={(option, value)=> option._id === value._id}
						filterSelectedOptions
						onChange={(event, newValue) => {
							setCandidatAffect(newValue)
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
			    		md={4}
				        xs={12}
		    		>
			    		<Autocomplete
								
							id="tags-outlined"
							options={ clients }
							getOptionLabel={(option) => option.CompanyName}
							isOptionEqualToValue={(option, value)=> option._id === value._id}
							filterSelectedOptions
							onChange={(event, newValue) => {
								setClientAffect(newValue)
                                if(newValue !== null){setstepNumber(newValue.RecrutementSteps.length)}
                                getclientstep()
							}}
							renderInput={(params) => (
								<TextField
									{...params}
									label="Client"
									placeholder="Email"
								/>
							)}
							/>
									
						</Grid>
						<Grid
						item
						md={4}
						xs={12}
					></Grid>
							{/* STEP 1 */}
                    {show1 &&
                        <>
						<Grid
							item
							md={4}
							xs={12}
						>
					    	<TextField
							//helperText="Merci de préciser le prénom"
								label="StepName1"
								name="StepName1"
								inputRef={StepName1Ref}
                                //defaultValue="yes"
								variant="outlined"
								fullWidth
								required
                                focused
							/>
						</Grid>
						<Grid
							item
							md={4}
							xs={12}
						>
							<TextField
								//helperText="Merci de préciser le prénom"
								label="StepDescription"
								name="StepDescription"
								inputRef={Description1Ref}
								variant="outlined"
								fullWidth
								required
                                focused
							/>
						</Grid>
						<Grid item md={4} xs={12}>
							<TextField
								id="datetime-local"
								label="Next appointment"
								type="datetime-local"
								//defaultValue={deftimedatevalue}
								inputRef={Datetime1Ref}
								sx={{ width: 250 }}
								InputLabelProps={{
								shrink: true,
								}}
							/>
						</Grid>
                        </>
                    }
							{/* STEP 2 */}
                    {show2 &&
                        <>
						<Grid
				    		item
					    	md={4}
							xs={12}
						>
							<TextField
								//helperText="Merci de préciser le prénom"
								label="StepName"
								name="StepName"
								inputRef={StepName2Ref}
								variant="outlined"
								fullWidth
								required
                                focused
							/>
						</Grid>
						<Grid
							item
							md={4}
												xs={12}
											>
												<TextField
													//helperText="Merci de préciser le prénom"
													label="StepDescription"
													name="StepDescription"
													inputRef={Description2Ref}
													variant="outlined"
													fullWidth
													required
                                                    focused
												/>
						</Grid>
						<Grid item md={4} xs={12}>
							<TextField
								id="datetime-local"
								label="Next appointment"
								type="datetime-local"
								//defaultValue={deftimedatevalue}
								inputRef={Datetime2Ref}
								sx={{ width: 250 }}
								InputLabelProps={{
								shrink: true,
								}}
							/>
						</Grid>
                        </>
                    }
											{/* STEP 3 */}
                                            {show3 && <>
											<Grid
												item
												md={4}
												xs={12}
											>
												<TextField
													//helperText="Merci de préciser le prénom"
													label="StepName"
													name="StepName"
													inputRef={StepName3Ref}
													variant="outlined"
													fullWidth
													required
                                                    focused
												/>
											</Grid>
											<Grid
												item
												md={4}
												xs={12}
											>
												<TextField
													//helperText="Merci de préciser le prénom"
													label="StepDescription"
													name="StepDescription"
													inputRef={Description3Ref}
													variant="outlined"
													fullWidth
													required
                                                    focused
												/>
											</Grid>
											<Grid item md={4} xs={12}>
												<TextField
													id="datetime-local"
													label="Next appointment"
													type="datetime-local"
													//defaultValue={deftimedatevalue}
													inputRef={Datetime3Ref}
													sx={{ width: 250 }}
													InputLabelProps={{
													shrink: true,
													}}
												/>
											</Grid>
                                            </>}
											{/* STEP 4 */}
                                            {show4 && <>
											<Grid
												item
												md={4}
												xs={12}
											>
												<TextField
													//helperText="Merci de préciser le prénom"
													label="StepName"
													name="StepName"
													inputRef={StepName4Ref}
													variant="outlined"
													fullWidth
													required
                                                    focused
												/>
											</Grid>
											<Grid
												item
												md={4}
												xs={12}
											>
												<TextField
													//helperText="Merci de préciser le prénom"
													label="StepDescription"
													name="StepDescription"
													inputRef={Description4Ref}
													variant="outlined"
													fullWidth
													required
                                                    focused
												/>
											</Grid>
											<Grid item md={4} xs={12}>
												<TextField
													id="datetime-local"
													label="Next appointment"
													type="datetime-local"
													//defaultValue={deftimedatevalue}
													inputRef={Datetime4Ref}
													sx={{ width: 250 }}
													InputLabelProps={{
													shrink: true,
													}}
												/>
											</Grid>
                                            </>
                                            }
											{/* STEP 5 */}
                                            {show5 && <>
											<Grid
												item
												md={4}
												xs={12}
											>
												<TextField
													//helperText="Merci de préciser le prénom"
													label="StepName"
													name="StepName"
													inputRef={StepName5Ref}
													variant="outlined"
													fullWidth
													required
                                                    focused
												/>
											</Grid>
											<Grid
												item
												md={4}
												xs={12}
											>
												<TextField
													//helperText="Merci de préciser le prénom"
													label="StepDescription"
													name="StepDescription"
													inputRef={Description5Ref}
													variant="outlined"
													fullWidth
													required
                                                    focused
												/>
											</Grid>
											<Grid item md={4} xs={12}>
												<TextField
													id="datetime-local"
													label="Next appointment"
													type="datetime-local"
													//defaultValue={deftimedatevalue}
													inputRef={Datetime5Ref}
													sx={{ width: 250 }}
													InputLabelProps={{
													shrink: true,
													}}
												/>
											</Grid>
                                            </>}
											{/* STEP 6 */}
                                            {show6 && <>
											<Grid
												item
												md={4}
												xs={12}
											>
												<TextField
													//helperText="Merci de préciser le prénom"
													label="StepName"
													name="StepName"
													inputRef={StepName6Ref}
													variant="outlined"
													fullWidth
													required
                                                    focused
												/>
											</Grid>
											<Grid
												item
												md={4}
												xs={12}
											>
												<TextField
													//helperText="Merci de préciser le prénom"
													label="StepDescription"
													name="StepDescription"
													inputRef={Description6Ref}
													variant="outlined"
													fullWidth
													required
                                                    focused
												/>
											</Grid>
											<Grid item md={4} xs={12}>
												<TextField
													id="datetime-local"
													label="Next appointment"
													type="datetime-local"
													//defaultValue={deftimedatevalue}
													inputRef={Datetime6Ref}
													sx={{ width: 250 }}
													InputLabelProps={{
													shrink: true,
													}}
												/>
											</Grid>
                                            </>
                                            }
											{/* STEP 7 */}
                                            {show7 && <>
											<Grid
												item
												md={4}
												xs={12}
											>
												<TextField
													//helperText="Merci de préciser le prénom"
													label="StepName"
													name="StepName"
													inputRef={StepName7Ref}
													variant="outlined"
													fullWidth
                                                    focused
													required
												/>
											</Grid>
											<Grid
												item
												md={4}
												xs={12}
											>
												<TextField
													//helperText="Merci de préciser le prénom"
													label="StepDescription"
													name="StepDescription"
													inputRef={Description7Ref}
													variant="outlined"
													fullWidth
													required
                                                    focused
												/>
											</Grid>
											<Grid item md={4} xs={12}>
												<TextField
													id="datetime-local"
													label="Next appointment"
													type="datetime-local"
													//defaultValue={deftimedatevalue}
													inputRef={Datetime7Ref}
													sx={{ width: 250 }}
													InputLabelProps={{
													shrink: true,
													}}
												/>
											</Grid>
                                            </>
                                            }
											{/* STEP 8 */}
                                            {show8 && <>
											<Grid
												item
												md={4}
												xs={12}
											>
												<TextField
													//helperText="Merci de préciser le prénom"
													label="StepName"
													name="StepName"
													inputRef={StepName8Ref}
													variant="outlined"
													fullWidth
													required
                                                    focused
												/>
											</Grid>
											<Grid
												item
												md={4}
												xs={12}
											>
												<TextField
													//helperText="Merci de préciser le prénom"
													label="StepDescription"
													name="StepDescription"
													inputRef={Description8Ref}
													variant="outlined"
													fullWidth
													required
                                                    focused
												/>
											</Grid>
											<Grid item md={4} xs={12}>
												<TextField
													id="datetime-local"
													label="Next appointment"
													type="datetime-local"
													//defaultValue={deftimedatevalue}
													inputRef={Datetime8Ref}
													sx={{ width: 250 }}
													InputLabelProps={{
													shrink: true,
													}}
												/>
											</Grid>
                                            </>
                                            }
											{/* STEP 9 */}
                                            {show9 && <>
											<Grid
												item
												md={4}
												xs={12}
											>
												<TextField
													//helperText="Merci de préciser le prénom"
													label="StepName"
													name="StepName"
													inputRef={StepName9Ref}
													variant="outlined"
													fullWidth
													required
                                                    focused
												/>
											</Grid>
											<Grid
												item
												md={4}
												xs={12}
											>
												<TextField
													//helperText="Merci de préciser le prénom"
													label="StepDescription"
													name="StepDescription"
													inputRef={Description9Ref}
													variant="outlined"
													fullWidth
													required
                                                    focused
												/>
											</Grid>
											<Grid item md={4} xs={12}>
												<TextField
													id="datetime-local"
													label="Next appointment"
													type="datetime-local"
													//defaultValue={deftimedatevalue}
													inputRef={Datetime9Ref}
													sx={{ width: 250 }}
													InputLabelProps={{
													shrink: true,
													}}
												/>
											</Grid>
                                            </>
                                            }
											{/* STEP 10 */}
											{show10 && <>
                                            <Grid
												item
												md={6}
												xs={12}
											>
												<TextField
													//helperText="Merci de préciser le prénom"
													label="StepName"
													name="StepName"
													inputRef={StepName10Ref}
													variant="outlined"
													fullWidth
													required
                                                    focused
												/>
											</Grid>
											<Grid
												item
												md={6}
												xs={12}
											>
												<TextField
													//helperText="Merci de préciser le prénom"
													label="StepDescription"
													name="StepDescription"
													inputRef={Description10Ref}
													variant="outlined"
													fullWidth
													required
                                                    focused
												/>
											</Grid>
											<Grid item md={4} xs={12}>
												<TextField
													id="datetime-local"
													label="Next appointment"
													type="datetime-local"
													//defaultValue={deftimedatevalue}
													inputRef={Datetime10Ref}
													sx={{ width: 250 }}
													InputLabelProps={{
													shrink: true,
													}}
												/>
											</Grid>
                                            </>}
											<Grid
												item
												md={6}
												xs={12}>
												<Button 
													endIcon={<GroupAddIcon />} 
													type="submit" 
													variant="contained" 
													onClick={onSubmitHandler}
													sx={{ mt: 2, ml: 60, justifyContent: "center" }}
                                                    
												> 
												Affecter </Button>
											</Grid>
											{/*
                                            <Grid
												item
												md={6}
												xs={12}>
												<Button 
													endIcon={<GroupAddIcon />} 
													type="submit" 
													variant="contained" 
													onClick={OnClickHandler}
													sx={{ mt: 2, justifyContent: "center" }}
												> 
												getclientstep </Button>
											</Grid>*/ }

										</Grid>
										
									</Card>
									
								</CardContent>
     </>
    )
}

export default AffectCandidat
