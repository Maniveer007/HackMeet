import { ethers } from "ethers";
import abi from './abi/abi.json'

const getContract=async()=>{
    // const provider=new ethers.BrowserProvider(window.ethereum)
    const provider=new ethers.providers.Web3Provider(window.ethereum)
    const signer=await provider.getSigner();

    const address='0x0386BE4E536a8652CBDb5B3c906C4bd438Ac2987'
    const contract=new ethers.Contract(address,abi,signer)
    return contract

}
export default getContract;