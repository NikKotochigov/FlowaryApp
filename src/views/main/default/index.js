

// ==============================|| DEFAULT DASHBOARD ||============================== //

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
  import BasicModal from "../../../ui-component/elements/modal";
  import { useState } from "react";
  import { useDispatch, useSelector } from 'react-redux'
  import { useAccount } from 'wagmi'
  import connectContract from "contracts/erc20";
  // import prepareContract from "contracts/erc20";
  // import contract from "contracts/erc20";

  import { amountEmployee, contractSelector } from "store/reducers/contract/reducer";
  import companyContract from "../../../contracts/CompanyContract";
import { useEffect } from "react";
import { ethers } from "ethers";
import provider from "../../../contracts/provider";


  const Main = () => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(prev => !prev);
  
    const [add, setAdd] = useState('');
    const dispatch = useDispatch();
    const { address, isConnecting, isDisconnected } = useAccount()
    const [anchorEl, setAnchorEl] = useState(null);

  
    const handleConnectCompany = async () => {
      connectContract(add,dispatch)
 };
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const openA = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
   const {contractAdd} = useSelector(contractSelector)


const [arrayBlock , setArrayBlock] = useState([])

const handleEvents = async()=>{
  try {
//--------  EVENT#1 (from Blockchain)   StartFlow ---------------
const result = []

    const numActive = (await companyContract.amountActiveStreams()).toNumber()

    if(numActive>0){
      for (let i = 0; i < numActive; i++) {
        const addressEmployee = await companyContract.activeStreamAddress(i);
        const timeStarted = await companyContract.getStream(addressEmployee); 

        const obj = {
          name: "Active",
          addr: addressEmployee,
          time: timeStarted.startAt.toNumber() //startedAt
        }

        result.push(obj)
      }
    }
    // console.log("RESSSS: ", result)


//--------  EVENT#2   StreamFinished ---------------
  const eventFinish = await companyContract.queryFilter(companyContract.filters.StreamFinished()); 

  for (let i = 0; i < eventFinish.length; i++) {

      const addressEmployee = eventFinish[i].args[0]

      const startTime = eventFinish[i].args[3].toNumber()

      const finishTime = eventFinish[i].args[2].toNumber()

      const earnedTokens = eventFinish[i].args[1].toNumber()

      const txHash = eventFinish[i].transactionHash

      const obj = {
        name: "Finish",
        addr: addressEmployee,
        startAt: startTime,
        time: finishTime,  //endeddAt
        earned: earnedTokens,
        txHash: txHash, 
      }

      result.push(obj)
  }
  // console.log("RESSSS 2:", result)

//--------  EVENT#3   StreamAllFinished ---------------
  const eventAllFinish = await companyContract.queryFilter(companyContract.filters.StreamAllFinished()); 

  for (let i = 0; i < eventAllFinish.length; i++) {

    const amountEmployee = eventAllFinish[i].args[0].toNumber()
    const endsAt = eventAllFinish[i].args[1].toNumber()
    const txHash = eventAllFinish[i].transactionHash

    const obj = {
      name: "Finish All",
      time: endsAt,
      amountEmployee: amountEmployee,
      txHash: txHash, 
    }

    result.push(obj)
  }

  // console.log("RESSSS 3:", result)

 //--------  EVENT#4   Deposit -------------

 const tokenAddr = await companyContract.token()

 const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]

 const contractStableCoin = new ethers.Contract(tokenAddr, abi, provider)

 const filterTo = contractStableCoin.filters.Transfer(null, companyContract.address);

 const transerEvents = await contractStableCoin.queryFilter(filterTo) 

 for (let i = 0; i < transerEvents.length; i++) {

   const amountDeposit = transerEvents[i].args[2].toString()
    const txHash = transerEvents[i].transactionHash

   const blockNumber = transerEvents[i].blockNumber
   const blockTimestamp = (await provider.getBlock(blockNumber)).timestamp

   const obj = {
     name: "Deposit",
     time: blockTimestamp,
     amount: amountDeposit,
     txHash: txHash, 
   }

   result.push(obj)
 }

     //--------  EVENT#5   Withdraw -------------

     const filterFrom = contractStableCoin.filters.Transfer(companyContract.address, (await companyContract.owner()));

     const withdrawEvents = await contractStableCoin.queryFilter(filterFrom) 

     for (let i = 0; i < withdrawEvents.length; i++) {

       const amountDeposit = withdrawEvents[i].args[2].toString()
        const txHash = withdrawEvents[i].transactionHash
 
       const blockNumber = withdrawEvents[i].blockNumber
       const blockTimestamp = (await provider.getBlock(blockNumber)).timestamp
 
       const obj = {
         name: "Withdraw",
         time: blockTimestamp,
         amount: amountDeposit,
         txHash: txHash, 
       }
 
       result.push(obj)
     }

// SORT BY TIME!!!!

// //--------  EVENT#3   ADD_EMPLOYEE ---------------
// const eventAddEmployee = await companyContract.queryFilter(companyContract.filters.AddEmployee());
// console.log("All Events ADD EMPLOYEE: ", eventAddEmployee)
setArrayBlock(result)

  } catch (error) {
    console.log("DEV>>>>", error)
  }
}
console.log(arrayBlock)
const arrayStreams = arrayBlock.filter(i => (i.name == 'Active' || i.name == 'Finish' || i.name == 'Finish All'))
console.log('streams: ', arrayStreams)
    return (
      <>
  <Button onClick={handleEvents} variant="outlined" size='large'>Events</Button>
        {isConnecting && <div>Connect</div>}
        {isDisconnected && <div>Not Connect</div>}
        {address && <div>{address}</div>}

      <Typography>{arrayBlock.length != 0 && arrayBlock[0].name}</Typography>

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
      </>
    );
  };
  
  export default Main;
  
  
  
  
  
  
  
  
  
  
  
  
  
  