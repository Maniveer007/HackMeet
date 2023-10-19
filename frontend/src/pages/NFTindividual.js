import React, { useState,useEffect } from 'react'
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { useParams } from 'react-router-dom';
import getContract from '../utils/getContract';
import Huddle from '../components/huddle';
import '../components/css/NFTindividual.css';
import huddle from '../components/huddle.js'

const NFTindividual = () => {
  const [isverified,setisverified] =useState(false)
  const [DATA,setDATA] =useState('')
  const [roomid,setroomid] =useState()
  const {id} =useParams();
  
  useEffect(() => {
    getContract().then(async(contract)=>{
      const data=await contract.NFTmeets(id);
      console.log((data));
        setDATA(data[0]);
        console.log(DATA);
    })
  
    
  }, [])
  
  const verify=async()=>{
    try {
      
      
      const contract=await getContract();
      const data=await contract.NFTmeets(id);

      console.log(data.NFTaddress);
      // const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain:"mumbai" });
      
      
      const client = new LitJsSdk.LitNodeClient();
      const chain="mumbai"
      
      await client.connect();
      
      const accessControlConditions = [
        {
          contractAddress: `${data[5]}`,
          standardContractType: 'ERC721',
          chain,
          method: 'balanceOf',
                    parameters: [
                      ':userAddress'
                    ],
                    returnValueTest: {
                      comparator: '>',
                      value: '0'
                    }
                  }
                ]

                const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });
                const decode=await window.litNodeClient.getEncryptionKey({
                  accessControlConditions,
                  toDecrypt:data[3],
                  chain,
                  authSig
                })
                // const encryptedDescriptionBlob=await data[4].bolb()
                const encryptedDescriptionBlob=await (await fetch(data[4])).blob()
                console.log(decode);
                console.log(encryptedDescriptionBlob);
                const decryptedString = await LitJsSdk.decryptString(
    encryptedDescriptionBlob,
    decode
    );
    console.log(decryptedString);
    setisverified(true);
    setroomid(decryptedString);
  } catch (error) {

  }
    
    

  }
  return (
    <div>

      {isverified?(<><Huddle roomid={roomid}/></>):(<><h1> </h1>
      <button onClick={verify}>decrpyt with lit</button></>)}
      
    </div>
  )
}

export default NFTindividual