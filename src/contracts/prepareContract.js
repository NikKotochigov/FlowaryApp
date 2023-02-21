import provider from "./provider";
import conectSigner from "./SIGNER";
import { getContract } from '@wagmi/core'
import { useSelector } from 'react-redux';
import { contractSelector } from '../store/reducers/contract/reducer';
import { CONTRACT_ABI } from "../consts/contractAbi";

const useContract = () => {
const { address } = useSelector(contractSelector); 
let contract;
if(address){
  contract = getContract({
  address: address,
  abi: CONTRACT_ABI,
  signerOrProvider: provider,
})
}
let contractSigner;
if(contract) {
contractSigner = conectSigner(contract)
}
    return {contract, contractSigner};
}
export default useContract;

