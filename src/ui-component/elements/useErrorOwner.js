import { useSelector } from 'react-redux';
import { contractSelector } from 'store/reducers/contract/reducer';
import { useAccount } from 'wagmi';

const useErrorOwner = () => {
const { address } = useAccount();
const { owner, admin } = useSelector(contractSelector);
const errorOwner = (address != owner && address != admin);
return {errorOwner};
}

export default useErrorOwner;
