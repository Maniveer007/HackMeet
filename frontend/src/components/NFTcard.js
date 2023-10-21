import React, { useState } from 'react'
import '../components/css/NFT.css'

const NFTcard = ({ props, idx }) => {
  console.log(props);

  return (
    <div>
      
      <div className="second hero">
        <div className='Hostname'>
          
          Hostname : {props.name}
          <br></br>
          Hostaddress :
          <br></br>
          {props.host}
          <br></br>
          NFTAddress :
          <br></br>
          {props.NFTaddress}
          <br></br>
          Type: NFT
        </div>
        <img className="meeting-img" src="" alt="" />
        <div className="hero-description-bk"></div>
        <div className="hero-logo">
          <img src="\images\livelogo.jpg" alt="" />
        </div>
        <div className="meeting-description">
          <p>DESC : {props.description}</p>
        </div>

        <div className="button-30">
          <a href={`/NFT/${idx}`}>Join</a>
        </div>
      </div>


    </div>
  )
}

export default NFTcard