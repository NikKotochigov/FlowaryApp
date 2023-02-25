import { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import { readContracts } from 'wagmi';
import { useSelector } from 'react-redux';

import { CONTRACT_ABI } from 'consts/contractAbi'
import { contractSelector } from 'store/reducers/contract/reducer';

export const useIsActiveBalanceData = (address, recieverAddress) => {

    const { decimalsToken } = useSelector(contractSelector);

    const [isLoading, setIsLoading] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [amountOfStream, setAmountOfStream] = useState(0);
    const [intervalId, setIntervalId] = useState(0);

    useEffect(() => {
        const readContractInfo = async () => {
            try {
                setIsLoading(true);
                const data = await readContracts({
                    contracts: [
                        {
                            address,
                            abi: CONTRACT_ABI,
                            functionName: 'currentBalanceEmployee',
                            args: [recieverAddress]
                        },
                        {
                            address,
                            abi: CONTRACT_ABI,
                            functionName: 'getStream',
                            args: [recieverAddress]
                        },
                    ],
                })
                const balance = Number(ethers.utils.formatUnits(data[0]?.toString(), decimalsToken)) || 0;
                const isActiveStream = data[1]?.active;
                const rate = Number(ethers.utils.formatUnits(data[1]?.rate, decimalsToken));
                console.log({ balance, rate });
                setIsActive(isActiveStream);
                if (!isActiveStream) return
                setAmountOfStream(balance);
                const id = setInterval(() => setAmountOfStream(prev => prev + rate / 10), 100);
                setIntervalId(id);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        }
        readContractInfo();
        return () => clearInterval(intervalId);
    }, [address, recieverAddress, isActive])

    return { setIsActive, isActive, amountOfStream, isLoading }
}
