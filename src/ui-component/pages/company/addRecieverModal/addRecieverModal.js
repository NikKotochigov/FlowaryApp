import { useState } from "react";
import { useSelector } from "react-redux";

// components
import { Box, Button, CardMedia, TextField } from "@mui/material";
import BasicModal from "../../../elements/modal";

import { contractSelector } from "../../../../store/reducers/contract/reducer";

function AddRecieverModal() {
    const [address, setAddress] = useState();
    const [rate, setRate] = useState();

    const { contract } = useSelector(contractSelector);

    const [isOpen, setIsOpen] = useState(false);
    const handleOnClick = () => {
        setIsOpen(prev => !prev);
    }

    const handleAddReciever = () => {
        contract.addEmpoloyee(address, rate);
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    }

    const handleRateChange = (e) => {
        setRate(e.target.value);
    }

    return (
        <div>
            <BasicModal
                nameModal={"Add reciever"}
                open={isOpen}
                handleClickOpen={handleOnClick}
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
                        value={address}
                        fullWidth
                        label="Address of new reciever"
                        variant="outlined"
                        onChange={handleAddressChange}
                    />
                    <TextField
                        value={rate}
                        fullWidth
                        type='number'
                        label="Rate per hour"
                        variant="outlined"
                        onChange={handleRateChange}
                    />
                    <Button
                        variant="outlined"
                        sx={{ width: 170, }}
                        onClick={handleAddReciever}
                    >
                        Add reciever
                    </Button>
                </Box>
            </BasicModal>
        </div>
    )
}

export default AddRecieverModal;