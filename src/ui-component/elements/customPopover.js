import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function CustomPopover({ id, children, anchorEl, setAnchorEl, text}) {
  // const [anchorEl, setAnchorEl] = useState(null);

  // const handleOpenPopover = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;

  return (
    <div>
{children}
      {/* <Button aria-describedby={id} variant="contained" onClick={handleOpenPopover}>
        Open Popover
      </Button> */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
        <Typography sx={{ p: 2, color: 'red', fontSize: '16px', fontWeight: 'bold' }}>{text}</Typography>

      </Popover>
    </div>
  );
}
