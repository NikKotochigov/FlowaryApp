import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { setContractToken } from "utils/contractMethods";
import { useDispatch, useSelector } from "react-redux";
import { contractSelector, setToken } from "store/reducers/contract/reducer";

function SecondStep() {
    const [tokenAddress, setTokenAddress] = useState("");
    const dispatch = useDispatch();
    const { address } = useSelector(contractSelector);

    const handleTokenChange = (e) => {
        setTokenAddress(e.target.value);
    }

    const handleSetToken = () => {
        const contractToken = setContractToken(token, address);
        dispatch(setToken(contractToken));
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
                <Button
                    variant="outlined"
                    sx={{ width: 170, }}
                    onClick={handleSetToken}
                >
                    Set token
                </Button>
            </Box>
        </>
    );
}

export default SecondStep;