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
// ==============================|| SAMPLE PAGE ||============================== //
const SamplePage = () => {
    const { name, owner, address } = useSelector(contractSelector);
    const { address: addressWallet } = useAccount();
    const [arrEmployee, setArrEmployee] = useState([]);
    const [balance, setBalance] = useState('');
    const [admin, setAdmin] = useState('');
    const navigate = useNavigate();
    const { contract } = useContract();

    const [loader, setLoader] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoader(true);
                //-----get balance----//
                const decimals = (await contract.getDecimals()).toNumber();
                const bal = (await contract.currentBalanceContract()).toString();
                const cut = bal.length - decimals;
                const balan = bal.slice(0, cut);
                setBalance(balan);
                //-------get admin----//
                const adm = await contract.administrator();
                setAdmin(adm);
                //------get arr of employees---//
                const amount = (await contract.amountEmployee()).toNumber();
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
            {addressWallet == owner || addressWallet == admin ? (
                <>
                    <RoleBadge content={(addressWallet === owner && 'Your role is Owner') || (addressWallet === admin && 'Your role is Admin')} />
                    <Box
                        sx={{
                            display: {
                                // xs: "block", // 100%
                                sm: 'block', //600px
                                md: 'flex' //900px
                            },
                            justifyContent: 'space-between'
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
                                COMPANY {name}
                            </Typography>

                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => navigate('/history')}
                                sx={{
                                    minWidth: '100px'
                                }}
                            >
                                Activity history
                            </Button>
                            {/* <CustomSelector /> */}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 2,
                                m: 5
                            }}
                        >
                            <Typography variant="h2" color="common.main">
                                Avaibale balance: {balance}
                            </Typography>
                            <LoadDepositModal />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 2,
                            mb: 3
                        }}
                    >
                        <AddRecieverModal
                        // hadleNewUser={hadleNewUser}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        {loader ? (
                            <Loader />
                        ) : (
                            <Grid container spacing={3} maxWidth={800}>
                                {arrEmployee.map((item) => (
                                    <User key={item[0]} who={item[0]} rate={item[1].toString()} />
                                ))}
                            </Grid>
                        )}
                    </Box>
                </>
            ) : employeeOrNot ? (
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

                            {/* <CustomSelector /> */}
                        </Box>
                        {/* <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        m: 5
                    }}
                >
                    <Typography variant="h2" color="common.main">
                        Avaibale balance: {balance}
                    </Typography>
                    <LoadDepositModal />
                </Box> */}
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
            ) : (
                <>
                    <Typography>Demo page</Typography>
                </>
            )}
        </>
    );
};

export default SamplePage;
