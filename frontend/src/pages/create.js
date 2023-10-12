import React, { useState } from 'react'
import Select from 'react-select';
import getContract from '../utils/getContract';
import getroomid from '../utils/getroomid';
import uselit from '../utils/useLit';
import * as PushAPI from '@pushprotocol/restapi';
import { ethers } from 'ethers';

const Create = () => {
  const [Type,setType]=useState('')
  const [Name,setName]=useState('')
  const [des,setdes]=useState('')
  const [NFTaddress,setNFTaddress]=useState('')
  const [noofnfts,setnoofnfts]=useState('')
  const [sismoid,setsismoid]=useState('')



  // const handlesubmit=async()=>{
    
  //   }
  
  const handlesubmit=async()=>{
    console.log(Name,des,NFTaddress,noofnfts,sismoid);
    const contract=await getContract();
    // console.log(contract);
    if(Type=='erc721'){
      const roomid=await getroomid();
      console.log(roomid);
      const provider=new ethers.providers.Web3Provider(window.ethereum)
    const signer=await provider.getSigner()
    const addressme=await signer.getAddress()
    var user = await PushAPI.user.get({
			account: `eip155:${addressme}`,
		});
		if (user === null) {
			const user = await PushAPI.user.create({
				account: `eip155:${addressme}`,
			});
		} 
    
    var user = await PushAPI.user.get({
			account: `eip155:${addressme}`,
		});
    const pgpDecryptedPvtKey = await PushAPI.chat.decryptPGPKey({
			encryptedPGPPrivateKey: user.encryptedPrivateKey,
			signer: signer,
		});
   
    const options={
      groupName: Name,
			groupDescription:  des,
			members: [],
			groupImage: ' ',
			admins: [],
			isPublic: true,
			account: addressme,
			pgpPrivateKey: pgpDecryptedPvtKey,
      // contractAddressNFT:"eip155:80001:0x4Bd4CFeF2651104bC3a5cbB578A3EEbd24167fdc",
      // numberOfERC721 :1,
    }
    
    const response = await PushAPI.chat.createGroup(options);
    console.log(typeof(response.chatId));
    const chatid=response.chatId;
      const {toDecrypt,encryptedDescriptionString}=await uselit({hash:chatid,NFTaddress})
      
      const responce=await contract.createNFTmeeting(Name,des,toDecrypt,encryptedDescriptionString,NFTaddress,noofnfts);
      console.log(responce);
      const txresponse=await responce.wait()
      console.log(txresponse);
    }
    if(Type==='sismo'){
      const roomid=await getroomid();
      const responce=await contract.createsismomeeting(Name,des,sismoid,roomid);
      console.log(responce);
      const txresponse=await responce.wait()
      console.log(txresponse);
    }
  }
  return (<>
    <div>Create</div>
    <input type='text' placeholder='name of room' onChange={(e)=>{setName(e.target.value)}}/>
    <input type='text' placeholder='description of room' onChange={(e)=>{setdes(e.target.value)}} />
    <Select
          placeholder="Open"
          label="Gating"
          options={[
            { label: 'ERC-721', value: 'erc721' },
            { label: 'Sismo', value: 'sismo' },
          ]}
          onChange={(e) => setType(e.value)}
        />

        {Type==='erc721'&&<>
        <input type='text' placeholder='NFTaddress' onChange={(e)=>{setNFTaddress(e.target.value)}}/>
        <input type='number' placeholder='noofnfts' onChange={(e)=>{setnoofnfts(e.target.value)}}/>
        </>}
        {Type==='sismo'&&<>
        <input type='text' placeholder='sismogroupid' onChange={(e)=>{setsismoid(e.target.value)}}/>
        {/* <input type='number' placeholder='noofnfts' /> */}
        </>}

        <button onClick={handlesubmit} >create</button>
  </>
  )
}

export default Create