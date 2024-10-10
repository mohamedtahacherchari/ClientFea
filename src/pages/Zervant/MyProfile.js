import React, {useState, useEffect ,useRef} from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {IconButton} from '@mui/material';
import { Alert } from '@mui/material';
import { Button, Typography, TextField,Autocomplete, CircularProgress} from '@mui/material';
import { getUserDetails, updateUserProfile } from '../../redux/actions/servantActions/userAction'
import { useDispatch, useSelector } from 'react-redux';
import { USER_UPDATE_PROFILE_RESET } from '../../redux/actions/servantActions/constant/constantZervant/userConstant'
//import { toast } from '@chakra-ui/react';
import {Avatar, Card, CardActions, CardContent, Divider} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import Container from '@mui/material/Container';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import AvatarEditor from 'react-avatar-editor';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import MapComponent from '../../components/MapComponent';

const MyProfile = () => {
	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.AVATAR, // Assurez-vous que vous définissez le type
		collect: monitor => ({
		  isDragging: !!monitor.isDragging(),
		}),
	  });
	const [data, setData] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password , setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phoneNumber , setPhoneNumber] = useState('')
    const [email , setEmail] = useState('')
	const [avatar, setAvatar] = useState('')
	const [city, setCity] = useState('')
	const [loading2, setLoading2] = useState(false)
	const [position, setPosition] = useState({ x: 0, y: 0 }); // State pour stocker les coordonnées de l'image
	
	const [searchValue, setSearchValue] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
	  const [newAvatar, setNewAvatar] = useState(null);
	  const editorRef = useRef(null);


	  const handleSave = () => {
		if (editorRef.current) {
		  const canvas = editorRef.current.getImageScaledToCanvas().toDataURL();
		  setNewAvatar(canvas); // Met à jour newAvatar avec l'image mise à jour
		}
	  };
	
	const dispatch = useDispatch()
	const auth = useSelector(state => state.auth)
	const token = useSelector(state => state.token)
	const {user} = auth
   const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
   const userDetails = useSelector((state) => state.userDetails)
   const { error} = userDetails
    const { success } = userUpdateProfile

	const editorSize = 250;

	const fetchPositionFromBackend = async () => {
		try {
		  const response = await axios.get('/api/user/avatar/position', {
			headers: { Authorization: token }
		  });
		  if (response.data.position) {
			setPosition(response.data.position);
		  }
		} catch (error) {
		  console.error('Error fetching avatar position:', error);
		}
	  };

	  const updatePositionOnBackend = async (position, token) => {
		try {
		  await axios.patch('/api/user/avatar/position', { position }, {
			headers: { Authorization: token }
		  });
		} catch (error) {
		  console.error('Error updating avatar position:', error);
		}
	  };

	  /*const updateAvatarPosition = async (newPosition) => {
		try {
			console.log("hello helloe hello")
		  // Appel de la fonction updatePositionOnBackend avec la nouvelle position et le jeton d'authentification
		  await updatePositionOnBackend(newPosition, token);
		  console.log('Avatar position updated successfully.');
		} catch (error) {
		  console.error('Error updating avatar position:', error);
		}
	  };*/

	  const handleChange = (event, newValue) => {
        setSearchValue(newValue);
    };

   
      const handleSearch = async (value) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.geocoding-provider.com/search?q=${value}`);
            setOptions(response.data.results);
        } catch (error) {
            console.error('Error searching for places:', error);
        }
        setLoading(false);
    };


	  const handlePositionChange = (position) => {
		// Mettre à jour les coordonnées de l'image dans le state local
		console.log(position,"Matelot")
		setPosition(position);
		// Envoyer les nouvelles coordonnées de position au backend
		updateAvatarPosition(position);
	  };

   // Après la mise à jour réussie de la position en backend
const updateAvatarPosition = async (newPosition) => {
	try {
	  // Appel de la fonction updatePositionOnBackend avec la nouvelle position et le jeton d'authentification
	  await updatePositionOnBackend(newPosition, token);
	  console.log('Avatar position updated successfully.');
  
	  
  
	} catch (error) {
	  console.error('Error updating avatar position:', error);
	}
  };




	

       useEffect(() => {
     if (!user || !user.firstName || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
      } else {
        setFirstName(user.firstName)
        setEmail(user.email)
		setLastName(user.lastName)
        setPhoneNumber(user.phoneNumber)
		setAvatar(user.avatar)
		setCity(user.city)
      }
	  // Récupérer les coordonnées de l'image depuis le backend lors du chargement de la page
	  fetchPositionFromBackend();
    }
  , [dispatch, user, success])



const OnSubmitUpdateUser = async () => {
    try {
      if (newAvatar) {
        // Si une nouvelle image a été mise à jour, envoi de la nouvelle image au backend
        await axios.patch('/api/user/update', {
          firstName,
          lastName,
          phoneNumber,
		  city,
          email,
          password,
          avatar: newAvatar, // Utilise newAvatar au lieu de l'ancien avatar
		  position: position // Envoyer également la position de l'image au backend

        }, {
          headers: { Authorization: token }
        });
      } else {
        // Si aucune nouvelle image n'a été mise à jour, envoi des détails de l'utilisateur sans modifier l'avatar
        await axios.patch('/api/user/update', {
          firstName,
          lastName,
          phoneNumber,
		  city,
          email,
          password,
          avatar: avatar, // Utilise l'avatar existant
		  position: position // Envoyer également la position de l'image au backend

        }, {
          headers: { Authorization: token }
        });
      }

      toast.success("Profil a été mis à jour avec succès", {
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
      toast.error("Une erreur est survenue", {
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
  };

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

            setLoading2(true)
            const res = await axios.post('/api/upload_avatar', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setLoading2(false)
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
		setLoading2(true);
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
			  setLoading2(false);
			})
			.catch((err) => {
			  console.log(err);
			  setLoading2(false);
			});
		} else {
		  toast({
			title: "Please Select an Image!",
			status: "warning",
			duration: 5000,
			isClosable: true,
			position: "bottom",
		  });
		  setLoading2(false);
		  return;
		}
	  };

	 /* const handlePositionChange = (position) => {
		// Mettre à jour les coordonnées de l'image dans le state local
		setPosition(position);
		// Envoyer les nouvelles coordonnées de position au backend
		updatePositionOnBackend(position);
	  };
	*/
	 


	return (
		<Box component="form" onSubmit={OnSubmitUpdateUser} sx={{ mt: 2 }}>
		<Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
		  <Grid container spacing={3}>
			<Grid item lg={6} md={6} xs={12}>
			  <ToastContainer />
			  <Card>
      <CardContent>
        <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <AvatarEditor
            ref={editorRef}
            image={avatar ? avatar : user.avatar}
            width={editorSize}
            height={editorSize}
            borderRadius={editorSize / 2} // Définit un rayon de bordure pour créer un cercle
            color={[255, 255, 255, 0.6]}
            scale={1}
            rotate={0}
			position={position} // Passer les coordonnées de l'image
            onPositionChange={handlePositionChange} // Gérer le changement de position

          />
          <Typography color="textPrimary" gutterBottom variant="h5" name="name" id="name">
            {user.firstName} {user.lastName}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" name="file" id="file_up" onChange={changeAvatar} />
          <PhotoCameraIcon />
        </IconButton>
        <input type="file" name="file" id="file_up" onChange={(e) => postDetails(e.target.files[0])} />
        <IconButton color="primary" aria-label="save picture" onClick={handleSave}>
          {/*<PhotoCameraIcon />*/}
        </IconButton>
       {/*<IconButton color="primary" aria-label="save user details" onClick={OnSubmitUpdateUser}>
          Save User Details
        </IconButton>*/}
      </CardActions>

    </Card>
			</Grid>
			<Grid item lg={6} md={6} xs={12}>
			  <TextField
				fullWidth
				label="Prénom"
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
				variant="outlined"
				margin="normal"
				required
			  />
			  <TextField
				fullWidth
				label="Nom"
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
				variant="outlined"
				margin="normal"
				required
			  />
	  
			  <TextField
				fullWidth
				label="Numéro de téléphone"
				value={phoneNumber}
				onChange={(e) => setPhoneNumber(e.target.value)}
				variant="outlined"
				margin="normal"
				required
			  />
			  <MapComponent city={city}
			  setCity={setCity}
			  />
			  <TextField
				fullWidth
				label="Email Address"
				name="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				variant="outlined"
				margin="normal"
				required
			  />



			  <TextField
				fullWidth
				label="Password"
				name="password"
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				variant="outlined"
				margin="normal"
				required
			  />
	  
			  <TextField
				fullWidth
				label="Confirm Password"
				name="confirmPassword"
				type="password"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				variant="outlined"
				margin="normal"
				required
			  />
	  
			  <Button type='submit' disabled={loading2} variant='contained' color='primary' sx={{ mt: 3 }}>
				Mise à jour
			  </Button>
			</Grid>
		  </Grid>
		</Container>
	  </Box>
	  
	  
	


	)
}

export default MyProfile
