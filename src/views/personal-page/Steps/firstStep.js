import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contractSelector, setAddress } from "store/reducers/contract/reducer";
import { createCompany } from "utils/createCompany";

import { Box, Button, TextField, Typography } from "@mui/material";

function FirstStep() {
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const { address } = useSelector(contractSelector);

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleAddCompany = () => {
        const address = createCompany(name);
        dispatch(setAddress(address ? address : undefined));
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
                    value={name}
                    type='text'
                    label='Company name'
                    size='small'
                    onChange={handleNameChange}
                />
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        variant="outlined"
                        sx={{ width: 170, }}
                        onClick={handleAddCompany}
                    >
                        Create company
                    </Button>
                    {address && <Typography>{name}</Typography>}
                </Box>
            </Box>
        </>
    );
}

export default FirstStep;