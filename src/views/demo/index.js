
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
import BasicModal from "../../ui-component/elements/modal";
import { useState } from "react";
// import { useDispatch, useSelector } from 'react-redux'
import { useAccount } from 'wagmi'
import connectContract from "contracts/erc20";
import { redirect, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { ethers } from "ethers";
import CompanyCreateStepper from "../../views/main/Steps/companyCreateStepper";
import CustomPopover from "../../ui-component/elements/customPopover";
import { useDispatch } from "react-redux";

const Demo = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(prev => !prev);

  const [add, setAdd] = useState('');
  const dispatch = useDispatch();
  const { address } = useAccount()
  
  const navigate = useNavigate();
  const handleConnectCompany = async () => {
    connectContract(add, dispatch)
    navigate("/personal-page")
  };
  const handleCreateCompany = () => {
    console.log("hello");
    setIsCreateOpen(true);
  }
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const id = open ? 'simple-popover' : undefined;
  const [anchorEl, setAnchorEl] = useState(null);


  return (
    <>

    <Typography variant="h1">Fucking demo</Typography>
        {/* <Toolbar>
          <Box sx={{ display: 'flex', gap: '8px' }}>
            <Button variant="outlined" onClick={address ? handleCreateCompany : handleOpenPopover}>
              Create company
            </Button>
      <BasicModal
        nameModal={"Company exist"}
        open={open}
        handleClickOpen={address ? handleClickOpen : handleOpenPopover}

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
          onClick={handleConnectCompany}
          variant="outlined">
              Choose company
            </Button>
        </Box>
      </BasicModal>

      <CustomPopover 
text={'Connect wallet, pls'}
handleOpenPopover={handleOpenPopover} 
anchorEl={anchorEl}
id={id}
setAnchorEl={setAnchorEl}
/>

          </Box>
        </Toolbar>
        {isCreateOpen && <CompanyCreateStepper />} */}
    </>
  );
};

export default Demo;


  
  