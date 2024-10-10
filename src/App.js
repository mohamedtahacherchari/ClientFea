import React,{useEffect} from 'react';
import {Routes,Route,useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { dispatchLogin, fetchUser, dispatchGetUser } from './redux/actions/authAction';
import axios from 'axios';
import SignIn from './pages/User/SignIn'
import SignUp from './pages/User/SignUp'
import ForgotPassword from './pages/User/ForgotPassword'
import Home3 from './pages/Home3';
import Chatpage from './pages/Chat/Chatpage';
import ResetPWD from './pages/User/ResetPWD';
import ResetPassword from './pages/User/ResetPassword';
import GoogleOneTapLogin from './pages/User/GoogleOneTapLogin';
import EmailActivation from './pages/User/EmailActivation'
import Home from './pages/event/Clander'
import { DragDropContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function App() {
	const dispatch = useDispatch()  
	const token = useSelector(state => state.token)
	const auth = useSelector(state => state.auth)
	const {isLogged} = auth
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	// ResetPasswordRoute component
      console.log(auth)
const ResetPasswordRoute = () => {
    return isLogged ? <Home3 /> : <ResetPassword />;
};
//const firstLogin = localStorage.setItem('firstLogin')

	useEffect(() => {

		const firstLogin = sessionStorage.getItem('firstLogin')
		if(firstLogin){
			const getToken = async () => {
			const res = await axios.post('/api/user/refresh_token', null)
			dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
		}
		getToken()
		}
	},[auth.isLogged, dispatch])

	useEffect(() => {
		if(token){
		const getUser = () => {
			dispatch(dispatchLogin())

			return fetchUser(token).then(res => {
			dispatch(dispatchGetUser(res))
			})
		}
		getUser()
		}
	},[token, dispatch])
	
	return     (
		<DndProvider backend={HTML5Backend}>
	
		<Routes>
		<Route path="/*" element={isLogged ? <Home3/> : <SignUp/>} />
        <Route path='/inv/signin' element={isLogged ? <Home3/> : <SignIn/>} exact />
{/*		<Route path='/:token'  element={<ResetPasswordRoute />} />
*/}		<Route path="/forgot" element={<ForgotPassword/>} />
{/*		<Route path='/inv/chats' element={<Chatpage/>} />
*/}		<Route path='/inv' element={<GoogleOneTapLogin/>}/>
		<Route path="/active/:activation_token" element={<EmailActivation/>} />

	  </Routes>
	  </DndProvider>
				);
}

export default App;
