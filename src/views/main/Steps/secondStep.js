import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { setContractToken } from "utils/contractMethods";
import { contractSelector } from "store/reducers/contract/reducer";
import {  setToken } from 'store/reducers/contract/reducer';
import useContract from "contracts/prepareContract";

function SecondStep({ setActiveStep }) {
    const [tokenAddress, setTokenAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
 //   const { address } = useSelector(contractSelector);
const { contractSigner } = useContract()
    const handleTokenChange = (e) => {
        setTokenAddress(e.target.value);
    }

    const handleSetTokenNew = async() => {
try {
    setLoading(true);
    const tx = await contractSigner.setToken(tokenAddress)
await tx.wait()
console.log('ok')
setLoading(false);
dispatch(setToken(tokenAddress));
setActiveStep(prev => prev + 1);
} catch (error) {
    setLoading(false);
    console.log(error)
}
    }

    // const handleSetToken = async() => {
    //     await setContractToken(tokenAddress, address, dispatch, setLoading, setActiveStep);
    // }
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mt: 3,
                    alignItems:'center',
                    width: '100%'
                }}
            >
                <TextField
                    value={tokenAddress}
                    type='text'
                    label='Token address'
                    size='small'
                    onChange={handleTokenChange}
                    sx={{ width: 370 }}
                    />
                <LoadingButton
                    loading={loading}
                    loadingIndicator="Setting..."
                    variant="outlined"
                    sx={{ width: 170, }}
                    onClick={handleSetTokenNew}
                >
                    Set token
                </LoadingButton>
            </Box>
        </>
    );
}

export default SecondStep;