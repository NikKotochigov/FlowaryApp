import { Box, Button, Pagination, TextField, Typography, useTheme } from '@mui/material';
import BasicModal from '../../ui-component/elements/modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { table } from '../../consts/table';
import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import Tooltip from '../../ui-component/elements/tooltip';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TableS from '../../ui-component/pages/history/table/table';
import { useAccount } from 'wagmi';
import { TOKEN_ABI } from "../../consts/contractAbi";

import { ethers } from 'ethers';
// import companyContract from 'contracts/CompanyContract';
import provider from 'contracts/provider';
import CustomSelector from 'ui-component/elements/customSelector';
import usePagination from './pagination';
import useContract from '../../contracts/prepareContract'
import Loader from '../../ui-component/elements/loader';
import { useSelector } from 'react-redux';
import { contractSelector } from 'store/reducers/contract/reducer';
import AllHistory from './allHistory';
import Demo from 'views/demo';
import { getAllLogs } from 'utils/getAllLogs';

const History = ({areYouEmployee}) => {
    const [valueStart, setValueStart] = useState(dayjs('2023-01-01'));
    const [valueStop, setValueStop] = useState(dayjs('2023-01-02'));
    const [arrayBlock, setArrayBlock] = useState([]);
    const { contract } = useContract();
    const { address: addressWallet } = useAccount();
    const [loader, setLoader] = useState(false);
    const { address, token, decimalsToken, arrEmployee, owner, admin } = useSelector(contractSelector);
    let employeeOrNot
    if(address && addressWallet) {
        if(addressWallet === owner) employeeOrNot = undefined
        else if(addressWallet === admin) employeeOrNot = undefined
        else {employeeOrNot = arrEmployee.find((i) => i.who == addressWallet)};
    }


    // useEffect(() => {
    //     (async () => {
    //         try {
    //             setLoader(true);
    //           const decimals = (await contract.getDecimals()).toNumber()
    //           //--------  EVENT#1 (from Blockchain)   StartFlow ---------------
    //             const result = [];

    //             const numActive = (await contract.amountActiveStreams()).toNumber();

    //             if (numActive > 0) {
    //                 for (let i = 0; i < numActive; i++) {
    //                     const addressEmployee = await contract.activeStreamAddress(i);
    //                     const timeStarted = await contract.getStream(addressEmployee);

    //                     const obj = {
    //                         name: 'Active',
    //                         addr: addressEmployee,
    //                         time: timeStarted.startAt.toNumber() //startedAt
    //                     };

    //                     result.push(obj);
    //                 }
    //             }
    //             // console.log("RESSSS: ", result)

    //             //--------  EVENT#2   StreamFinished ---------------
    //             const eventFinish = await contract.queryFilter(contract.filters.StreamFinished());

    //             for (let i = 0; i < eventFinish.length; i++) {
    //                 const addressEmployee = eventFinish[i].args[0];

    //                 const startTime = eventFinish[i].args[3].toNumber();

    //                 const finishTime = eventFinish[i].args[2].toNumber();
    //                 let arrDecimals=[1]
    //                 for (let i=0; i < decimals; i++){
    //                   const zero = '0'
    //                   arrDecimals.push(zero)
    //                 }
    //               const decimal = +arrDecimals.join('')
    //                 const earnedTokens = ((eventFinish[i].args[1])/decimal).toString();
                  
    //                 console.log('18 nulei', decimal)
    //                 const txHash = eventFinish[i].transactionHash;

    //                 const obj = {
    //                     name: 'Finished',
    //                     addr: addressEmployee,
    //                     startAt: startTime,
    //                     time: finishTime, //endeddAt
    //                     earned: earnedTokens,
    //                     txHash: txHash
    //                 };

    //                 result.push(obj);
    //             }
    //             // console.log("RESSSS 2:", result)

    //             //--------  EVENT#3   StreamAllFinished ---------------
    //             // const eventAllFinish = await contract.queryFilter(contract.filters.StreamAllFinished());

    //             // for (let i = 0; i < eventAllFinish.length; i++) {
    //             //     const amountEmployee = eventAllFinish[i].args[0].toNumber();
    //             //     const endsAt = eventAllFinish[i].args[1].toNumber();
    //             //     const txHash = eventAllFinish[i].transactionHash;

    //             //     const obj = {
    //             //         name: 'Finish All',
    //             //         time: endsAt,
    //             //         amountEmployee: amountEmployee,
    //             //         txHash: txHash
    //             //     };

    //             //     result.push(obj);
    //             // }

    //             // console.log("RESSSS 3:", result)

    //             //--------  EVENT#4   Deposit -------------
    //             const contractStableCoin = new ethers.Contract(token, TOKEN_ABI, provider);
    //             const filterTo = contractStableCoin.filters.Transfer(null, contract.address);

    //             const transerEvents = await contractStableCoin.queryFilter(filterTo);

    //             for (let i = 0; i < transerEvents.length; i++) {
    //                 const amountDeposit = transerEvents[i].args[2].toString();
    //                 const txHash = transerEvents[i].transactionHash;

    //                 const blockNumber = transerEvents[i].blockNumber;
    //                 const blockTimestamp = (await provider.getBlock(blockNumber)).timestamp;

    //                 const obj = {
    //                     name: 'Deposit',
    //                     time: blockTimestamp,
    //                     amount: ethers.utils.formatUnits(amountDeposit, decimalsToken),
    //                     // amount: Number(ethers.utils.formatUnits(Number(amountDeposit), decimalsToken)).toFixed(2)
    //                     txHash: txHash
    //                 };

    //                 result.push(obj);
    //             }

    //             //--------  EVENT#5   Withdraw -------------

    //             const filterFrom = contractStableCoin.filters.Transfer(contract.address, await contract.owner());

    //             const withdrawEvents = await contractStableCoin.queryFilter(filterFrom);

    //             for (let i = 0; i < withdrawEvents.length; i++) {
    //                 const amountDeposit = withdrawEvents[i].args[2].toString();
    //                 const txHash = withdrawEvents[i].transactionHash;

    //                 const blockNumber = withdrawEvents[i].blockNumber;
    //                 const blockTimestamp = (await provider.getBlock(blockNumber)).timestamp;

    //                 const obj = {
    //                     name: 'Withdraw',
    //                     time: blockTimestamp,
    //                     amount: ethers.utils.formatUnits(amountDeposit, decimalsToken),
    //                     txHash: txHash
    //                 };

    //                 result.push(obj);
    //             }

    //             // SORT BY TIME!!!!

    //             // //--------  EVENT#3   ADD_EMPLOYEE ---------------
    //             // const eventAddEmployee = await companyContract.queryFilter(companyContract.filters.AddEmployee());
    //             // console.log("All Events ADD EMPLOYEE: ", eventAddEmployee)
    //             setArrayBlock(result);
    //             setLoader(false);

    //         } catch (error) {
    //             console.log('DEV>>>>', error);
    //         }
    //     })();
    // }, [employeeOrNot]);

    useEffect(() =>{
        getAllLogs(contract, setLoader, token, TOKEN_ABI, provider, setArrayBlock, decimalsToken)
    },[employeeOrNot])
//=======arrays for company-page======//
    console.log('all events', arrayBlock);
    const arrayStreams = arrayBlock.filter((i) => i.name == 'Active' || i.name == 'Finished');
    console.log('streams', arrayStreams);
    const arrayPayloads = arrayBlock.filter((i) => i.name == 'Deposit' || i.name == 'Withdraw');
    console.log('payloads', arrayPayloads);
//=====array for employee page===//
    const arraySingleEmployy = arrayStreams.filter((i) => i.addr == addressWallet);
 //======data for selector=====//
    const [arrayItem, setArrayItem] = useState(`1`);
    // const handleChangeArray = (event) => {
    //   setArrayItem(event.target.value);
    // };
    const chooseArray = arrayItem == 1 ? arrayStreams : arrayPayloads
    //======data for pagination======//
    // const eventsLog =  chooseArray;

    const eventsLog = employeeOrNot ? arraySingleEmployy : chooseArray;
    const { length, currentTx, currentPage, setCurrentPage } = usePagination({ inArr: eventsLog });
    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    //========prerpare array for dashboard=======//
    const arrayFinishedStreams = arrayBlock.filter((i) => i.name == 'Finished');

const arrayOfErningsForDashboard = []
for(let i=0; i < arrayFinishedStreams.length; i++){
    const dateNew = dayjs.unix(arrayFinishedStreams[i].time).format('DD/MM/YYYY')
    const earn = Number(arrayFinishedStreams[i].earned)
  const obj = {
    date: dateNew,
    earn: earn,
};  
arrayOfErningsForDashboard.push(obj)
}

const resultObject = {};
for (let item of arrayOfErningsForDashboard) {
  const resultValue = resultObject[item.date];
  if (resultValue) {
    // у нас такой уже есть, плюсуем
    resultValue.earn += item.earn;
  } else {
    // такого еще нету - создаем новый
    resultObject[item.date] = { ...item };
  }
}
const ArraySortedByDateForChart = Object.values(resultObject);
const EarnArraySortedByDateForChart = ArraySortedByDateForChart.map(i => Number(i.earn.toFixed(2)))
console.log('Massiv DashBOARD :', arrayOfErningsForDashboard)
console.log('DashBOARD :', ArraySortedByDateForChart)
console.log('OBOROT :', EarnArraySortedByDateForChart)

//=========we've prepared array for chart in Dashboard======//

    return (

<>
    {!areYouEmployee && <><Typography variant="h1" m={3} color="red">
        Activity history
    </Typography>

<Box
    component="form"
    sx={{
        justifyContent: 'space-between',
        display: {
            // xs: "block", // 100%
            sm: 'block', //600px
            md: 'flex' //900px
        },
        m: 2
    }}
    noValidate
    autoComplete="off"
>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                mb: 2,
                alignItems: 'center'
            }}
        >
          {!employeeOrNot &&
<CustomSelector 
            setArrayItem={setArrayItem}
            arrayItem={arrayItem}
            />
          }
            
        </Box>
    
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            alignItems: 'center'
        }}
    >
        <Box
            sx={{
                display: 'flex',
                gap: 1
            }}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                    label="Start from the date"
                    value={valueStart}
                    minDate={dayjs('2023-01-01')}
                    onChange={(newValue) => {
                        setValueStart(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            sx={{
                                width: '160px',
                                '& .MuiInputBase-input': {
                                    height: '10px',
                                    width: '100px'
                                }
                            }}
                        />
                    )}
                />
                <DesktopDatePicker
                    label="Till the date"
                    value={valueStop}
                    minDate={dayjs('2023-01-01')}
                    onChange={(newValue) => {
                        setValueStop(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            sx={{
                                width: '160px',
                                '& .MuiInputBase-input': {
                                    height: '10px',
                                    width: '100px'
                                }
                            }}
                        />
                    )}
                />
            </LocalizationProvider>
        </Box>
        <Button variant="outlined" sx={{ width: '150px' }}>
            Show history
        </Button>
    </Box>
</Box></>}

{address && addressWallet ?

<AllHistory 
arrayItem={arrayItem}
eventsLog={eventsLog}
loader={loader}
/>
: <Demo />}

</>
    );
};

export default History;
