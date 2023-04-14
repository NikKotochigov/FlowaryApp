import { useState } from "react";

import { Box, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { contractSelector } from "store/reducers/contract/reducer";
import { setContractAdmin } from "utils/contractMethods";
import { useNavigate } from "react-router";
import connectContract from "contracts/erc20";
import {  setAdmin } from 'store/reducers/contract/reducer';
import useContract from "contracts/prepareContract";

function ThirdStep({ setActiveStep }) {
    const [adminAddress, setAdminAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { address } = useSelector(contractSelector);
    const navigate = useNavigate();
    const { contractSigner } = useContract()

    const handleAddressChange = (e) => {
        setAdminAddress(e.target.value);
    }
    const handleSetAdminNew = async() => {
        try {
            setLoading(true);
            const tx = await contractSigner.changeAdmin(adminAddress)
        await tx.wait()
        setLoading(false);
        dispatch(setAdmin(adminAddress));
        setActiveStep(prev => prev + 1);
        await connectContract(address, dispatch)
        navigate("/dashboard");

        } catch (error) {
            setLoading(false);
            console.log(error)
        }
            }
        
    const handleSetAdmin = async () => {
        await setContractAdmin(adminAddress, address, dispatch, setLoading, setActiveStep);
        console.log('navigate')
        await connectContract(address, dispatch)
        navigate("/dashboard");

    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mt: 3,
                    alignItems:'center',
                    width: '100%'
                }}
            >
                              <Typography variant='h4' 
      color={'primary'} align='justify'>
This is the last task%) Here you have to add address of one more Wallet, which'll be have role - Admin. 
Owner of this Wallet has practically the same abilities for your Company managment. Admin - Deputy Owner.      
If you don't want to give somebody access for your Company managment, you can set here address of your Wallet. You'll have
two roles - Owner&Admin of Company at once.  
 </Typography>

                <TextField
                    value={adminAddress}
                    type='text'
                    label='Admin address'
                    size='small'
                    onChange={handleAddressChange}
                    sx={{ width: 370 }}

                />
                <LoadingButton
                    loading={loading}
                    loadingIndicator="Setting..."
                    variant="outlined"
                    sx={{ width: 170, }}
                    onClick={handleSetAdminNew}
                >
                    Set admin
                </LoadingButton>
            </Box>
        </>
    );
}

export default ThirdStep;