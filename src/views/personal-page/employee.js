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
import History from '../../views//history//index';
import useContract from '../../contracts/prepareContract';
import data from 'assets/images/data.gif';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import Loader from '../../ui-component/elements/loader';
import { v4 as uuidv4 } from 'uuid';
import AvatarChip from 'ui-component/elements/chip';
import Toolkit from 'ui-component/elements/tooltip';
import copyTextToClipboard from 'utils/copyPast';

// ==============================|| SAMPLE PAGE ||============================== //
const Employee = ({arrEmployee}) => {
    const { address: addressWallet } = useAccount();
    const [loader, setLoader] = useState(false);
    const { name, address, admin, owner } = useSelector(contractSelector);
    // const { contract } = useContract();
    let areYouEmployee
    if(address && addressWallet) {
        if(addressWallet === owner) areYouEmployee = undefined
        else if(addressWallet === admin) areYouEmployee = undefined
        else {areYouEmployee = arrEmployee.find((i) => i.who == addressWallet)};
    }
    console.log('rabotnik ili kto :', areYouEmployee)

    return (
        <>
        
          <Toolkit title={"Click on it to copy!"}>
            <Button variant='text'
                onClick={()=>{copyTextToClipboard(address)}}
            >
          <AvatarChip 
         address={address} />        
            </Button>
                    </Toolkit>
   

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
                    m: 3
                }}
            >
                <Typography variant="h2" color="primary">
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
                Get your funds
            </Button>
        </Box>
        <History 
        areYouEmployee={areYouEmployee} 
        />
    </>

    );
};

export default Employee;
