import { useState } from 'react';
import { useSelector } from 'react-redux';
import { contractSelector } from '../../../../store/reducers/contract/reducer';
import { Box, Button, CardMedia, TextField, Typography } from '@mui/material';
import CustomModal from '../../../elements/customModal';
import useContract from '../../../../contracts/prepareContract';
import getErrorMessage from 'utils/getErrorMessage';
import { useDispatch } from "react-redux";
import { setAmountEmployee, setArrEmployee } from '../../../../store/reducers/contract/reducer';
import { ethers } from "ethers";
import settings from '../../../../assets/images/settings.png'
import Toolkit from 'ui-component/elements/tooltip';
import { LoadingButton } from '@mui/lab';
import useErrorOwner from 'ui-component/elements/useErrorOwner';
import HelperToolkit from 'ui-component/elements/helperTooltip';


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
    const [loadingDel, setLoadingDel] = useState(false);

    const [result, setResult] = useState('');
    const [resultDel, setResultDel] = useState('');
    const { errorOwner } = useErrorOwner();

    const handleRateChange = async () => {
        try {
            setLoading(true);
            const changeRate = await contractSigner.modifyRate(who, BigInt(Math.ceil((rate/60/60)*(10**decimalsToken))));
            await changeRate.wait();
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
            handleOnClick();
        } catch (error) {
            console.log(error);
            const message = getErrorMessage(error);
            setResult(message);
            setTimeout(() => {
                setResult('');
                handleOnClick();
                         setLoading(false);
            }, 2000);
        }
    };

    const handleDelete = async () => {
        try {
            setLoadingDel(true);
            const deleteUser = await contractSigner.deleteEmployee(who);
            await deleteUser.wait();
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
            setLoadingDel(false);
            handleOnClick();

        } catch (error) {
            if (error.code == 3) 
                setLoadingDel(false);
            setResultDel('You can delete employee while he has active stream');
            if (error.code === 'ACTION_REJECTED') 
            setResultDel("Transaction was Rejected ❌");
            setTimeout(() => {
                setResultDel('');
                setLoadingDel(false);
              handleOnClick();  
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

                        <LoadingButton
                                size="medium"
                                disabled={errorOwner}
                                onClick={handleRateChange}
                                loading={loading}
                                loadingIndicator="Loading..."
                                variant="outlined"
                                sx={{m:1}}
                            >
                             Change rate
                            </LoadingButton>
                            {errorOwner && <HelperToolkit title='This action allowed only for Owner or Admin of the Company' />}


                    </Box>
                    <Typography variant="h4" color="red" fontSize="20px" fontWeight="bold">
                        {result}
                    </Typography>
                   

<Box>
                        <LoadingButton
                                size="medium"
                                disabled={errorOwner}
                                onClick={handleDelete}
                                loading={loadingDel}
                                loadingIndicator="Loading..."
                                variant="outlined"
                                alignItems="center"
                            >
                             Delete reciever
                            </LoadingButton>
                            {errorOwner && <HelperToolkit title='This action allowed only for Owner or Admin of the Company' />}

</Box>

                    <Typography variant="h4" color="red" fontSize="20px" fontWeight="bold" textAlign={'center'}>
                        {resultDel}
                    </Typography>
                </Box>
            </CustomModal>
        </div>
    );
}

export default ChangeRecieverModal;
