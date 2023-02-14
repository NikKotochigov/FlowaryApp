import { getContract, fetchSigner } from '@wagmi/core'
import { FACTORY_ABI, FACTORY_ADDRESS } from 'consts/contractFactory'

export const createCompany = async (name) => {
    if (!name) {
        return;
    }
    const signer = await fetchSigner();
    const contractFactory = getContract({
        address: FACTORY_ADDRESS,
        abi: FACTORY_ABI,
        signerOrProvider: signer,
    })
    await contractFactory.createCompany(name);
    const eventFilter = contractFactory.filters.Creation();
    const events = await contractFactory.queryFilter(eventFilter);
    return events[events.length - 1]?.args[0];
}
