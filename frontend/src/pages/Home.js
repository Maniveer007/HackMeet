import React from 'react'
import {ethers} from 'ethers'
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const connect=async()=>{
        const provider=new ethers.providers.Web3Provider(window.ethereum)
        try {
            window.ethereum.on("chainChanged",()=>{
                window.location.reload();
              })
      
              window.ethereum.on("accountsChanged",()=>{
                window.location.reload();
                
              })
            const net=await provider.getNetwork()
            console.log(net.chainId);
        if(net.chainId!="0x13881"){
        //   console.log("entered");
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x13881'}],
            });
            
         } catch (switchError) {
            console.log(switchError)
          }
        }
            await provider.send("eth_requestAccounts", []);
            const signer=await provider.getSigner();
            // console.log(signer);
            if(signer.getAddress()){
                navigate("/live");
            }else{
                window.alert("connect to wallet")
            }
        } catch (error) {
            console.log(error);
        }
            
    }
    connect();
  return (
    <button onClick={connect}>connect wallet</button>
  )
}

export default Home