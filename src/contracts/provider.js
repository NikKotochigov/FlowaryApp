import { ethers } from "ethers";

// let provider;

// if(typeof window !== 'undefined' && window?.ethereum){
//    provider = new ethers.providers.Web3Provider(window.ethereum);
// }else{
//  provider = new ethers.providers.InfuraProvider("goerli");
    
// }

const provider = new ethers.providers.InfuraProvider("goerli");

export default provider


