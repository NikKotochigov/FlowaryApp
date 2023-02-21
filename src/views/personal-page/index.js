/* eslint-disable jsx-a11y/iframe-has-title */
import { Box, Button, Grid, Typography } from '@mui/material';
import { goods } from 'consts/data';
import { useSelector } from 'react-redux';
import { contractSelector } from 'store/reducers/contract/reducer';
import CustomBadge from 'ui-component/elements/badge';
import CustomSelector from 'ui-component/elements/customSelector';
import AddRecieverModal from 'ui-component/pages/company/addRecieverModal/addRecieverModal';
import LoadDepositModal from 'ui-component/pages/company/loadDepositModal/loadDepositModal';
import RoleBadge from 'ui-component/pages/company/roleBadge/roleBadge';
import User from '../../ui-component/pages/company/user';
import { useAccount } from 'wagmi';
import provider from '../../contracts/provider';
import { useEffect } from 'react';
import { useState } from 'react';
import { ethers } from 'ethers';
import conectSigner from '../../contracts/SIGNER';
import { useNavigate } from 'react-router';
import History from '../../views//history//index';
import useContract from '../../contracts/prepareContract';
import data from 'assets/images/data.gif';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import Loader from '../../ui-component/elements/loader';
import { v4 as uuidv4 } from 'uuid';
import Demo from 'views/demo';
import { getInfoForCompanyAndEmployee } from 'utils/contractMethods';
import Company from './company';
import Employee from './employee';

// ==============================|| SAMPLE PAGE ||============================== //
const SamplePage = () => {
    const { address: addressWallet } = useAccount();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const { owner, balance, admin, amountEmployee } = useSelector(contractSelector);
    const { contract } = useContract();
    const [arrEmployee, setArrEmployee] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                setLoader(true);

                let employeeArr = [];
                for (let i = 0; i < amountEmployee; i++) {
                    const addrEmpl = await contract.allEmployeeList(i);
                    const employee = await contract.allEmployee(addrEmpl);
                    employeeArr.push(employee);
                }
                setArrEmployee(employeeArr);
                setLoader(false);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [amountEmployee]);

    let employeeOrNot
    if(contract)
    {employeeOrNot = arrEmployee.find((i) => i[0] == addressWallet)};

    return (
        
<>
{contract && addressWallet ?
(addressWallet == owner || addressWallet == admin 
? <Company arrEmployee={arrEmployee}/>
: employeeOrNot && <Employee arrEmployee={arrEmployee}/>)
: <Demo />}

{/* {contract && addressWallet 
?(addressWallet == owner || addressWallet == admin 
     ? <Company arrEmployee={arrEmployee}/>
     : employeeOrNot && <Employee arrEmployee={arrEmployee}/>)
: <Demo />} */}
        </>    
    );
};

export default SamplePage;
