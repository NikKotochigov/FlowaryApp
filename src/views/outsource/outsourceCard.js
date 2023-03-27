import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contractSelector } from 'store/reducers/contract/reducer';
import { Box, Button, Card, CardActions, CardContent, Grid, TextField, Typography } from '@mui/material';
import CustomBadge from '../../ui-component/elements/badge';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import { jsNumberForAddress } from 'react-jazzicon';
import ModalDetails from './modalDetails';
import dayjs from 'dayjs';
import useContract from '../../contracts/prepareContract';
import getErrorMessage from 'utils/getErrorMessage';
import { LoadingButton } from '@mui/lab';
import { setArrOutsource, setBalance } from '../../store/reducers/contract/reducer';
import { ethers } from "ethers";

const OutsourceCard = ({ taskName, wage, who, startDate, deadline, id, status }) => {
    // const { address } = useSelector(contractSelector);
    const { contract, contractSigner } = useContract();
    const [result, setResult] = useState('');
    const { symbolToken, decimalsToken } = useSelector(contractSelector);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const wagePerSecond = wage / (deadline - startDate);
    const [wageDynamic, setWageDynamic] = useState((dayjs().unix() - startDate) * wagePerSecond);
    const active = deadline > dayjs().unix();

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (active && wage > 0) {
                setWageDynamic(wageDynamic + wagePerSecond/10);
            }
        }, 100);
        return () => {
            clearInterval(myInterval);
        };
    });

    const handleClaim = async () => {
        try {
            setLoading(true);
            const claim = await contractSigner.claimFinish(id, "i've done everything");
            const res = await claim.wait();
            console.log(res);
            //========refresh array of outsource========//

            const amountOutsources = (await contract.OutsourceID()).toNumber();
            let outsourcesArr = [];
            for (let i = 0; i < amountOutsources; i++) {
                const result = await contract.listOutsource(i);
                const outsourceJob = {
                    taskName: result.task,
                    who: result.who,
                    startDate: Number(result.startAt),
                    deadline: Number(result.deadline),
                    wage: Number(ethers.utils.formatUnits(result.wage, decimalsToken)).toFixed(2),
                    status: Number(result.status),
                    id: i
                };
                outsourcesArr.push(outsourceJob);
            }
            dispatch(setArrOutsource(outsourcesArr));
            //==========end of refresh========//
            setLoading(false);
        } catch (error) {
            console.log(error);
            const message = getErrorMessage(error);
            setLoading(false);
            setResult(message);
            setTimeout(() => {
                setResult('');
            }, 2000);
        }
    };

    const handleFinishJob = async () => {
        try {
            setLoading(true);
            const finishJob = await contractSigner.finishOutsource(id);
            const res = await finishJob.wait();
            console.log(res);
            //========refresh array of outsource & BALANCE========//
            const bal = await contract.currentBalanceContract();
            const balan  = Number(ethers.utils.formatUnits(bal, decimalsToken)).toFixed(2)
            dispatch(setBalance(balan));

            const amountOutsources = (await contract.OutsourceID()).toNumber();
            let outsourcesArr = [];
            for (let i = 0; i < amountOutsources; i++) {
                const result = await contract.listOutsource(i);
                const outsourceJob = {
                    taskName: result.task,
                    who: result.who,
                    startDate: Number(result.startAt),
                    deadline: Number(result.deadline),
                    wage: Number(ethers.utils.formatUnits(result.wage, decimalsToken)).toFixed(2),
                    status: Number(result.status),
                    id: i
                };
                outsourcesArr.push(outsourceJob);
            }
            dispatch(setArrOutsource(outsourcesArr));
            //==========end of refresh========//

            setLoading(false);
        } catch (error) {
            console.log(error);
            const message = getErrorMessage(error);
            setLoading(false);
            setResult(message);
            setTimeout(() => {
                setResult('');
            }, 2000);
        }
    };

    console.log('render');
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
                {active ? (
                    <CustomBadge content={'Active stream'}>
                        <Box sx={{ m: 2 }}>
                            <Jazzicon diameter={80} seed={jsNumberForAddress(who)} />
                        </Box>
                    </CustomBadge>
                ) : status === 1 ? (
                    <CustomBadge content={'Waiting for claim'} color={'green'}>
                        <Box sx={{ m: 2 }}>
                            <Jazzicon diameter={80} seed={jsNumberForAddress(who)} />
                        </Box>
                    </CustomBadge>
                ) : (
                    <CustomBadge content={'Waiting for accept'} color={'primary'}>
                        <Box sx={{ m: 2 }}>
                            <Jazzicon diameter={80} seed={jsNumberForAddress(who)} />
                        </Box>
                    </CustomBadge>
                )}

                <CardContent>
                    <Typography variant="h2" color="primary" >
                        {taskName}
                    </Typography>
  {active && <Typography color='secondary' variant='h4'> {wageDynamic.toFixed(4)} {symbolToken}</Typography>}
                  
                    
                </CardContent>
                <CardActions>
                    <ModalDetails>
                        <Typography textAlign="center" m="10px" variant="h3" color="red">
                            Details of outsource job
                        </Typography>

                        <Typography sx={{ display: 'flex', gap: 1, m: 1 }} variant="h4" color="secondary">
                            Address of outsourcer:
                            <Typography variant="h5" color="primary">
                                {' '}
                                {who.slice(0, 5) + '...' + who.slice(38)}
                            </Typography>{' '}
                        </Typography>

                        <Typography variant="h4" color="secondary" sx={{ display: 'flex', gap: 1, m: 1 }}>
                            Wage:{' '}
                            <Typography variant="h5" color="primary">
                                {' '}
                                {wage} {symbolToken}
                            </Typography>
                        </Typography>

                        <Typography variant="h4" color="secondary" sx={{ display: 'flex', gap: 1, m: 1 }}>
                            Started at:{' '}
                            <Typography variant="h5" color="primary">
                                {' '}
                                {dayjs.unix(startDate).format('HH:mm DD/MM/YYYY')}
                            </Typography>
                        </Typography>

                        <Typography variant="h4" color="secondary" sx={{ display: 'flex', gap: 1, m: 1 }}>
                            Deadline:{' '}
                            <Typography variant="h5" color="primary">
                                {' '}
                                {dayjs.unix(deadline).format('HH:mm DD/MM/YYYY')}
                            </Typography>
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            {status === 2 ? (
                                <LoadingButton
                                    size="large"
                                    onClick={handleFinishJob}
                                    loading={loading}
                                    loadingIndicator="Loading…"
                                    variant="outlined"
                                    sx={{ color: 'primary', minWidth: '170px' }}
                                >
                                    Finish job
                                </LoadingButton>
                            ) : (
                                <LoadingButton
                                    size="large"
                                    onClick={handleClaim}
                                    loading={loading}
                                    loadingIndicator="Loading…"
                                    variant="outlined"
                                    sx={{ color: 'primary', minWidth: '170px' }}
                                >
                                    Claim
                                </LoadingButton>
                            )}
                        </Box>
                        <Typography variant="h4" color="red" fontSize="20px" fontWeight="bold">
                            {result}
                        </Typography>
                    </ModalDetails>
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
