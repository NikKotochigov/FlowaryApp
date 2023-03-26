import { getContract, fetchSigner } from '@wagmi/core'
import { FACTORY_ABI, FACTORY_ADDRESS } from 'consts/contractFactory'
import provider from 'contracts/provider';
import conectSigner from 'contracts/SIGNER';
import { useState } from 'react';
import { setAddress } from 'store/reducers/contract/reducer';
import postRecord from './dataBase/postRecord';



// export const createCompany = async (name, dispatch, setLoading, setActiveStep) => {
//     try {
//         setLoading(true);
//       const signer = await fetchSigner();
//         console.log('TEST INFO')
//         const contractFactory = getContract({
//             address: FACTORY_ADDRESS,
//             abi: FACTORY_ABI,
//          signerOrProvider: signer,
//         })
//         const tx = await contractFactory.createCompany(name);
//         const response = await tx.wait();
//         await postRecord(name, response.logs[0].address);
//         dispatch(setAddress(response.logs[0].address));
//         setLoading(false);
//         setActiveStep(prev => prev + 1);
//     } catch (error) {
//         setLoading(false);
//         console.log(error);
//     }
// }

export const createCompany = async (name, dispatch, setLoading, setActiveStep) => {
    try {
        setLoading(true);
        const contractFactory = getContract({
            address: FACTORY_ADDRESS,
            abi: FACTORY_ABI,
         signerOrProvider: provider,
        })
        const contractSigner = conectSigner(contractFactory)
        const tx = await contractSigner.createCompany(name);
        const response = await tx.wait();
        await postRecord(name, response.logs[0].address);
        dispatch(setAddress(response.logs[0].address));
        setLoading(false);
        setActiveStep(prev => prev + 1);
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
}
