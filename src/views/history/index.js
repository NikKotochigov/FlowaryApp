import { Box, Button, Pagination, TextField, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useAccount } from 'wagmi';
import CustomSelector from 'ui-component/elements/customSelector';
import useContract from '../../contracts/prepareContract';
import { useSelector } from 'react-redux';
import { contractSelector } from 'store/reducers/contract/reducer';
import AllHistory from './allHistory';
import Demo from 'views/settings';
import { getAllLogs } from 'utils/getAllLogs';
import Main from 'views/main/default';
import WalletPointer from 'ui-component/elements/walletPointer';
import Sorry from 'ui-component/elements/sorry';

const History = ({ areYouEmployee }) => {
    const [valueStart, setValueStart] = useState(dayjs('2023-01-01'));
    const [valueStop, setValueStop] = useState(dayjs());
    const [arrayBlock, setArrayBlock] = useState([]);
    const { contract } = useContract();
    const { address: addressWallet } = useAccount();
    const [loader, setLoader] = useState(false);
    const { address, token, decimalsToken, arrEmployee, owner, admin } = useSelector(contractSelector);
    let employeeOrNot;
    if (address && addressWallet) {
        if (addressWallet === owner) employeeOrNot = undefined;
        else if (addressWallet === admin) employeeOrNot = undefined;
        else {
            employeeOrNot = arrEmployee.find((i) => i.who == addressWallet);
        }
    }

    useEffect(() => {
        getAllLogs(contract, setLoader, token, setArrayBlock, decimalsToken);
    }, [employeeOrNot]);
    console.log('MASSIV', arrayBlock)

    //=======arrays for company-page======//
    // console.log('all events', arrayBlock);
    const arrayStreams = arrayBlock.filter((i) => i.name == 'Active' || i.name == 'Finished');
    // console.log('streams', arrayStreams);
    const arrayPayloads = arrayBlock.filter((i) => i.name == 'Deposit' || i.name == 'Withdraw');
    // console.log('payloads', arrayPayloads);
    //=====array for employee page===//
    const arraySingleEmployy = arrayStreams.filter((i) => i.addr == addressWallet);
    //======data for selector=====//
    const [arrayItem, setArrayItem] = useState(`1`);
    const chooseArray = arrayItem == 1 ? arrayStreams : arrayPayloads;
    //======data for pagination======//
    const eventsLog = employeeOrNot 
    ? arraySingleEmployy.filter((i) => i.time >= dayjs(valueStart).unix() && i.time <= dayjs(valueStop).unix())
    : chooseArray.filter((i) => i.time >= dayjs(valueStart).unix() && i.time <= dayjs(valueStop).unix());

    return (
        <>
            {!areYouEmployee && (
                <>
                    <Typography variant="h1" m={3} color="primary" textAlign="center">
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
                            {!employeeOrNot && <CustomSelector setArrayItem={setArrayItem} arrayItem={arrayItem} />}
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
                        </Box>
                    </Box>
                </>
            )}

{/* {addressWallet ? (
                addressWallet == owner || addressWallet == admin || employeeOrNot ? (
                    <AllHistory arrayItem={arrayItem} eventsLog={eventsLog} loader={loader} /> 
                ) : areYouEmployee ? (
                    <AllHistory arrayItem={arrayItem} eventsLog={eventsLog} loader={loader} /> 
                ) : (<Sorry />)
            ) : (<WalletPointer />)} */}

{addressWallet ?
(addressWallet == owner || addressWallet == admin || employeeOrNot 
? <AllHistory arrayItem={arrayItem} eventsLog={eventsLog} loader={loader} /> 
: <Sorry />)
: <WalletPointer /> 
}

        </>
    );
};

export default History;
