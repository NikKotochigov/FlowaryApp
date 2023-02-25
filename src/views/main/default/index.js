
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
// import { useDispatch, useSelector } from 'react-redux'
import { useAccount } from 'wagmi'
import connectContract from "contracts/erc20";
import { redirect, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { ethers } from "ethers";
import CompanyCreateStepper from "../../../views/main/Steps/companyCreateStepper";
import CustomPopover from "../../../ui-component/elements/customPopover";
import { useDispatch } from "react-redux";
import choiceThree from '../../../assets/images/choiceThree.png'

const Main = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(prev => !prev);

  const [add, setAdd] = useState('');
  const dispatch = useDispatch();
  const { address } = useAccount()
  
  const navigate = useNavigate();
  const handleConnectCompany = async () => {
    await connectContract(add, dispatch)
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

      {isCreateOpen ? <CompanyCreateStepper />
      : <>
        <Box sx={{
    display: 'flex',
    justifyContent: 'center',
    mt: 6
  }}>
             <img src={choiceThree} alt="gif" width="445"/>

  </Box>

   <Toolbar 
   sx={{
    display: 'flex',
    justifyContent: 'center',
    mt: '50px'}}>
          <Box sx={{ display: 'flex', gap: 5 }}>
            <Button variant="contained"
            sx={{background: 'red', 
            fontSize: '30px',
          }}
            size='large'
            onClick={address ? handleCreateCompany : handleOpenPopover}>
              Create company
            </Button>
      <BasicModal
      fontSize = '30px'
        nameModal={"Company exist"}
        open={open}
        handleClickOpen={address ? handleClickOpen : handleOpenPopover}
variant='contained'
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
      </>}
      
  </>
    

 
    
  );
};

export default Main;


  
  