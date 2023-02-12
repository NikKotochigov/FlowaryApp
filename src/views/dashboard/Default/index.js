

// ==============================|| DEFAULT DASHBOARD ||============================== //

// const Dashboard = () => {

//     return (
//         <>
//         ghfghfg
//         </>
//     );
// };

// export default Dashboard;
import {
    Box,
    Button,
    Card,
    CardMedia,
    Grid,
    Popover,
    TextField,
    Typography,
    useTheme,
  } from "@mui/material";
  import BasicModal from "../../../components/elements/modal";
  import { useState } from "react";
  import { useRouter } from "next/router";
  import { useDispatch, useSelector } from 'react-redux'
  import { useAccount } from 'wagmi'
import connectContract from "contracts/erc20";
import { contractSelector } from "store/reducers/contract/reducer";
  
  const Dashboard = () => {
//   const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(prev => !prev);

  const [add, setAdd] = useState('');
//   const router = useRouter();
  const dispatch = useDispatch();
  const { address, isConnecting, isDisconnected } = useAccount()
  const [anchorEl, setAnchorEl] = useState(null);
  
  
  const handleConnectCompany = async () => {
    connectContract(add, dispatch)
  };
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const openA = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    // const {name} = useSelector(contractSelector)

  return (
      <>
  
   {isConnecting && <div>Connect</div>}
   {isDisconnected && <div>Not Connect</div>}
   {address && <div>{address}</div>}
  

  
    <Button size="large" variant="outlined"
    sx={{width: '400px', m: 5, fontSize: '20px'}}
    >Create company</Button>
  
  
  <BasicModal 
            nameModal={"Company exist"}
            open={open}
            handleClickOpen={address ? handleClickOpen : handleClick}
            minW={400}
  >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  width: 400
                }}
              >
                  <CardMedia
              component='img'
              height='160'
              image="/static/images/stream.jpg"
              alt='stream picture'
            />
                <TextField
                  fullWidth
                  label="Address of your company"
                  variant="outlined"
                  onChange={(event) => setAdd(event.target.value)}
  
                />
            
                <Button
                  variant="outlined"
                  sx={{
                    width: 170,
                  }}
                  onClick={handleConnectCompany}
                >
                 Connect
                </Button>
              </Box>
            </BasicModal>
  
  
  
  
  
      <div>
       
        <Popover
          id={id}
          open={openA}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2, color: 'red', fontSize: '20px' }}>Connect your Wallet, pls</Typography>
        </Popover>
      </div>
  
  
      </>
    );
  };
  
  export default Dashboard;
  
  
  
  
  
  
  
  
  
  
   
  
  
  