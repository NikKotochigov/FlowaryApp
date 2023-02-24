import { Box, Button, CardMedia, TextField } from "@mui/material";
import { useState } from "react";
import BasicModal from "../../../elements/modal";
import provider from "../../../../contracts/provider";
import { useDispatch, useSelector } from "react-redux";
import { contractSelector } from "store/reducers/contract/reducer";
import SIGNER from "../../../../contracts/SIGNER";
import conectSigner from "../../../../contracts/SIGNER";
import { TOKEN_ABI } from "../../../../consts/contractAbi";
import ButtonWithResult from "ui-component/elements/buttonWithResult";
import { ethers } from "ethers";
import {  setBalance } from '../../../../store/reducers/contract/reducer';
import useContract from '../../../../contracts/prepareContract'


function LoadDepositModal() {
    const [isOpen, setIsOpen] = useState(false);
    const handleOnClick = () => {
        setIsOpen(prev => !prev);
    }
    const [money, setMoney] = useState(0);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { contract } = useContract();

    const handleInputMoney = (e) => {
        setMoney(e.target.value)
console.log(e.target.value)
     };

const { address, token, decimalsToken } = useSelector(contractSelector);
const contractToken = new ethers.Contract(token, TOKEN_ABI, provider);
const contractSigner = conectSigner(contractToken)
const dispatch = useDispatch();
    
const handleLoadMoney = async() => {
    try {
        setSuccess(false);
        setLoading(true);
        const deposit = await contractSigner.transfer(address, BigInt(Math.ceil((money)*(10**decimalsToken))))
        const tx = await deposit.wait()
        console.log('transfer:', tx)
        const bal = await contract.currentBalanceContract();
        const balan  = Number(ethers.utils.formatUnits(bal, decimalsToken)).toFixed(2)
        dispatch(setBalance(balan));

        setSuccess(true);
        setLoading(false);
    }
    catch(error){
        console.log(error);
        setLoading(false);
    } 
    }

    return (
        <BasicModal size="small"
            nameModal={"Load deposit"}
            open={isOpen}
            handleClickOpen={handleOnClick}

            // minW={400}
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
                    value={money}
                    onChange={handleInputMoney}
                    InputProps={{ inputProps: { min: 0 } }}

                />
                   <ButtonWithResult handler={success ? handleOnClick : handleLoadMoney} loading={loading} success={success}>
                            {success ? 'Success' : 'Send money'}
                        </ButtonWithResult>
                {/* <Button
                    variant="outlined"
                    sx={{ width: 170, }}
                    onClick={handleLoadMoney}
                >
                    Send transaction
                </Button> */}

            </Box>
        </BasicModal>
    );
}

export default LoadDepositModal;