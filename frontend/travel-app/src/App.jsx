import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Auth/login'
import Signup from './pages/Auth/signup'
import Home from './pages/Home/Home'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<Root/>}/>
        <Route path='/dashboard' exact element={<Home/>}/>
        <Route path='/login' exact element={<Login/>}/>
        <Route path='/signup' exact element={<Signup/>}/>

      </Routes>
    </Router>
  )
}

//Define the Root component to handle the initial redirect
const Root=()=>{
  const isAuthenticated = !!localStorage.getItem("token");

  //Redirect to dashboard if authenticated, otherwise, login
  return isAuthenticated? (<Navigate to="/dashboard" />): (<Navigate to="/login" />)
};


export default App