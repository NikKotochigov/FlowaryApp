import { prepareWriteContract, readContract, writeContract } from '@wagmi/core'

import { CONTRACT_ABI } from "consts/contractAbi";
import { ethers } from 'ethers';
import {  setAdmin, setToken } from 'store/reducers/contract/reducer';

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
        console.log('WRITE CONTRACT')
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
        const currentBalanceEmployee = await readContract({
            address: contractAddress,
            abi: CONTRACT_ABI,
            functionName: 'currentBalanceEmployee',
            args: [recieverAddress]
        });
        const currentBalance = Number(ethers.utils.formatUnits(currentBalanceEmployee.toString())) || 0;
        setBalance(currentBalance);
    } catch (error) {
        console.log(error);
    }
}

export const setIsActiveStream = async (contractAddress, recieverAddress, setIsActive) => {
    try {
        const { active } = await readContract({
            address: contractAddress,
            abi: CONTRACT_ABI,
            functionName: 'getStream',
            args: [recieverAddress]
        });
        setIsActive(active);
    } catch (error) {
        console.log(error);
    }
}

