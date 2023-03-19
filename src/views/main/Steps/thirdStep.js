import { useState } from "react";

import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { contractSelector } from "store/reducers/contract/reducer";
import { setContractAdmin } from "utils/contractMethods";
import { useNavigate } from "react-router";
import connectContract from "contracts/erc20";

function ThirdStep({ setActiveStep }) {
    const [adminAddress, setAdminAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { address } = useSelector(contractSelector);
    const navigate = useNavigate();

    const handleAddressChange = (e) => {
        setAdminAddress(e.target.value);
    }

    const handleSetAdmin = async () => {
        await setContractAdmin(adminAddress, address, dispatch, setLoading, setActiveStep);
        console.log('navigate')
        await connectContract(address, dispatch)
        navigate("/personal-page");
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
                    value={adminAddress}
                    type='text'
                    label='Admin address'
                    size='small'
                    onChange={handleAddressChange}
                />
                <LoadingButton
                    loading={loading}
                    loadingIndicator="Setting..."
                    variant="outlined"
                    sx={{ width: 170, }}
                    onClick={handleSetAdmin}
                >
                    Set admin
                </LoadingButton>
            </Box>
        </>
    );
}

export default ThirdStep;