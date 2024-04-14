import { useState } from 'react'
import AllUsers from './AllUsers'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<AllUsers/>}></Route>
        <Route path='/create-user' element={<CreateUser/>}></Route>
        <Route path='/update-user/:id' element={<UpdateUser/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
