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

// ==============================|| SAMPLE PAGE ||============================== //
const Employee = () => {
    const { address: addressWallet } = useAccount();
    const [arrEmployee, setArrEmployee] = useState([]);
    const [balance, setBalance] = useState('');
    const [admin, setAdmin] = useState('');
    const navigate = useNavigate();
    // const [amountEmployy, setAmountEmployy] = useState(null)
    const [loader, setLoader] = useState(false);
    const { name, owner, address, symbolToken, decimalsToken } = useSelector(contractSelector);
    const { contract } = useContract();
       
    useEffect(() => {
        (async () => {
            try {
                setLoader(true);
                //-----get balance----//
                const bal = (await contract.currentBalanceContract());
                const balan  = Number(ethers.utils.formatUnits(bal, decimalsToken)).toFixed(2)
                                const b = Number(bal)

                console.log('bal', b)
                // console.log({b})
                // const balan  = ethers.utils.formatUnits(bal, decimalsToken)
                // console.log({balan})

                setBalance(balan);
                //-------get admin----//
                const adm = await contract.administrator();
                setAdmin(adm);
                //------get arr of employees---//
                const amount = (await contract.amountEmployee()).toNumber();
                // setAmountEmployy(amount)
                let employeeArr = [];
                for (let i = 0; i < amount; i++) {
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
    }, []);

    console.log(arrEmployee);
    const employeeOrNot = arrEmployee.find((i) => i.who == addressWallet);

    return (
        <>
        <Typography>Page of employy</Typography>

        <Box
            sx={{
                display: {
                    // xs: "block", // 100%
                    sm: 'block', //600px
                    md: 'flex' //900px
                },
                justifyContent: 'center'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1,
                    m: 5
                }}
            >
                <Typography variant="h1" color="red">
                    Your employer is {name}
                </Typography>

            </Box>
          
        </Box>

        <Typography variant="h1" align="center">
            HERE'S GONNA BE COUNTER, i hope
        </Typography>

        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                mt: 5
            }}
        >
            <Box
                sx={{
                    width: 300,
                    height: 120,
                    backgroundColor: 'white',
                    boxShadow: '0 2px 14px 0px rgb(41 109 198 / 80%)',
                    borderRadius: 2
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        height: '100%'
                    }}
                >
                    <Jazzicon diameter={70} seed={jsNumberForAddress(address)} />
                    <Typography variant="h2" color="prime">
                        {address.slice(0, 5) + '...' + address.slice(38)}
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <img src={data} alt="gif" width="100" />
            </Box>
            <Box
                sx={{
                    width: 300,
                    height: 120,
                    backgroundColor: 'white',
                    spacing: 0,
                    boxShadow: '0 2px 14px 0px rgb(41 109 198 / 80%)',
                    borderRadius: 2
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        height: '100%'
                    }}
                >
                    <Jazzicon diameter={70} seed={jsNumberForAddress(addressWallet)} />
                    <Typography variant="h2" color="prime">
                        {addressWallet.slice(0, 5) + '...' + addressWallet.slice(38)}
                    </Typography>
                </Box>
            </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <Button
                variant="outlined"
                size="large"
            //  onClick={() => navigate("/history")}
            >
                Get your earnings
            </Button>
        </Box>
        <History employeeOrNot={employeeOrNot} />
    </>

    );
};

export default Employee;
