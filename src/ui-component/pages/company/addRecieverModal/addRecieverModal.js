import { useState } from 'react';
import useContract from '../../../../contracts/prepareContract';
import { Box, Button, CardMedia, TextField, Typography } from '@mui/material';
import BasicModal from '../../../elements/modal';
import ButtonWithResult from 'ui-component/elements/buttonWithResult';
import getErrorMessage from 'utils/getErrorMessage';
import CustomPopover from 'ui-component/elements/customPopover';
import { useSelector } from 'react-redux';
import { contractSelector } from 'store/reducers/contract/reducer';
import { useDispatch } from "react-redux";
import { setAmountEmployee, setArrEmployee } from '../../../../store/reducers/contract/reducer';
import { ethers } from "ethers";
import newUser from '../../../../assets/images/newUser.png'

function AddRecieverModal() {
    const { contract, contractSigner } = useContract();
    const [adNew, setAdNew] = useState('');
    const [rate, setRate] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const { decimalsToken } = useSelector(contractSelector);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [result, setResult] = useState('');

    const handleOnClick = () => {
        setIsOpen((prev) => !prev);
    };

    const hadleNewUser = async () => {
        try {
            setSuccess(false);
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
            setSuccess(true);
            setLoading(false);
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
            <BasicModal nameModal={'Add reciever'} open={isOpen} handleClickOpen={handleOnClick}>
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

                    <ButtonWithResult handler={success ? handleOnClick : hadleNewUser} loading={loading} success={success}>
                    {success ? 'OK' : 'Add new employee'}                        
                    </ButtonWithResult>
                    <Typography variant="h4" color="red" fontSize="20px" fontWeight="bold">
                        {result}
                    </Typography>
                </Box>
            </BasicModal>
        </div>
    );
}

export default AddRecieverModal;
