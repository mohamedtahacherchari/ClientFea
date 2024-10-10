import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sante from './Routes/Sante'

const HomeReplay = () => {
  return (
    <div>
          <Routes>
         <Route path='/Sante' element={<Sante/>} />

         </Routes>
    </div>
  )
}

export default HomeReplay