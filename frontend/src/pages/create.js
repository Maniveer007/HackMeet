import React, { useState } from 'react'
import Select from 'react-select';
import getContract from '../utils/getContract';
import getroomid from '../utils/getroomid';
import uselit from '../utils/useLit';
import '../components/css/create.css';

const Create = () => {
  const [Type, setType] = useState('erc721')
  const [Name, setName] = useState('')
  const [des, setdes] = useState('')
  const [NFTaddress, setNFTaddress] = useState('')
  const [noofnfts, setnoofnfts] = useState('')
  const [sismoid, setsismoid] = useState('')



  const handlesubmit = async () => {
    console.log(Name, des, NFTaddress, noofnfts, sismoid);
    const contract = await getContract();
    // console.log(contract);
    if (Type == 'erc721') {
      const roomid = await getroomid();
      console.log(roomid);
      const { toDecrypt, encryptedDescriptionString } = await uselit({ hash: roomid, NFTaddress })

      const responce = await contract.createNFTmeeting(Name, des, toDecrypt, encryptedDescriptionString, NFTaddress, noofnfts);
      console.log(responce);
      const txresponse = await responce.wait()
      console.log(txresponse);
    }
    if (Type === 'sismo') {
      const roomid = await getroomid();
      const responce = await contract.createsismomeeting(Name, des, sismoid, roomid);
      console.log(responce);
      const txresponse = await responce.wait()
      console.log(txresponse);
    }
  }
  return (

    <div class="centered-container">
      <div class="custom-box">
        <div class='createheader'>Host Meeting</div>

        <div class='input-container'>
          <label for='roomName'>Name of Room:</label>
          <input class='input-field' type='text' id='roomName' placeholder='Enter room name' onChange={(e) => { setName(e.target.value) }} />
        </div>

        <div class='input-container'>
          <label for='roomDescription'>Description of Room:</label>
          <input class='input-field' type='text' id='roomDescription' placeholder='Enter room description' onChange={(e) => { setdes(e.target.value) }} />
        </div>

        <div class='input-container'>
          <label for='gating'>Gating:</label>
          <select class='select-field' id='gating' onChange={(e) => setType(e.target.value)}>
            <option value='erc721'>ERC-721</option>
            <option value='sismo'>Sismo</option>
          </select>
        </div>

        {Type === 'erc721' && (
          <div className='input-container'>
            <label htmlFor='nftAddress'>NFT Address:</label>
            <input className='input-field' type='text' id='nftAddress' placeholder='Enter NFT address' onChange={(e) => { setNFTaddress(e.target.value); }} />
          </div>
        )}

        {Type === 'erc721' && (
          <div className='input-container'>
            <label htmlFor='noOfNfts'>Number of NFTs:</label>
            <input className='input-field' type='number' id='noOfNfts' placeholder='Enter number of NFTs' onChange={(e) => { setnoofnfts(e.target.value); }} />
          </div>
        )}

        {Type === 'sismo' && (
          <div class='input-container'>
            <label for='sismoGroupId'>Sismo Group ID:</label>
            <input class='input-field' type='text' id='sismoGroupId' placeholder='Enter Sismo Group ID' onChange={(e) => { setsismoid(e.target.value) }} />
          </div>
        )}

        <div class='input-container'>
          <button class='button-17' onClick={handlesubmit}>Start Meeting</button>
        </div>
      </div>
    </div>

  )
}

export default Create