import { useState } from "react";
import { useDispatch } from "react-redux";

import { createCompany } from "utils/createCompany";
import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";

function FirstStep({ setActiveStep }) {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleAddCompany = () => {
        createCompany(name, dispatch, setLoading, setActiveStep);
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
                    <LoadingButton
                        loading={loading}
                        loadingIndicator="Creating..."
                        variant="outlined"
                        sx={{ width: 170, }}
                        onClick={handleAddCompany}
                    >
                        Create company
                    </LoadingButton>
                </Box>
            </Box>
        </>
    );
}

export default FirstStep;