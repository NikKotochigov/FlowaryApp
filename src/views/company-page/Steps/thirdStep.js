import { useState } from "react";

import { Box, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { contractSelector, setAdmin } from "store/reducers/contract/reducer";

function ThirdStep() {
    const [adminAddress, setAdminAddress] = useState("");
    const dispatch = useDispatch();
    const { address } = useSelector(contractSelector);

    const handleAddressChange = (e) => {
        setAdminAddress(e.target.value);
    }

    const handleSetAdmin = () => {
        const admin = setContractAdmin(adminAddress, address);
        dispatch(setAdmin(admin));
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
                <Button
                    variant="outlined"
                    sx={{ width: 170, }}
                    onClick={handleSetAdmin}
                >
                    Set admin
                </Button>
            </Box>
        </>
    );
}

export default ThirdStep;