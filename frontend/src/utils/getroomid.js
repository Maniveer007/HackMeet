import axios from "axios";

import {ethers} from 'ethers'



const getroomid=async()=>{
    const provider=new ethers.providers.Web3Provider(window.ethereum)
    const signer=await provider.getSigner();
    const response = await axios.post(
    'https://iriko.testing.huddle01.com/api/v1/create-room',
    {
      title: 'Huddle01-Test',
      hostWallets: [`${await signer.getAddress()}`],
    },
    {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': "VwTZ4AGTxme9snANex9tep3NwvVMGfYd"
        }
    }
    );
    return response.data.data.roomId;

}

export default getroomid;
