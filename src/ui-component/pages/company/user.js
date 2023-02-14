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

const User = () => {
    const theme = useTheme();
    const [amountPerHour, setAmountPerHour] = useState(null);
    const moneyPerSec = amountPerHour / 60 / 60 / 10;
    const [balance, setBalance] = useState(0);
    const [startstop, setStartstop] = useState(false);

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

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(!open);
    };


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
                    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 30%)',
                    // minHeight: 160,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  
                }}
            >
                {startstop ? (
                    <CustomBadge content={'Active stream'}>
                        {/* <CustomAvatar n={name}  /> */}
                        <Box sx={{ m: 2 }}>
                            <Jazzicon diameter={80} seed={jsNumberForAddress('0x1AFaF7463894656662E6BdcbDC775227rrE6acbB')} />
                        </Box>
                    </CustomBadge>
                ) : (
                    // <CustomAvatar n={name} />
                    <Box sx={{ m: 2 }}>
                        <Jazzicon diameter={80} seed={jsNumberForAddress('0x1AFaF7463894656662E6BdcbDC775227rrE6acbB')} />
                    </Box>
                )}

                <CardContent 
                // sx={{ border: 1 }}
                >
                
                    <Typography variant="h2">
                        Address:
                        {'0x1AFaF7463894656662E6BdcbDC775227rrE6acbB'.slice(0, 5) +
                            '...' +
                            '0x1AFaF7463894656662E6BdcbDC775227rrE6acbB'.slice(38)}
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
                    {startstop ? (
                        <Button variant="outlined" sx={{ color: 'red' }} onClick={handleToggleClick}>
                            Stop stream
                        </Button>
                    ) : (
                        <Button variant="outlined" onClick={handleToggleClick}>
                            Start stream
                        </Button>
                    )}
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
                    <ChangeRecieverModal />
                </Box>
            </Card>
        </Grid>
    );
};

export default User;
