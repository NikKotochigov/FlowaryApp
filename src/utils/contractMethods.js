import { prepareWriteContract, readContract, writeContract } from '@wagmi/core'

import { CONTRACT_ABI } from "consts/contract";

export const setContractToken = async (tokenAddress, contractAddress) => {
    const config = await prepareWriteContract({
        address: contractAddress,
        abi: CONTRACT_ABI,
        functionName: 'setToken',
        args: [tokenAddress]
    })

    await writeContract(config);
    return tokenAddress;
}

export const setContractAdmin = async (adminAddress, contractAddress) => {
    const config = await prepareWriteContract({
        address: contractAddress,
        abi: CONTRACT_ABI,
        functionName: 'changeAdmin',
        args: [adminAddress]
    })
    await writeContract(config);
    return adminAddress;
}