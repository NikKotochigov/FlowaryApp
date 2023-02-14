import { useState } from 'react';
import { useSelector } from 'react-redux';

// components
import { Box, Button, CardMedia, TextField } from '@mui/material';
import CustomModal from '../../../elements/customModal';

import { contractSelector } from '../../../../store/reducers/contract/reducer';

function ChangeRecieverModal() {
    const [rate, setRate] = useState();

    const { contract } = useSelector(contractSelector);

    const [isOpen, setIsOpen] = useState(false);
    const handleOnClick = () => {
        setIsOpen((prev) => !prev);
    };
    //it's example of functions, in reality it can has another name & syntaxis --***-------
    const handleDeleteReciever = () => {
        contract.deleteEmpoloyee(this.address);
    };

    const handleRateChange = (e) => {
        contract.changeRate(this.address, rate);
    };

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
                            onChange={(e) => setRate(e.target.value)}
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
                        onClick={handleDeleteReciever}
                    >
                        Delete reciever
                    </Button>
                </Box>
            </CustomModal>
        </div>
    );
}

export default ChangeRecieverModal;
