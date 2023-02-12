import {
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import CustomBadge from "../../elements/badge";
import ControlCheck from "../../elements/controlCheck";
import CustomAvatar from "../../elements/customAvatar";
import BasicModal from "../../elements/modal";
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { jsNumberForAddress } from "react-jazzicon";

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
  // const handleClose = () => {
  //   setOpen(false);
  // };
  
  return (
    <Grid item xs={12}>

      <Card
        sx={{
          display: 'flex',
          flexDirection: {
            xs: "column", // 100%
            sm: "row", //600px
            //md: 'row', //900px
            // lg: 'flex', //1200px
            // xl: 'flex', //1536px
          },
          borderRadius: 2,
          boxShadow: theme.shadows[25],
          minHeight: 160,
         alignItems: "center",
          justifyItems: 'center',
        }}
      >
        
             {startstop ? (
          <CustomBadge content={"Active stream"}>
            {/* <CustomAvatar n={name}  /> */}
           <Box sx={{m:2, }}>
                  <Jazzicon
             diameter={90}
            seed={jsNumberForAddress('0x1AFaF7463894656662E6BdcbDC775227rrE6acbB')}
                        />
           </Box>
      
         </CustomBadge>
        ) : (
          // <CustomAvatar n={name} />
          <Box sx={{m:2, }}>
          <Jazzicon
     diameter={90}
    seed={jsNumberForAddress('0x1AFaF7463894656662E6BdcbDC775227rrE6acbB')}
                />
   </Box>
        )} 
        
    
        <CardContent>
          {/* <Typography variant="h6" component="h3">
            {name}
          </Typography> */}
          <Typography variant="h5">
            Address: 
            {'0x1AFaF7463894656662E6BdcbDC775227rrE6acbB'.slice(0, 5) +
                          "..." +
                          '0x1AFaF7463894656662E6BdcbDC775227rrE6acbB'.slice(38)}
          </Typography>
          {startstop && (
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "green" }}
            >
              Amount of stream: {balance.toFixed(6)}
            </Typography>
          )}
        </CardContent>
        {/* {!check ? ( */}
          <CardActions
            sx={{ ml: {
                xs: 0, // 100%
                sm: 15, //600px
              },
            }}
          >

            {startstop ? (
              <Button
                variant="outlined"
                sx={{ color: "red" }}
                onClick={handleToggleClick}
              >
                Stop stream
              </Button>
            ) : (
              <Button
              variant="outlined"
              onClick={handleToggleClick}
            >
              Start stream
            </Button>
              // <BasicModal
              //   nameModal={"Start Stream"}
              //   open={open}
              //   handleClickOpen={handleClickOpen}
              //   // handleClose={handleClose}
              // >
              //   <Box
              //     sx={{
              //       display: "flex",
              //       flexDirection: "column",
              //       alignItems: "center",
              //       gap: 2,
              //       width: 400,
              //     }}
              //   >
              //     <CardMedia
              //       component="img"
              //       height="160"
              //       image="/static/images/stream.jpg"
              //       alt="stream picture"
              //     />
              //     <TextField
              //       fullWidth
              //       label="Amount per hour"
              //       variant="outlined"
              //       onChange={(e) => setAmountPerHour(e.target.value)}
              //     />
              //     <Box onClick={handleClickOpen}>
              //       <Button variant="outlined" onClick={handleToggleClick}>
              //         Start stream
              //       </Button>
              //     </Box>
              //   </Box>
              // </BasicModal>


            )}


         </CardActions>
         <Box sx={{display: "flex",
                        flexDirection: "column",
                        alignItems: "top",
                        height: {
                          xs: '60px', // 100%
                          sm: '130px', //600px
                        },
                        ml: {
                          xs: 0, // 100%
                          sm: 5, //600px
                        },
                        }}>
  <ManageAccountsRoundedIcon style={{fontSize: '300%', color: '#0047AB'}}
  onClick={()=>console.log('ff')}
  />
                         
                        </Box>
        
        {/* ) : (
    <Box ml="150px">
           <ControlCheck />
          </Box>
        )} */}
      </Card>
    </Grid>
  );
};

export default User;
