/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { setContractToken } from "utils/contractMethods";
import { contractSelector } from "store/reducers/contract/reducer";
import {  setToken } from 'store/reducers/contract/reducer';
import useContract from "contracts/prepareContract";
import copyTextToClipboard from "utils/copyPast";
import Toolkit from "ui-component/elements/tooltip";

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
                              <Typography variant='h4' 
      color={'primary'} align='justify'
      >On this step you have to set address of Token in which you'll pay salary - 
      it must be only ERC20 standart token. For instance - you can set our testUSDT  -
      <Toolkit title={"Click on it to copy!"}>
      <Button onClick={()=>{copyTextToClipboard('0xD049815A3d490CBCF73415A65384652D5F15a367')}}>
        0xD049815A3d490CBCF73415A65384652D5F15a367.
        </Button>
        </Toolkit>
      Afterwards, on page - Settings, you'd claim testUSDT from our faucet absolutly free.
      </Typography>

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