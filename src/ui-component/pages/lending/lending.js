
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
    import lending from '../../../assets/images/lending.jpg';

  const Lending = ({setApp}) => {

    return (
   

<Box
    style={{
    backgroundImage: `url(${lending})`,
    backgroundSize: "cover",
    height: "100vh",
    color: "#f5f5f5"
}}>
  <Typography fontSize='100px' 
  fontWeight='bold'
  color='white'
  ml = '20px' 
  // mt= '50px'

  >Bring your business into Blockchain world!</Typography>

  <Typography 
  mt ='50px'
  ml = '30px' 
  fontSize='50px' 
  fontWeight='bold'
// textAlign='right'
  color='white'>Via our protocol You can create company and stream money to your employees! The Best tool to control your finance!</Typography>
  <Box sx={{display: 'flex', justifyContent: 'center'}}>
     <Button  variant="contained"
          sx={{ width: '500px', 
          mt: 10,
          fontSize: '40px',
          fontWeight: 'bold'
         }}
          onClick={setApp}
        >Launch App</Button>
 
  </Box>
   
</Box>
  
        
    );
  };
  
  export default Lending;
  
  
    
    