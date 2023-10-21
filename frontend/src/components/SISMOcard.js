import React from 'react'
import './css/NFT.css'
const SISMOcard = ({props,idx}) => {
    console.log(idx);
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
         Type: Sismo
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
    <a href={`/sismo/${idx}`}>join</a>
      </div>
    </div>


  


    </div>

  )
}

export default SISMOcard