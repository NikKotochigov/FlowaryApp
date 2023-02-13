import { Popover, Typography } from "@mui/material";

const CustomPopover = ({handleClick, open, anchorEl, handleClose}) => {
    // const open = Boolean(anchorEl);
  
    return ( <>
        <div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>Connect your Wallet, pls</Typography>
      </Popover>
    </div>

    </> );
}
 
export default CustomPopover;