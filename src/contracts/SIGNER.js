import provider from "./provider";
import { ethers } from "ethers";


const conectSigner = (contract) => {
  const signer = provider.getSigner();
  return contract.connect(signer);
};

export default conectSigner;