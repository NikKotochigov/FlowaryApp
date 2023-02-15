import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import BasicModal from "../../ui-component/elements/modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { table } from "../../consts/table";
import React, { useEffect, useState } from "react";
import  {LocalizationProvider}  from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import Tooltip from "../../ui-component/elements/tooltip";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TableS from "../../ui-component/pages/history/table/table";

import { ethers } from "ethers";
import companyContract from "contracts/CompanyContract";
import provider from "contracts/provider";


// const rowSS = table.map(
//   ({ id, status, date, token, from, txhash, chain, time }) =>
//     createData(
//       { id },
//       { status },
//       { date },
//       { token },
//       { from },
//       { txhash },
//       { chain },
//       time
//     )
// );
// console.log(rowSS);

const History = () => {
  const theme = useTheme();
  const [valueStart, setValueStart] = useState(dayjs("2023-01-01"));
  const [valueStop, setValueStop] = useState(dayjs("2023-01-02"));
  function createData(id, status, date, token, from, txhash, chain, time) {
    return { id, status, date, token, from, txhash, chain, time };
  }

  //----------------------------------------------- MY FUNCS ----------------------------
//   const handleEvents = async()=>{
//     try {
      
// //--------  EVENT#1   StartFlow ---------------
//       let eventFilterStart = companyContract.filters.StartFlow();
//       let eventStart = await companyContract.queryFilter(eventFilterStart);

//       // console.log("Amount Events: ", eventStart.length)
//       // console.log("All Events: ", eventStart)

//       for (let i = 0; i < eventStart.length; i++) {

//         //@dev SET IN OBJ as you like

//         console.log("#1 Event name: Start Stream")

//         // TIME
//         const timeStamp = (await provider.getBlock(eventStart[0].blockNumber)).timestamp;
//         console.log("#2 Time: ", timeStamp)

//         // Employee address:
//         const addressEmployee = eventStart[i].args[0]
//         console.log("#3 Employee: ", addressEmployee)

//         // Transaction Hash:
//         const txHash = eventStart[i].transactionHash
//         console.log("#4 TX hash: ", txHash)
        
//         //@dev DO YOU NEED RATE????
//       }

// //--------  EVENT#2   FinishFlow ---------------
//     let eventFinish = await companyContract.queryFilter(companyContract.filters.FinishFlow());
//     console.log("Amount Events FINISH: ", eventFinish.length)
//     console.log("All Events: ", eventFinish)

//     for (let i = 0; i < eventStart.length; i++) {

//       console.log("🏁 #1 Event name: FINSIH Stream")

//          // TIME
//         const timeStamp = (await provider.getBlock(eventFinish[0].blockNumber)).timestamp;
//         console.log("🏁 #2 Time: ", timeStamp)

//         // Employee address:
//         const addressEmployee = eventFinish[i].args[0]
//         console.log("🏁 #3 Employee: ", addressEmployee)

//         // Employee EARNED:
//         const earnedTokens = eventFinish[i].args[1]
//         console.log("🏁 #3 Earned: ", earnedTokens.toNumber())

//         // Transaction Hash:
//         const txHash = eventFinish[i].transactionHash
//         console.log("#4 TX hash: ", txHash)
//     }
// //--------  EVENT#3   ADD_EMPLOYEE ---------------
// const eventAddEmployee = await companyContract.queryFilter(companyContract.filters.AddEmployee());
// console.log("All Events ADD EMPLOYEE: ", eventAddEmployee)


  
//     } catch (error) {
//       console.log("DEV>>>>", error)
//     }
//   }
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
console.log('all events',arrayBlock)
const arrayStreams = arrayBlock.filter(i => (i.name == 'Active' || i.name == 'Finish' || i.name == 'Finish All'))
console.log('streams',arrayStreams)

  const rows = [
   { 
      id: 11,
      status: 'hui',
      date: '111',
      token: '222',
      from: '333',
      txhash: '444',
      chain: '555',
      time: '666'
   },
    // createData(
    //   table[0].id,
    //   table[0].status,
    //   table[0].date,
    //   table[0].token,
    //   table[0].from,
    //   table[0].txhash,
    //   table[0].chain,
    //   table[0].time
    // ),
    createData(
      table[1].id,
      table[1].status,
      table[1].date,
      table[1].token,
      table[1].from,
      table[1].txhash,
      table[1].chain,
      table[1].time
    ),
    // createData(
    //   table[2].id,
    //   table[2].status,
    //   table[2].date,
    //   table[2].token,
    //   table[2].from,
    //   table[2].txhash,
    //   table[2].chain,
    //   table[2].time
    // ),
    // createData(
    //   table[3].id,
    //   table[3].status,
    //   table[3].date,
    //   table[3].token,
    //   table[3].from,
    //   table[3].txhash,
    //   table[3].chain,
    //   table[3].time
    // ),
    // createData(
    //   table[4].id,
    //   table[4].status,
    //   table[4].date,
    //   table[4].token,
    //   table[4].from,
    //   table[4].txhash,
    //   table[4].chain,
    //   table[4].time
    // ),
    // createData(
    //   table[5].id,
    //   table[5].status,
    //   table[5].date,
    //   table[5].token,
    //   table[5].from,
    //   table[5].txhash,
    //   table[5].chain,
    //   table[5].time
    // ),

  ];
console.log(rows)
  const newRows = rows.filter(i => valueStart.format('DD/MM/YYYY') < dayjs(i.date).format('DD/MM/YYYY') < valueStop.format('DD/MM/YYYY'))
  
  return (
    <>
      <Typography variant="h1" m={5} color="red">
        Activity history
      </Typography>

      <Box
        component="form"
        sx={{
          justifyContent: "space-between",
          display: {
            // xs: "block", // 100%
            sm: "block", //600px
            md: "flex", //900px
          },
          m: 2,
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "center",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Filter by address"
            variant="outlined"
            sx={{
              width: "300px",
              "& .MuiInputBase-input": {
                height: "10px",
              },
            }}
          />
          <Button onClick={handleEvents} variant="outlined" sx={{ width: "150px", mb: 5 }}>
            TEST_ETHERS
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Start from the date"
                value={valueStart}
                minDate={dayjs("2023-01-01")}
                onChange={(newValue) => {
                  setValueStart(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      width: "160px",
                      "& .MuiInputBase-input": {
                        height: "10px",
                        width: "100px",
                      },
                    }}
                  />
                )}
              />
              <DesktopDatePicker
                label="Till the date"
                value={valueStop}
                minDate={dayjs("2023-01-01")}
                onChange={(newValue) => {
                  setValueStop(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{
                      width: "160px",
                      "& .MuiInputBase-input": {
                        height: "10px",
                        width: "100px",
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
          <Button variant="outlined" sx={{ width: "150px" }}>
            Show history
          </Button>
        </Box>
      </Box>

      <TableS rows={rows} />
    </>
  );
};

export default History;
