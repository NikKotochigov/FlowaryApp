import { prepareWriteContract, readContract, writeContract } from '@wagmi/core'

import { CONTRACT_ABI } from "consts/contractAbi";
import { ethers } from 'ethers';
import { setAdmin, setToken } from 'store/reducers/contract/reducer';

export const setContractToken = async (tokenAddress, contractAddress, dispatch, setLoading, setActiveStep) => {
    try {
        setLoading(true);
        const config = await prepareWriteContract({
            address: contractAddress,
            abi: CONTRACT_ABI,
            functionName: 'setToken',
            args: [tokenAddress]
        })
        await writeContract(config);
        dispatch(setToken(tokenAddress));
        setActiveStep(prev => prev + 1);
        setLoading(false);
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
}

export const setContractAdmin = async (adminAddress, contractAddress, dispatch, setLoading, setActiveStep) => {
    try {
        setLoading(true);
        const config = await prepareWriteContract({
            address: contractAddress,
            abi: CONTRACT_ABI,
            functionName: 'changeAdmin',
            args: [adminAddress]
        })
        await writeContract(config);
        dispatch(setAdmin(adminAddress));
        setActiveStep(prev => prev + 1);
        setLoading(false);
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
}

export const getCurrentBalanceEmployee = async (contractAddress, recieverAddress) => {
    try {
        const currentBalanceEmployee = await readContract({
            address: contractAddress,
            abi: CONTRACT_ABI,
            functionName: 'currentBalanceEmployee',
            args: [recieverAddress]
        });
        const currentBalance = currentBalanceEmployee.toString();
        console.log({ currentBalance, formatUnits: Number(ethers.utils.formatUnits(currentBalance)) });
        return ethers.utils.formatUnits(currentBalance);
    } catch (error) {
        console.log(error);
        return 0;
    }
}

export const setStreamBalance = async (contractAddress, recieverAddress, setBalance) => {
    try {
        const { flowRate } = await readContract({
            address: contractAddress,
            abi: CONTRACT_ABI,
            functionName: 'allEmployee',
            args: [recieverAddress]
        });
        const rate = ethers.utils.formatUnits(Number(flowRate.toString()));
        const intervalId = setInterval(() => {
            setBalance(prev => prev + rate / 10);
        }, 100);
        return intervalId;
    } catch (error) {
        console.log(error);
    }
}