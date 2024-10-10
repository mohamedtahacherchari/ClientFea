import { Button } from '@mui/material'
import React, { useState } from 'react'
import { Google } from '@mui/icons-material';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux'
import {dispatchLogin} from '../../redux/actions/authAction'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GoogleOneTapLogin = () => {
    const axiosInstance = axios.create({
        baseURL : process.env.REACT_APP_SERVER_URL,
      });
    const [disabled, setDisabled] = useState(false)
    const dispatch = useDispatch();
	const navigate = useNavigate();
    
    const handleResponse = async(response)=>{
        const token = response.credential;
        const decodedToken = jwtDecode(token);
        

        const { sub: id, email, name, given_name, family_name, hd, picture: photoURL} = decodedToken;
 
        console.log(decodedToken)

        try {
            console.log(id)
            console.log(email)
            console.log(name)
            console.log(photoURL)
            console.log(given_name)
            console.log(family_name)
            console.log(hd)
            

            if(hd==="greenlinks.fr"){
                console.log("Greenlinks email")
                const res = await axios.post('/api/user/loginGoogle', 
                {id, email, name, photoURL, given_name, family_name, hd, google:true },
                {
                    headers: {Authorization: token}
                })
                
                console.log(res)

            
                localStorage.setItem('firstLogin', true)
                dispatch(dispatchLogin())
                navigate('/dashboard');

                toast.success("Bienvenue !", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }else{
                toast.error("seuls les employés Greenlinks sont autorisés !", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (err) {
            console.log("err : ", err)
        }
        
    } 

    const handleGoogleLogin = async()=>{
        let sendbackend= false

        setDisabled(true);
        try {
            window.google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                callback: handleResponse,
            });
            window.google.accounts.id.prompt((notification) => {
                if (notification.isNotDisplayed()) {
                throw new Error('Try to clear the cookies or try again later!');
                }
                if (
                    notification.isSkippedMoment() ||
                    notification.isDismissedMoment()
                ) {
                    setDisabled(false);
                    
                    /*const res = await axios.post('/user/loginGoogle', {email, password})
                    setUser({...user, err: '', success: res.data.msg})
                    

                    localStorage.setItem('firstLogin', true)
                    dispatch(dispatchLogin())
                    navigate('/dashboard');*/
                }
            });
            /*if(sendbackend===true){
                const res = await axios.post('/user/loginGoogle', )
                setUser({...user, err: '', success: res.data.msg})
                    
                localStorage.setItem('firstLogin', true)
                dispatch(dispatchLogin())
                navigate('/dashboard');
            }*/
        } catch (error) {
            console.log(error);
        }
  
    }

    return (
        <>
        <Button variant="outlined" startIcon={<Google />} disabled={disabled} onClick={handleGoogleLogin}>
            Login With Google
        </Button>
        <ToastContainer />
        </>
    )
}

export default GoogleOneTapLogin
