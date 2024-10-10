import React from 'react'
import ResetPassword from './ResetPassword'
import { Routes, Route } from 'react-router-dom'
import { useParams, useNavigate} from 'react-router-dom';

const ResetPWD = () => {
    const {token} = useParams()

  return (
    <div>
        <Routes>
              	<Route path="/:token" element={<ResetPassword/>} />
	    </Routes>    
    </div>
  )
}

export default ResetPWD