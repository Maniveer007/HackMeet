import { ethers } from 'ethers'
import React, { useEffect, useState } from 'react'
import getContract from '../utils/getContract'
import NFTcard from '../components/NFTcard'
import SISMOcard from '../components/SISMOcard'

const Live = () => {
  const [sismorooms,setsismorooms]=useState([])
  const [NFTrooms,setNFTrooms]=useState([])

  useEffect(()=>{
    const loadPage =async()=>{
      
      const contract=await getContract();
      const nft=await contract.getallNFTmeetings()
      // console.log(nft);
      const nftcard=nft.map((val,idx)=>{
        return(<NFTcard props={val} idx={idx}/>)
      })
      setNFTrooms(nftcard);
      // setNFTrooms(prevrooms => ([...prevrooms, ...nft]));
      const sismo=await contract.getallsismomeetings()
      // console.log(sismo);
      const sismocard=sismo.map((val,idx)=>{
        return(<SISMOcard props={val} idx={idx} />)
      })
      setsismorooms(sismocard)
      // console.log(NFTrooms);
      // console.log(sismorooms);
    }
    loadPage()
  },[])
  return (<>
    {NFTrooms}
    {sismorooms}
    <div>Live</div>
  </>
  )
}

export default Live