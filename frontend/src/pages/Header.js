import React, { useState } from 'react'
import '../components/css/Header.css'
import myImage from '../images/mainlogo.png'
import { Link } from 'react-router-dom';


const Header = () => {

  return (

    <div className='topheaderdiv'>

      <div className="navbar">
        <img src={myImage} alt="My Image" className='logoclass' />
        <Link to="/" className="nav-item">
          Home
        </Link>
        <Link to="/aboutus" className="nav-item">
          About Us
        </Link>
      </div>
      
    </div>




  )
}

export default Header