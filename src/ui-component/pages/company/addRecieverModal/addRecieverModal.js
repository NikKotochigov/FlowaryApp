import { useState } from 'react';
import useContract from '../../../../contracts/prepareContract';
import { Box, Button, CardMedia, TextField, Typography } from '@mui/material';
import BasicModal from '../../../elements/modal';
import getErrorMessage from 'utils/getErrorMessage';
import CustomPopover from 'ui-component/elements/customPopover';
import { useSelector } from 'react-redux';
import { contractSelector } from 'store/reducers/contract/reducer';
import { useDispatch } from "react-redux";
import { setAmountEmployee, setArrEmployee } from '../../../../store/reducers/contract/reducer';
import { ethers } from "ethers";
import newUser from '../../../../assets/images/newUser.png'
import { LoadingButton } from '@mui/lab';
import useErrorOwner from 'ui-component/elements/useErrorOwner';
import HelperToolkit from 'ui-component/elements/helperTooltip';

function AddRecieverModal() {
    const { contract, contractSigner } = useContract();
    const [adNew, setAdNew] = useState('');
    const [rate, setRate] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const { decimalsToken } = useSelector(contractSelector);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');

    const { errorOwner } = useErrorOwner();

    const handleOnClick = () => {
        setIsOpen((prev) => !prev);
    };

    const hadleNewUser = async () => {
        try {
            setLoading(true);
            const addUser = await contractSigner.addEmployee(adNew, BigInt(Math.ceil((rate/60/60)*(10**decimalsToken))));
            const res = await addUser.wait();
            console.log(res);
//========refresh array of employeees========//
       const amountEmployee = (await contract.amountEmployee()).toNumber();
       dispatch(setAmountEmployee(amountEmployee));
       let employeeArr = [];
for (let i = 0; i < amountEmployee; i++) {
    const addrEmpl = await contract.allEmployeeList(i);
    const result = await contract.allEmployee(addrEmpl);
    const employee = {who: result.who, rate: (Number(ethers.utils.formatUnits(result.flowRate, decimalsToken))*60*60).toFixed(2)}
    employeeArr.push(employee);
}
dispatch(setArrEmployee(employeeArr));
//==========end of refresh========//
            setLoading(false);
            setAdNew('');
            setRate(0);
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



    const handleAddressChange = (e) => {
        setAdNew(e.target.value);
    };

    const handleRateChange = (e) => {
        setRate(e.target.value);
    };

    return (
        <div>
            <BasicModal 
            nameModal={'Add new employee'} 
            open={isOpen} 
            handleClickOpen={handleOnClick}
            title='Click here & add new employee in your Company. You have to know wallet address of reciever & how much you will pay:)'
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
                    <TextField value={adNew} fullWidth label="Address of new reciever" variant="outlined" onChange={handleAddressChange} />
                    <TextField
                        value={rate}
                        fullWidth
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        label="Rate per hour"
                        variant="outlined"
                        onChange={handleRateChange}
                    />

<Box>
                        <LoadingButton
                                size="large"
                                disabled={errorOwner}
                                onClick={hadleNewUser}
                                loading={loading}
                                loadingIndicator="Loading..."
                                variant="outlined"
                            >
                             Add new employee
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

export default AddRecieverModal;
