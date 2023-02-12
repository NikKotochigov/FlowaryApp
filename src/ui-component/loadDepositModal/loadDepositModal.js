import { Box, Button, CardMedia, TextField } from "@mui/material";
import { useState } from "react";
import BasicModal from "../../../elements/modal";

function LoadDepositModal() {
    const [isOpen, setIsOpen] = useState(false);
    const handleOnClick = () => {
        setIsOpen(prev => !prev);
    }

    return (
        <BasicModal
            nameModal={"Load deposit"}
            open={isOpen}
            handleClickOpen={handleOnClick}
            minW={400}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    width: 400
                }}
            >
                <CardMedia
                    component='img'
                    height='160'
                    image="/static/images/stream.jpg"
                    alt='stream picture'
                />
                <TextField
                    fullWidth
                    label="Amount of payment"
                    variant="outlined"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button
                    variant="outlined"
                    sx={{ width: 170, }}
                >
                    Send transaction
                </Button>
            </Box>
        </BasicModal>
    );
}

export default LoadDepositModal;