
import {
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  Popover,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import BasicModal from "../../../ui-component/elements/modal";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useAccount } from 'wagmi'
import connectContract from "contracts/erc20";
// import prepareContract from "contracts/erc20";
// import contract from "contracts/erc20";
import { redirect, useNavigate } from "react-router-dom";
import { amountEmployee, contractSelector } from "store/reducers/contract/reducer";
import companyContract from "../../../contracts/CompanyContract";
import { useEffect } from "react";
import { ethers } from "ethers";
import provider from "../../../contracts/provider";
import CompanyCreateStepper from "../Steps/companyCreateStepper";


const Main = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(prev => !prev);

  const [add, setAdd] = useState('');
  const dispatch = useDispatch();
  const { address, isConnecting, isDisconnected } = useAccount()
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  const handleConnectCompany = async () => {
    connectContract(add, dispatch)
    navigate("/personal-page")
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openA = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const { contractAdd } = useSelector(contractSelector)


  const [arrayBlock, setArrayBlock] = useState([])

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreateCompany = () => {
    console.log("hello");
    setIsCreateOpen(true);
  }

  return (
    <>
      {isConnecting && <div>Connect</div>}
      {isDisconnected && <div>Not Connect</div>}
      {address && <div>{address}</div>}

      <>
        <Toolbar>
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <Button variant="outlined" onClick={handleCreateCompany}>
              Create company
            </Button>
            <Button variant="outlined">
              Choose company
            </Button>

          </Box>
        </Toolbar>
        {isCreateOpen && <CompanyCreateStepper />}
      </>



      <Button size="large" variant="outlined"
        sx={{ width: '400px', m: 5, fontSize: '20px' }}
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
      <Button size="large" variant="outlined"
        sx={{ width: '400px', m: 5, fontSize: '20px' }}
      >Demo page</Button>
    </>
  );
};

export default Main;

