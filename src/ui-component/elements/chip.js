import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';

export default function AvatarChip({address}) {
  return (
    <Stack direction="row" spacing={1}>
      <Chip 
      avatar={<Avatar><Jazzicon diameter={80} seed={jsNumberForAddress(address)} /></Avatar>} 
     label={`Contract: ${address.slice(0, 5) + '...' + address.slice(38)}`}
      variant="outlined"
      sx={{fontSize: '14px',
      fontWeight: 'bold'
      }} />
      {/* <Chip
        avatar={<Avatar alt="address" 
        src="/static/images/avatar/1.jpg" 
        />}
        label="Avatar"
        variant="outlined"
      /> */}
    </Stack>
  );
}