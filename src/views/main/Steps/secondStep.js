import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { setContractToken } from "utils/contractMethods";
import { contractSelector } from "store/reducers/contract/reducer";

function SecondStep({ setActiveStep }) {
    const [tokenAddress, setTokenAddress] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const { address } = useSelector(contractSelector);

    const handleTokenChange = (e) => {
        setTokenAddress(e.target.value);
    }

    const handleSetToken = () => {
        setContractToken(tokenAddress, address, dispatch, setLoading, setActiveStep);
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: 400,
                    pt: 2,
                    pl: 2
                }}
            >
                <TextField
                    value={tokenAddress}
                    type='text'
                    label='Token address'
                    size='small'
                    onChange={handleTokenChange}
                />
                <Typography>Balance: </Typography>
                <LoadingButton
                    loading={loading}
                    loadingIndicator="Setting..."
                    variant="outlined"
                    sx={{ width: 170, }}
                    onClick={handleSetToken}
                >
                    Set token
                </LoadingButton>
            </Box>
        </>
    );
}

export default SecondStep;