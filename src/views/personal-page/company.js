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

// ==============================|| SAMPLE PAGE ||============================== //
const Company = ({arrEmployee}) => {
    const { address: addressWallet } = useAccount();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
       const { name, owner, balance, address, admin, decimalsToken, symbolToken } = useSelector(contractSelector);
    
       console.log('massiv sotrudnikov :', arrEmployee);

    return (
                <>
                 <Box
                        sx={{
                            display: {
                                sm: 'block', //600px
                                md: 'flex' //900px
                            },
                            direction: 'row',
                            justifyContent: 'space-between'
                        }}
                    >
 <RoleBadge 
 content={`Address of contract: ${address.slice(0, 5) + '...' + address.slice(38)}`}
 sx={{
    minWidth: '200px',
    display: 'flex'
 }}
 />
                    <RoleBadge sx={{display: 'flex'}} content={(addressWallet === owner && 'Your role is Owner') || (addressWallet === admin && 'Your role is Admin')} />
       
</Box>
                    <Box
                        sx={{
                            display: {
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
                            <Typography variant="h2" color="primary">
                                Company {name}
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
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 1,
                                m: 5
                            }}
                        >
                            <Typography variant="h2" color="primary">
                                    Avaibale balance: {balance} {symbolToken}
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
                                    <User key={uuidv4()} who={item.who} rate={item.rate} />
                                ))}
                            </Grid>
                        )}
                    </Box>
                </>
    );
};

export default Company;
