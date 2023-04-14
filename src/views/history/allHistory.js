import { Box, Button, Pagination, TextField, Typography, useTheme } from '@mui/material';
import BasicModal from '../../ui-component/elements/modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import Tooltip from '../../ui-component/elements/tooltip';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TableS from './table';
import { useAccount } from 'wagmi';
import { TOKEN_ABI } from '../../consts/contractAbi';

import { ethers } from 'ethers';
import provider from 'contracts/provider';
import CustomSelector from 'ui-component/elements/customSelector';
import usePagination from './pagination';
import useContract from '../../contracts/prepareContract';
import Loader from '../../ui-component/elements/loader';
import { useSelector } from 'react-redux';
import { contractSelector } from 'store/reducers/contract/reducer';

const AllHistory = ({ eventsLog, arrayItem, loader }) => {
    const { contract } = useContract();
    const { address: addressWallet } = useAccount();
    // const [loader, setLoader] = useState(false);
    const { address, token, decimalsToken, arrEmployee, owner, admin } = useSelector(contractSelector);

    // const eventsLog =  chooseArray;
    const { length, currentTx, currentPage, setCurrentPage } = usePagination({ inArr: eventsLog });
    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <>
            {loader ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Loader />
                </Box>
            ) : (
                <TableS rows={currentTx} arrayItem={arrayItem} />
            )}

            <Pagination
                count={length}
                page={currentPage}
                color="primary"
                size="large"
                onChange={handleChange}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 3
                }}
            />
        </>
    );
};

export default AllHistory;
