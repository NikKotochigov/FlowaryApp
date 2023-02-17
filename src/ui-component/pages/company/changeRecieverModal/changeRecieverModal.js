import { useState } from 'react';
import { useSelector } from 'react-redux';
import { contractSelector } from "../../../../store/reducers/contract/reducer";
import { Box, Button, CardMedia, TextField } from '@mui/material';
import CustomModal from '../../../elements/customModal';
import useContract from '../../../../contracts/prepareContract'


function ChangeRecieverModal({who}) {
    const [rate, setRate] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const { contractSigner } = useContract();

    const handleOnClick = () => {
        setIsOpen((prev) => !prev);
    };

    const handleRateChangeInput = (e) => {
        setRate(e.target.value);
    };

    const handleRateChange = async() => {
    try {
     handleOnClick()
     const changeRate = await contractSigner.modifyRate(who, rate)
        const res = await changeRate.wait()
        console.log(res)
    } catch (error) {
        console.log(error)
    }
 }

 const handleDelete = async() => {
    try {
     handleOnClick()
     const deleteUser = await contractSigner.deleteEmployee(who)
        const res = await deleteUser.wait()
        console.log(res)
    } catch (error) {
        console.log(error)
    }
 }

    return (
        <div>
            <CustomModal handleClickOpen={handleOnClick} open={isOpen}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        width: 400
                    }}
                >
                    <CardMedia component="img" height="160" image="/static/images/stream.jpg" alt="stream picture" />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <TextField
                            value={rate}
                            type="number"
                            label="Enter new rate per hour"
                            variant="outlined"
                            onChange={handleRateChangeInput}
                        />
                        <Button
                            variant="outlined"
                            // sx={{ width: 170, }}
                            onClick={handleRateChange}
                        >
                            Set new rate
                        </Button>
                    </Box>

                    <Button
                        variant="outlined"
                        // sx={{ width: 170, }}
                        onClick={handleDelete}
                    >
                        Delete reciever
                    </Button>
                </Box>
            </CustomModal>
        </div>
    );
}

export default ChangeRecieverModal;
