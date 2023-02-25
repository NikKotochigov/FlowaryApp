import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contractSelector } from 'store/reducers/contract/reducer';
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import CustomBadge from '../../elements/badge';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import { jsNumberForAddress } from 'react-jazzicon';
import ChangeRecieverModal from './changeRecieverModal/changeRecieverModal';
import useContract from '../../../contracts/prepareContract'
import { setStreamBalance, setIsActiveStream } from 'utils/contractMethods';
import getErrorMessage from 'utils/getErrorMessage';
import { ethers } from "ethers";
import {  setBalance } from '../../../store/reducers/contract/reducer';
import { LoadingButton } from '@mui/lab';

const User = ({ who, rate }) => {
    const [isActive, setIsActive] = useState(false);
    const [localBalance, setLocalBalance] = useState(0);
    const { address } = useSelector(contractSelector);
    const { contract, contractSigner } = useContract();
    const [result, setResult] = useState('');
    const { symbolToken, decimalsToken, balance } = useSelector(contractSelector);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    console.log('rateStart :', Number(rate)  )

    // console.log('rateUTILS :', Number(ethers.utils.formatUnits(rate, decimalsToken)).toFixed(2))

    // const calcRate = ethers.utils.formatUnits(rate);
    const calcRate = Number(rate)/60/60;

    function handleToggleClick() {
        setIsActive((prev) => !prev);
    }

    useEffect(() => {
        setIsActiveStream(address, who, setIsActive);
        if (!isActive) return
        setStreamBalance(address, who, setLocalBalance);
        const intervalId = setInterval(() => setLocalBalance(prev => prev + calcRate / 10), 100)

        return () => clearInterval(intervalId)
    }, [address, isActive, who]);

    const hadleStartStream = async () => {
        try {
            setLoading(true)
            const startStream = await contractSigner.start(who)
            const res = await startStream.wait()
            handleToggleClick()
            console.log(res)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            const message = getErrorMessage(error);
            setResult(message);
            setTimeout(() => {
                setResult('');
            }, 2000);
        }
    }

    const hadleStopStream = async () => {
        try {           
            setLoading(true)
            const stopStream = await contractSigner.finish(who)
            const res = await stopStream.wait()
            setLoading(false)
            handleToggleClick()
            const bal = await contract.currentBalanceContract();
            const balan  = Number(ethers.utils.formatUnits(bal, decimalsToken)).toFixed(2)
            dispatch(setBalance(balan));
                        console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Grid item xs={12}>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: {
                        xs: 'column', // 100%
                        sm: 'row' //600px
                        // md: 'row', //900px
                        // lg: 'flex', //1200px
                        // xl: 'flex', //1536px
                    },
                    borderRadius: 2,
                    boxShadow: "0 2px 14px 0px rgb(41 109 198 / 80%)",
                    // minHeight: 160,
                    alignItems: 'center',
                    justifyContent: 'space-between',

                }}
            >
                {isActive ? (
                    <CustomBadge content={'Active stream'}>
                        {/* <CustomAvatar n={name}  /> */}
                        <Box sx={{ m: 2 }}>
                            <Jazzicon diameter={80} seed={jsNumberForAddress(who)} />
                        </Box>
                    </CustomBadge>
                ) : (
                    // <CustomAvatar n={name} />
                    <Box sx={{ m: 2 }}>
                        <Jazzicon diameter={80} seed={jsNumberForAddress(who)} />
                    </Box>
                )}

                <CardContent
                // sx={{ border: 1 }}
                >

                    <Typography variant="h2" color='primary'>
                        Address: {who.slice(0, 5) + '...' + who.slice(38)}
                    </Typography>
                    <Typography variant='h4' color='secondary'>
  {/* Rate: {Number(ethers.utils.formatUnits(rate, decimalsToken)).toFixed(4)} {symbolToken} per hour */}
  Rate: {rate} {symbolToken} per hour 

                        {/* Counter: {(calcRate).toFixed(0)} {symbolToken} per hour */}
                    </Typography>
                    {isActive && (
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'green' }}>
                            Amount of stream: {localBalance.toFixed(5)}
                        </Typography>
                    )}
                </CardContent>
                <CardActions>
                    {isActive ? (
                         <LoadingButton
                         size="small"
                         onClick={hadleStopStream}
                         loading={loading}
                         loadingIndicator="Loading…"
                         variant="outlined"
                         sx={{ color: 'red' }}
                       >
                         <span>Stop stream</span>
                       </LoadingButton>

                        // <Button variant="outlined" sx={{ color: 'red' }} onClick={hadleStopStream}>
                        //     Stop stream
                        // </Button>
                        )
                        : (
                            // <Button variant="outlined" onClick={hadleStartStream}>
                            //     Start stream
                            // </Button>
                              <LoadingButton
                              size="small"
                              onClick={hadleStartStream}
                              loading={loading}
                              loadingIndicator="Loading…"
                              variant="outlined"
                            >
                              <span>Start stream</span>
                            </LoadingButton>
                        )}

                </CardActions>
                <Typography variant="h4" color="red" fontSize="20px" fontWeight="bold">
                    {result}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'top',
                        pt: 1,
                        //  border: 1,
                        mr: {
                            xs: 0, // 100%
                            sm: 2 //600px
                        }, height: {
                            xs: '60px', // 100%
                            sm: '130px' //600px
                        },

                    }}
                >
                    <ChangeRecieverModal who={who} />
                </Box>
            </Card>
        </Grid>
    );
};

export default User;
