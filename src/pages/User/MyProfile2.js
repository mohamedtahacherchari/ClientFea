import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {IconButton} from '@mui/material';
import {Avatar, Button, Card, CardActions, CardContent, Divider, Typography} from '@mui/material';
import {useSelector } from 'react-redux';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MyProfile2 = () => {
	const auth = useSelector(state => state.auth)
	const token = useSelector(state => state.token)
	const {user} = auth
	const [data, setData] = useState('')
    const [avatar, setAvatar] = useState(false)
	const [loading, setLoading] = useState(false)
	const axiosInstance = axios.create({
        baseURL : process.env.REACT_APP_SERVER_URL,
      });
	const OnSubmitUpdateUserAvatar = () =>{
         try {
			axios.patch('/api/user/updateAvatar', {avatar},{
					headers: {Authorization: token}

				})
				console.log(avatar)
				toast.success("Profil a été mis a jour avec succes", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
				
			} catch (err) {
				
				toast.error("un erreur a été survenue", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
				
			}
	

			
		
	}

	const changeAvatar = async(e) => {
        e.preventDefault()
        try {
            const file = e.target.files[0]

            if(!file) return setData({...data, err: "No files were uploaded." , success: ''})

            if(file.size > 1024 * 1024)
                return setData({...data, err: "Size too large." , success: ''})

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
                return setData({...data, err: "File format is incorrect." , success: ''})

            let formData =  new FormData()
            formData.append('file', file)

            setLoading(true)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading(false)
            setAvatar(res.data.url)
            toast.success("avatar a été changer", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
        } catch (err) {
            toast.error("error", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }
	const postDetails = (avatars) => {
		setLoading(true);
		if (avatars === undefined) {
		  toast({
			title: "Please Select an Image!",
			status: "warning",
			duration: 5000,
			isClosable: true,
			position: "bottom",
		  });
		  return;
		}
		console.log(avatars);
		if (avatars.type === "image/jpeg" || avatars.type === "image/png") {
		  const data = new FormData();
		  data.append("file", avatars);
		  data.append("upload_preset", "chat-app");
		  data.append("cloud_name", "piyushproj");
		  fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
			method: "post",
			body: data,
		  })
			.then((res) => res.json())
			.then((data) => {
			  setAvatar(data.url.toString());
			  console.log(data.url.toString());
			  setLoading(false);
			})
			.catch((err) => {
			  console.log(err);
			  setLoading(false);
			});
		} else {
		  toast({
			title: "Please Select an Image!",
			status: "warning",
			duration: 5000,
			isClosable: true,
			position: "bottom",
		  });
		  setLoading(false);
		  return;
		}
	  };

console.log(user)


	return (
		<Box style={{marginTop :"270px"}}>
			<Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
			<Grid container spacing={3}>
				<ToastContainer />
					<Grid item lg={4} md={6} xs={12}>
						<Card>
							<CardContent>
								<Box
									sx={{
										alignItems: 'center',
										display: 'flex',
										flexDirection: 'column'
									}}
								>
								<Avatar
									src={avatar ? avatar : user.avatar}
									sx={{
										height: 64,
										mb: 2,
										width: 64}}/>
										</Box>
										</CardContent>
							             <Divider/>
							<CardActions>
			<IconButton color="primary" aria-label="upload picture" component="label">
			<input hidden accept="image/*" type="file" name="file" id="file_up" onChange={changeAvatar} />
			<PhotoCamera />
			</IconButton>
			<input type="file" name="file" id="file_up" onChange={(e) => postDetails(e.target.files[0])}/>
			</CardActions>
			</Card>
			</Grid>
			</Grid>
			<Button
				color="primary"
				variant="contained"
				onClick={OnSubmitUpdateUserAvatar}
				disabled={loading}>Save Avatar</Button>
			</Container>
    	</Box>
	)  
}

export default MyProfile2
