import { ethers } from "ethers";

let walletProvider;

if (typeof window !== "undefined" && window?.ethereum) {
  walletProvider = new ethers.providers.Web3Provider(window.ethereum);
} 

export default walletProvider;

