import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAccount } from 'wagmi';

import { Box, Button, Grid, Typography } from '@mui/material';

import { contractSelector } from 'store/reducers/contract/reducer';
import AddRecieverModal from 'ui-component/pages/company/addRecieverModal/addRecieverModal';
import RoleBadge from 'ui-component/pages/company/roleBadge/roleBadge';
import User from '../../ui-component/pages/company/user';
import Loader from '../../ui-component/elements/loader';
import { v4 as uuidv4 } from 'uuid';
import AvatarChip from 'ui-component/elements/chip';
import copyTextToClipboard from 'utils/copyPast';
import HeaderCompanyBalance from 'ui-component/elements/headerCompanyBalance';

const Company = () => {
    const { address: addressWallet } = useAccount();
    const [loader, setLoader] = useState(false);
    const { name, owner, balance, address, admin, arrEmployee, symbolToken } = useSelector(contractSelector);
    console.log({ name, owner, balance, address, admin, arrEmployee, symbolToken });
    return (
                <>
             
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                  
<RoleBadge content={(addressWallet === owner && 'Your role is Owner') || (addressWallet === admin && 'Your role is Admin')} />
                    
                    </Box>
       
                    <HeaderCompanyBalance />

                    
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
                            <Grid container spacing={3} maxWidth={700}>
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
