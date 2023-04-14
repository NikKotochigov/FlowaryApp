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
import { LoadingButton } from '@mui/lab';
import { setBalance } from '../../../store/reducers/contract/reducer';
import { useIsActiveBalanceData } from './hooks/useIsActiveBalanceData';
import Toolkit from 'ui-component/elements/tooltip';
import useErrorOwner from 'ui-component/elements/useErrorOwner';
import HelperToolkit from 'ui-component/elements/helperTooltip';

const User = ({ who, rate }) => {
    const { address } = useSelector(contractSelector);
    const { contract, contractSigner } = useContract();
    const [result, setResult] = useState('');
    const { symbolToken, decimalsToken, balance } = useSelector(contractSelector);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const calcRate = Number(rate) / 60 / 60;
    const { isActive, setIsActive, amountOfStream, isLoading } = useIsActiveBalanceData(address, who);
    const { errorOwner } = useErrorOwner();

    const hadleStartStream = async () => {
        try {
            setLoading(true)
            const startStream = await contractSigner.start(who)
            const res = await startStream.wait()
            setLoading(false)
            console.log("hadleStartStream");
            setIsActive(true);
            // console.log(res)
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
            await stopStream.wait()
            setLoading(false)
            const bal = await contract.currentBalanceContract();
            const balan = Number(ethers.utils.formatUnits(bal, decimalsToken)).toFixed(2)
            dispatch(setBalance(balan));
            setIsActive(false);
            // console.log(res)
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
                            Amount of stream: {amountOfStream.toFixed(5)}
                        </Typography>
                    )}
                </CardContent>
                <CardActions>
                    {isActive ? (<>
                         <LoadingButton
                         size="small"
                         disabled={errorOwner}
                         onClick={hadleStopStream}
                         loading={loading}
                         loadingIndicator="Loading…"
                         variant="outlined"
                         sx={{ color: 'red' }}
                       >
                         <span>Stop stream</span>
                       </LoadingButton>
                       {errorOwner && <HelperToolkit title='This action allowed only for Owner or Admin of the Company' />}

                       </>)
                        : (<>
<Toolkit
title={"Push this & stream'll start! How it works: your employee starts to work, so you launch stream, at this moment counter of salary also starts. For instance, your employee's worked for 3 hours & 23 mins. You push 'Stop stream' and all money, which employee's earned, transfer from balance of your Company to employees wallet address."}>
                                 <LoadingButton
                              size="small"
                              disabled={errorOwner}
                              onClick={hadleStartStream}
                              loading={loading}
                              loadingIndicator="Loading…"
                              variant="outlined"
                            >
                              <span>Start stream</span>
                            </LoadingButton>  
                            </Toolkit>
                        {errorOwner && <HelperToolkit title='This action allowed only for Owner or Admin of the Company' />}
</>
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
