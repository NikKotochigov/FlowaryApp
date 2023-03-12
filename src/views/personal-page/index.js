import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAccount } from 'wagmi';
import { contractSelector } from 'store/reducers/contract/reducer';

import Company from './company';
import Employee from './employee';
import Main from 'views/main/default';

const SamplePage = () => {
    const { address: addressWallet } = useAccount();
    const { address, owner, arrEmployee, admin } = useSelector(contractSelector);

    const [isEmployee, setIsEmployee] = useState(false);

    useEffect(() => {
        const findedEmployee = arrEmployee.find((item) => item.who === addressWallet);
        setIsEmployee(findedEmployee != undefined);
    }, [arrEmployee, addressWallet])

    // if (!address) return null
    console.log({ address, addressWallet, isEmployee });
    return (
        <>
            {address && addressWallet ?
                (addressWallet == owner || addressWallet == admin
                    ? <Company />
                    : isEmployee && <Employee arrEmployee={arrEmployee} />)
                : <Main />}
        </>
    );
};

export default SamplePage;
