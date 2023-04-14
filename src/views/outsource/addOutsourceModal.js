import { useState } from 'react';
import useContract from '../../contracts/prepareContract';
import { Box, Button, CardMedia, TextField, Typography } from '@mui/material';
import BasicModal from '../../ui-component/elements/modal';
import getErrorMessage from '../../utils/getErrorMessage';
import { useDispatch, useSelector } from "react-redux";
import { contractSelector, setArrOutsource, setBalance } from '../../store/reducers/contract/reducer';
import newUser from '../../assets/images/newUser.png'
import dayjs from 'dayjs';
import { ethers } from "ethers";
import useErrorOwner from 'ui-component/elements/useErrorOwner';
import { LoadingButton } from '@mui/lab';
import HelperToolkit from 'ui-component/elements/helperTooltip';

function AddOutsourceModal() {
    const { contract, contractSigner } = useContract();
    const { decimalsToken } = useSelector(contractSelector);

    const [adNew, setAdNew] = useState('');
    const [wage, setWage] = useState(0);
    const [taskName, setTaskName] = useState('')
    const [deadLine, setDeadLine] = useState(0)

    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');

    const { errorOwner } = useErrorOwner();

    const handleOnClick = () => {
        setIsOpen((prev) => !prev);
    };

    const hadleNewOutsource = async () => {
        try {
            setLoading(true);
            const addOutsource = await contractSigner.createOutsourceJob(adNew, taskName, BigInt(wage*(10**decimalsToken)), (deadLine*3600), 30);
            const res = await addOutsource.wait();
            console.log(res);
//========refresh array of outsource========//

const amountOutsources = (await contract.OutsourceID()).toNumber();
let outsourcesArr = [];
for (let i = 0; i < amountOutsources; i++) {
    const result = await contract.listOutsource(i);
    const outsourceJob = {taskName: result.task, 
      who: result.who,
      startDate: Number(result.startAt),
      deadline: Number(result.deadline),
      wage: Number(ethers.utils.formatUnits(result.wage, decimalsToken)).toFixed(2),
      status: Number(result.status),
      id: i
    }
    outsourcesArr.push(outsourceJob);
}
dispatch(setArrOutsource(outsourcesArr));
//==========end of refresh========//
const bal = await contract.currentBalanceContract();
const balan = Number(ethers.utils.formatUnits(bal, decimalsToken)).toFixed(2)
dispatch(setBalance(balan));
            setLoading(false);
            handleOnClick();
        } catch (error) {
            console.log(error);
            const message = getErrorMessage(error);
            setLoading(false);
            setResult(message);
            setTimeout(() => {
                setResult('');
            }, 2000);
        }
    };

    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAdNew(e.target.value);
    };

    const handleWageChange = (e) => {
        setWage(e.target.value);
    };
    const handleDeadLineChange = (e) => {
        setDeadLine(e.target.value);
    };

    return (
        <div>
            <BasicModal 
            nameModal={'Add new outsource project'} 
            open={isOpen} 
            handleClickOpen={handleOnClick}
            title='Click here & add new outsource job. You have to know wallet address of reciever, how much you will pay & how many time you will give for task (in hours)'
            placement={'top'}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        width: 400
                    }}
                >
                                      <img src={newUser} alt="gif" width="145" />
                    <TextField value={adNew} fullWidth label="Address of outsourcer" variant="outlined" onChange={handleAddressChange} />
                    <TextField value={taskName} fullWidth label="Task name" variant="outlined" onChange={handleTaskNameChange} />

                    <TextField
                        value={wage}
                        fullWidth
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        label="Wage for job"
                        variant="outlined"
                        onChange={handleWageChange}
                    />
                           <TextField
                        value={deadLine}
                        fullWidth
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        label="Time for job (hours)"
                        variant="outlined"
                        onChange={handleDeadLineChange}
                    />
                    <Box>
                                 <LoadingButton
                                size="large"
                                disabled={errorOwner}
                                onClick={hadleNewOutsource}
                                loading={loading}
                                loadingIndicator="Loading..."
                                variant="outlined"
                            >
                             Start new outsource project
                            </LoadingButton>
                            {errorOwner && <HelperToolkit title='This action allowed only for Owner or Admin of the Company' />}
           
                    </Box>

                    <Typography variant="h4" color="red" fontSize="20px" fontWeight="bold">
                        {result}
                    </Typography>
                </Box>
            </BasicModal>
        </div>
    );
}

export default AddOutsourceModal;
