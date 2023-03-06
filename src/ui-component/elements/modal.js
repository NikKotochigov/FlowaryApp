import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import { forwardRef, useState } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BasicModal({ nameModal, children, open, handleClickOpen, size='large', fontSize, variant='outlined' }) {


  return (
    <div>
      <Button variant={variant} size={size} onClick={handleClickOpen} 
      sx={{
            fontSize: {fontSize},
      }}
      >
        {nameModal}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickOpen}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogActions
          sx={{
            p: 4,
          }}
        >
          {children}
          {/* <Button onClick={handleClose}>{nameModal}</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
