import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contractSelector } from 'store/reducers/contract/reducer';
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import CustomBadge from '../../ui-component/elements/badge';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import { jsNumberForAddress } from 'react-jazzicon';
import ModalDetails from './modalDetails';
import dayjs from 'dayjs';
// import ChangeRecieverModal from './changeRecieverModal/changeRecieverModal';
// import useContract from '../../../contracts/prepareContract'
// import { setStreamBalance, setIsActiveStream } from 'utils/contractMethods';
// import getErrorMessage from 'utils/getErrorMessage';
// import { ethers } from "ethers";
// import { LoadingButton } from '@mui/lab';
// import { setBalance } from '../../../store/reducers/contract/reducer';
// import { useIsActiveBalanceData } from './hooks/useIsActiveBalanceData';

const OutsourceCard = ({ taskName, wage, who, startDate, deadline }) => {
    // const { address } = useSelector(contractSelector);
    // const { contract, contractSigner } = useContract();
    // const [result, setResult] = useState('');
    const { symbolToken } = useSelector(contractSelector);
    // const dispatch = useDispatch();
    // const [loading, setLoading] = useState(false);
    // console.log('rateStart :', Number(rate)  )

    // const calcRate = Number(rate) / 60 / 60;

    // const { isActive, setIsActive, amountOfStream, isLoading } = useIsActiveBalanceData(address, who);

    // const hadleStartStream = async () => {
    //     try {
    //         setLoading(true)
    //         const startStream = await contractSigner.start(who)
    //         const res = await startStream.wait()
    //         setLoading(false)
    //         console.log("hadleStartStream");
    //         setIsActive(true);
    //         // console.log(res)
    //     } catch (error) {
    //         console.log(error)
    //         setLoading(false)
    //         const message = getErrorMessage(error);
    //         setResult(message);
    //         setTimeout(() => {
    //             setResult('');
    //         }, 2000);
    //     }
    // }

    // const hadleStopStream = async () => {
    //     try {
    //         setLoading(true)
    //         const stopStream = await contractSigner.finish(who)
    //         const res = await stopStream.wait()
    //         setLoading(false)
    //         const bal = await contract.currentBalanceContract();
    //         const balan = Number(ethers.utils.formatUnits(bal, decimalsToken)).toFixed(2)
    //         dispatch(setBalance(balan));
    //         setIsActive(false);
    //         // console.log(res)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const active = deadline > dayjs().unix() 
    return (
        <Grid item xs={12}>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: {
                        xs: 'column', // 100%
                        sm: 'row' //600px
                    },
                    borderRadius: 2,
                    boxShadow: '0 2px 14px 0px rgb(41 109 198 / 80%)',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                {active  ? (
                    <CustomBadge content={'Active stream'}>
                        <Box sx={{ m: 2 }}>
                            <Jazzicon diameter={80} seed={jsNumberForAddress(who)} />
                        </Box>
                    </CustomBadge>
                ) : (
                <Box sx={{ m: 2 }}>
                    <Jazzicon diameter={80} seed={jsNumberForAddress(who)} />
                </Box>
                )}

                <CardContent 
                sx={{ display: 'flex', 
                flexDirection: 'column', 
               alignItems: 'center',
         }}>
                    <Typography variant="h2" color="primary" sx={{display: 'flex', gap: 1, mb: 2}}>
                  {taskName}
                    </Typography> 

                    <ModalDetails>
                    <Typography  textAlign='center' m='10px'
                        variant="h3" color="red">Details of outsource job</Typography>

                        <Typography sx={{display: 'flex', gap: 1, m: 1}}
                        variant="h4" color="secondary">
                            Address of outsourcer: 
                            <Typography variant="h5" color="primary"> {who.slice(0, 5) + '...' + who.slice(38)}
                        </Typography> </Typography>

                    <Typography variant='h4' color='secondary' sx={{display: 'flex', gap: 1, m: 1}}>
                        Wage: <Typography variant="h5" color="primary"> {wage} {symbolToken}
                    </Typography></Typography>

                    <Typography variant='h4' color='secondary' sx={{display: 'flex', gap: 1, m: 1}}>
                        Started at: <Typography variant="h5" color="primary"> {startDate}
                    </Typography></Typography>

                    <Typography variant='h4' color='secondary' sx={{display: 'flex', gap: 1, m: 1}}>
                        Deadline: <Typography variant="h5" color="primary"> {dayjs.unix(deadline).format('HH:mm DD/MM/YYYY')}
                    </Typography></Typography>
                    <Typography variant='h4' color='secondary' sx={{display: 'flex', gap: 1, m: 1}}>
                        Status: <Typography variant="h5" color="primary"> ???? & maybe you offer to show smth more(for instance history of withdraws)?
                    </Typography></Typography>
                    </ModalDetails>

                    {/* Rate: {Number(ethers.utils.formatUnits(rate, decimalsToken)).toFixed(4)} {symbolToken} per hour */}

                    {/* Counter: {(calcRate).toFixed(0)} {symbolToken} per hour */}

                    {/* {isActive && (
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'green' }}>
                            Amount of stream: {amountOfStream.toFixed(5)}
                        </Typography>
                    )} */}
                </CardContent>
                <CardActions>
                    {/* {isActive ? (
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

                        // </Button>
                        )
                        : (
                              <LoadingButton
                              size="small"
                              onClick={hadleStartStream}
                              loading={loading}
                              loadingIndicator="Loading…"
                              variant="outlined"
                            >
                              <span>Start stream</span>
                            </LoadingButton>
                        )} */}
                </CardActions>
                {/* <Typography variant="h4" color="red" fontSize="20px" fontWeight="bold">
                    {result}
                </Typography> */}
                {/* <Box
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
                </Box> */}
            </Card>
        </Grid>
    );
};

export default OutsourceCard;
