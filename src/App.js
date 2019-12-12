import React from 'react'
import logo from './logo.svg'
import './App.css'
import Login from './Login'
import Navbar from './Navbar'

function App () {
  return (
    <div className='App'>
      <div className='App-header'>
        <Navbar />
      </div>
      <div className='App-body'>
        <Login />
      </div>
    </div>
  )
}

export default App
