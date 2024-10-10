import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {showErrMsg, showSuccessMsg} from '../../components/utils/notification/Notification'

const EmailActivation = () => {
    const {activation_token} = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')
 
    useEffect(() => {
        if(activation_token){
            const activationEmail = async () => {
                try {
                    const res = await axios.post('/api/user/activation', {activation_token})
                    toast.success("Email Activated.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'colored'
                    });
                    setSuccess(res.data.msg)
                    console.log(res.data.msg)
                } catch (err) {

                    err.response.data.msg && setErr(err.response.data.msg)
                    toast.error("Error. ",`${err}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    console.log(err)
                }
            }
            activationEmail(err)
        }
    },[activation_token,err])

    return (
        <div>
            <ToastContainer />
                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
         Bienvenu votre compte est activé
        </div>
    )
}

export default EmailActivation