import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import { forwardRef, useState } from "react";
import Toolkit from "./tooltip";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BasicModal({ nameModal, children, open, handleClickOpen, size='large', fontSize, variant='outlined', backgroundColor, title, placement}) {


  return (
    <div>
       <Toolkit 
                title={title}
                placement={placement} >
      <Button variant={variant} size={size} onClick={handleClickOpen} 
      sx={{
            fontSize: {fontSize},
            backgroundColor: {backgroundColor}
      }}
      >
        {nameModal}
      </Button>
      </Toolkit>
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
