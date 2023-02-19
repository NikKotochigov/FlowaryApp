import { getContract, fetchSigner } from '@wagmi/core'
import { FACTORY_ABI, FACTORY_ADDRESS } from 'consts/contractFactory'
import { setAddress } from 'store/reducers/contract/reducer';

export const createCompany = async (name, dispatch, setLoading, setActiveStep) => {
    try {
        setLoading(true);
        const signer = await fetchSigner();
        const contractFactory = getContract({
            address: FACTORY_ADDRESS,
            abi: FACTORY_ABI,
            signerOrProvider: signer,
        })
        const tx = await contractFactory.createCompany(name);
        await tx.wait(1);
        const eventFilter = contractFactory.filters.Creation();
        const events = await contractFactory.queryFilter(eventFilter);
        dispatch(setAddress(events[events.length - 1]?.args[0]));
        setLoading(false);
        setActiveStep(prev => prev + 1);
    } catch (error) {
        setLoading(false);
        console.log(error);
    }
}
