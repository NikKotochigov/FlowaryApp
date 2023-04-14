import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import { forwardRef, useState } from 'react';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import Toolkit from './tooltip';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomModal({ children, open, handleClickOpen }) {
    return (
        <div>
        
            <ManageAccountsRoundedIcon
                style={{ fontSize: '300%', color: '#0047AB' }}
                onClick={handleClickOpen}
                sx={{
                    ['&:hover']: {
                        opacity: 0.7,
                        color: 'rgba(0, 0, 0, 0.87)',
                        cursor: 'pointer'
                    }
                }}
            />
    
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClickOpen}
                aria-describedby="alert-dialog-slide-description"
            >
                 
                <DialogActions
                    sx={{
                        p: 4
                    }}
                >
                                    

                    {children}
                 
                </DialogActions>
            </Dialog>
            
        </div>
    );
}


