import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAccount } from 'wagmi';
import { contractSelector } from 'store/reducers/contract/reducer';

import Company from './company';
import Employee from './employee';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Sorry from 'ui-component/elements/sorry';
import WalletPointer from 'ui-component/elements/walletPointer';

const SamplePage = () => {
    const { address: addressWallet } = useAccount();
    const { address, owner, arrEmployee, admin } = useSelector(contractSelector);

    const [isEmployee, setIsEmployee] = useState(false);

    useEffect(() => {
        const findedEmployee = arrEmployee.find((item) => item.who === addressWallet);
        setIsEmployee(findedEmployee != undefined);
    }, [arrEmployee, addressWallet]);

    // if (!address) return null
    console.log({ address, addressWallet, isEmployee });

    return (
        <> {
            address === '0x3598f3a5A8070340Fde9E9cEcaF6F1F0129b323a'
            ? <Company />
            : (addressWallet ? (
                addressWallet == owner || addressWallet == admin ? (
                    <Company />
                ) : isEmployee ? (
                    <Employee arrEmployee={arrEmployee} />
                ) : (<Sorry />)
            ) : (<WalletPointer />))
        }
           
        </>
    );
};

export default SamplePage;
