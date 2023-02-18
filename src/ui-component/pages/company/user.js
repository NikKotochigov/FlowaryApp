import { Badge, Box, Button, Card, CardActions, CardContent, CardMedia, Grid, TextField, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import CustomBadge from '../../elements/badge';
import ControlCheck from '../../elements/controlCheck';
import CustomAvatar from '../../elements/customAvatar';
import BasicModal from '../../elements/modal';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import { jsNumberForAddress } from 'react-jazzicon';
import CustomModal from '../../elements/customModal';
import ChangeRecieverModal from './changeRecieverModal/changeRecieverModal';
import useContract from '../../../contracts/prepareContract'

const User = ({who, rate}) => {
    const [amountPerHour, setAmountPerHour] = useState(null);
    const moneyPerSec = amountPerHour / 60 / 60 / 10;
    const [balance, setBalance] = useState(0);
    const [startstop, setStartstop] = useState(false);
    const { contractSigner } = useContract();

    function handleToggleClick() {
        setStartstop((prev) => !prev);
    }

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (startstop) {
                setBalance(balance + moneyPerSec);
            }
            // if(!startstop) {
            //   setBalance(balance)
            // }
            // if (seconds === 0) {
            //     handleStopClick()
            // }
        }, 100);
        return () => {
            clearInterval(myInterval);
        };
    });



const hadleStartStream = async() => {
    try {
     const startStream = await contractSigner.start(who)
        const res = await startStream.wait()
        handleToggleClick()
        console.log(res)
    } catch (error) {
        console.log(error)
    }
 }
 
 const hadleStopStream = async() => {
    try {
     const stopStream = await contractSigner.finish(who)
        const res = await stopStream.wait()
        handleToggleClick()
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
                {startstop ? (
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
                
                    <Typography variant="h2">
                        Address:
                        {who.slice(0, 5) +
                            '...' +
                            who.slice(38)}
                    </Typography>
                    <Typography variant='h3'>
                        Rate: {rate}
                    </Typography>
                    {startstop && (
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'green' }}>
                            Amount of stream: {balance.toFixed(6)}
                        </Typography>
                    )}
                </CardContent>
                <CardActions
                    sx={{
                        // ml: {
                        //     xs: 0, // 100%
                        //     sm: 0 //600px
                        // },
                        // border: 1
                    }}
                >
                    {/* {startstop ? ( */}
                        <Button variant="outlined" sx={{ color: 'red' }} onClick={hadleStopStream}>
                            Stop stream
                        </Button>
                    {/* ) : ( */}
                        <Button variant="outlined" onClick={hadleStartStream}>
                            Start stream
                        </Button>
                    {/* )} */}
                </CardActions>

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
                      },                        height: {
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
