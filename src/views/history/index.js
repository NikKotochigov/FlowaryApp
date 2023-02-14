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
  const handleEvents = async()=>{
    try {
      
//--------  EVENT#1   StartFlow ---------------
      let eventFilterStart = companyContract.filters.StartFlow();
      let eventStart = await companyContract.queryFilter(eventFilterStart);

      // console.log("Amount Events: ", eventStart.length)
      // console.log("All Events: ", eventStart)

      for (let i = 0; i < eventStart.length; i++) {

        //@dev SET IN OBJ as you like

        console.log("#1 Event name: Start Stream")

        // TIME
        const timeStamp = (await provider.getBlock(eventStart[0].blockNumber)).timestamp;
        console.log("#2 Time: ", timeStamp)

        // Employee address:
        const addressEmployee = eventStart[i].args[0]
        console.log("#3 Employee: ", addressEmployee)

        // Transaction Hash:
        const txHash = eventStart[i].transactionHash
        console.log("#4 TX hash: ", txHash)
        
        //@dev DO YOU NEED RATE????
      }

//--------  EVENT#2   FinishFlow ---------------
    let eventFinish = await companyContract.queryFilter(companyContract.filters.FinishFlow());
    console.log("Amount Events FINISH: ", eventFinish.length)
    console.log("All Events: ", eventFinish)

    for (let i = 0; i < eventStart.length; i++) {

      console.log("🏁 #1 Event name: FINSIH Stream")

         // TIME
        const timeStamp = (await provider.getBlock(eventFinish[0].blockNumber)).timestamp;
        console.log("🏁 #2 Time: ", timeStamp)

        // Employee address:
        const addressEmployee = eventFinish[i].args[0]
        console.log("🏁 #3 Employee: ", addressEmployee)

        // Employee EARNED:
        const earnedTokens = eventFinish[i].args[1]
        console.log("🏁 #3 Earned: ", earnedTokens.toNumber())

        // Transaction Hash:
        const txHash = eventFinish[i].transactionHash
        console.log("#4 TX hash: ", txHash)
    }
//--------  EVENT#3   ADD_EMPLOYEE ---------------
const eventAddEmployee = await companyContract.queryFilter(companyContract.filters.AddEmployee());
console.log("All Events ADD EMPLOYEE: ", eventAddEmployee)


  
    } catch (error) {
      console.log("DEV>>>>", error)
    }
  }

  const rows = [
    createData(
      table[0].id,
      table[0].status,
      table[0].date,
      table[0].token,
      table[0].from,
      table[0].txhash,
      table[0].chain,
      table[0].time
    ),
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
    createData(
      table[2].id,
      table[2].status,
      table[2].date,
      table[2].token,
      table[2].from,
      table[2].txhash,
      table[2].chain,
      table[2].time
    ),
    createData(
      table[3].id,
      table[3].status,
      table[3].date,
      table[3].token,
      table[3].from,
      table[3].txhash,
      table[3].chain,
      table[3].time
    ),
    createData(
      table[4].id,
      table[4].status,
      table[4].date,
      table[4].token,
      table[4].from,
      table[4].txhash,
      table[4].chain,
      table[4].time
    ),
    createData(
      table[5].id,
      table[5].status,
      table[5].date,
      table[5].token,
      table[5].from,
      table[5].txhash,
      table[5].chain,
      table[5].time
    ),

  ];

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
