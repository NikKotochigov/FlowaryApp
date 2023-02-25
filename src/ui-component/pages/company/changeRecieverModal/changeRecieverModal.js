import { useState } from 'react';
import { useSelector } from 'react-redux';
import { contractSelector } from '../../../../store/reducers/contract/reducer';
import { Box, Button, CardMedia, TextField, Typography } from '@mui/material';
import CustomModal from '../../../elements/customModal';
import useContract from '../../../../contracts/prepareContract';
import ButtonWithResult from 'ui-component/elements/buttonWithResult';
import getErrorMessage from 'utils/getErrorMessage';
import { useDispatch } from "react-redux";
import { setAmountEmployee, setArrEmployee } from '../../../../store/reducers/contract/reducer';
import { ethers } from "ethers";
import settings from '../../../../assets/images/settings.png'


function ChangeRecieverModal({ who }) {
    const [rate, setRate] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const { contract, contractSigner } = useContract();
    const { decimalsToken } = useSelector(contractSelector);
    const dispatch = useDispatch();
    const handleOnClick = () => {
        setIsOpen((prev) => !prev);
    };

    const handleRateChangeInput = (e) => {
           setRate(e.target.value)
console.log(e.target.value)
        };

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loadingDel, setLoadingDel] = useState(false);
    const [successDel, setSuccessDel] = useState(false);

    const [result, setResult] = useState('');
    const [resultDel, setResultDel] = useState('');

    const handleRateChange = async () => {
        try {
            setSuccess(false);
            setLoading(true);
            const changeRate = await contractSigner.modifyRate(who, BigInt(Math.ceil((rate/60/60)*(10**decimalsToken))));
            const res = await changeRate.wait();
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

    const handleDelete = async () => {
        try {
            setSuccessDel(false);
            setLoadingDel(true);
            const deleteUser = await contractSigner.deleteEmployee(who);
            const res = await deleteUser.wait();
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
            setSuccessDel(true);
            setLoadingDel(false);
        } catch (error) {
            console.log('ETO OSHIBKA :', error.message);
            if (error.code == 3) 
                setLoadingDel(false);
            setResultDel('You can delete employee while he has active stream');
            if (error.code === 'ACTION_REJECTED') 
            setLoadingDel(false);
            setResultDel("Transaction was Rejected ❌");
            setTimeout(() => {
                setResultDel('');
            }, 2000);

        }
    };
 
    return (
        <div>
            <CustomModal handleClickOpen={handleOnClick} open={isOpen}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        width: 400
                    }}
                >
                    {/* <CardMedia component="img" height="160" image="/static/images/stream.jpg" alt="stream picture" /> */}
                    <img src={settings} alt="gif" width="195" />

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <TextField
                            value={rate}
                            InputProps={{ inputProps: { min: 0 } }}
                            type="number"
                            label="Enter new rate per hour"
                            variant="outlined"
                            onChange={handleRateChangeInput}
                        />
                        {/* <Button
                            variant="outlined"
                            // sx={{ width: 170, }}
                            onClick={handleRateChange}
                        >
                            Set new rate
                        </Button> */}
                        <ButtonWithResult handler={success ? handleOnClick : handleRateChange} loading={loading} success={success}>
                            {success ? 'OK' : 'Change rate'}
                        </ButtonWithResult>
                    </Box>
                    <Typography variant="h4" color="red" fontSize="20px" fontWeight="bold">
                        {result}
                    </Typography>
                    <ButtonWithResult
                        handler={successDel ? handleOnClick : handleDelete}
                        loading={loadingDel}
                        success={successDel}
                        alignItems="center"
                    >
                        {successDel ? 'OK' : 'Delete reciever'}
                    </ButtonWithResult>
                    <Typography variant="h4" color="red" fontSize="20px" fontWeight="bold" textAlign={'center'}>
                        {resultDel}
                    </Typography>
                </Box>
            </CustomModal>
        </div>
    );
}

export default ChangeRecieverModal;
