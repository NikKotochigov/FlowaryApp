
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
  import BasicModal from "../../elements/modal";
  import { useState } from "react";
  // import { useDispatch, useSelector } from 'react-redux'
  import { useAccount } from 'wagmi'
  import connectContract from "contracts/erc20";
  import { redirect, useNavigate } from "react-router-dom";
  // import { useEffect } from "react";
  // import { ethers } from "ethers";
  import CompanyCreateStepper from "../../../views/main/Steps/companyCreateStepper";
  import { useDispatch } from "react-redux";
  
  const Lending = ({setApp}) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(prev => !prev);
  
    const [add, setAdd] = useState('');
    const dispatch = useDispatch();
    const { address } = useAccount()
    
    const navigate = useNavigate();
    const handleConnectCompany = async () => {
      connectContract(add, dispatch)
       setApp(true)
    };
   
    const handleCreateCompany = () => {
      console.log("hello");
      setIsCreateOpen(true);
     
    }
    const [isCreateOpen, setIsCreateOpen] = useState(false);
  


    return (
      <>
  
  
  
        <>
  
  
          <Toolbar>
            <Box sx={{ display: 'flex', gap: '8px' }}>
              <Button variant="outlined" onClick={handleCreateCompany}>
                Create company
              </Button>
        <BasicModal
          nameModal={"Company exist"}
          open={open}
          handleClickOpen={handleClickOpen}
  
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
  
            </Box>
          </Toolbar>
          {isCreateOpen && <CompanyCreateStepper />}
        </>
  
  
  
  
        <Button size="large" variant="outlined"
          sx={{ width: '400px', m: 5, fontSize: '20px' }}
        >Demo page</Button>
      </>
    );
  };
  
  export default Lending;
  
  
    
    