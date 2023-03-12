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
import Toolkit from 'ui-component/elements/tooltip';
import copyTextToClipboard from 'utils/copyPast';

const Company = () => {
    const { address: addressWallet } = useAccount();
    const [loader, setLoader] = useState(false);
    const { name, owner, balance, address, admin, arrEmployee, symbolToken } = useSelector(contractSelector);
    console.log({ name, owner, balance, address, admin, arrEmployee, symbolToken });
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <RoleBadge content={(addressWallet === owner && 'Your role is Owner') || (addressWallet === admin && 'Your role is Admin')} />
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
                        m: 3
                    }}
                >
                    <Typography variant="h2" color="primary">
                        Company: {name}
                    </Typography>
                    <Toolkit title={"Click on it to copy!"}>
                        <Button variant='text'
                            onClick={() => copyTextToClipboard(address)}
                        >
                            <AvatarChip address={address} />
                        </Button>
                    </Toolkit>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                        m: 4
                    }}
                >
                    <Typography variant="h4" color="primary">
                        Available balance: {balance} {symbolToken}
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        gap: 1
                    }}>
                    </Box>
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
