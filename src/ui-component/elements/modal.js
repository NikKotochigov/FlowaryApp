// import { useState } from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import { useTheme } from '@mui/material';

// export default function BasicModal({nameModal, children}) {
//   const [open, setOpen] = useState(false);
// const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const theme = useTheme();
//   const style = {
//     position: 'absolute',
//     top: '40%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: 0,
//     // boxShadow: theme.shadows[25],
//     borderRadius: 2,
//     p: 4,
//   };
//   return (
//     <div>
//       <Button variant="outlined" onClick={handleOpen}>{nameModal}</Button>
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box sx={style}>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
// {children}
//           </Typography>
//         </Box>
//       </Modal>
//     </div>
//   );
// }

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import { forwardRef, useState } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BasicModal({ nameModal, children, open, handleClickOpen, size='large', fontSize, variant='outlined' }) {
  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(!open);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

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

// const Modal = ({ children, active, setActive, handleStop = false}) => {

//     const handleStopPropag =(e) => {
//     e.stopPropagation()
//     }

//     const handleOverlayClick = () => {setActive(false)}

//       return active && (<>
//         <div
//           className='h-full w-full bg-black opacity-70 fixed top-0 left-0 flex items-center justify-center scale-100'
//           onClick={handleStop ? handleStopPropag : handleOverlayClick}
//         ></div>
//           <div
//             className={`z-10 absolute right-1/3 p-5 w-1/3 rounded-md bg-white  text-black scale-100`}
//             onClick={handleStopPropag}
//           >
//               {children}
//            </div></>
//       )
//     }

//     export default Modal
