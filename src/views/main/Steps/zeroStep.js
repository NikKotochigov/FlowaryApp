import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ConnectWallet } from 'ui-component/connect-wallet/connectWallet';

const ZeroStep = ({setActiveStep}) => {
    return ( <>
    <Box sx={{display: 'flex', 
    flexDirection: 'column',
    alignItems:'center', 
    gap: 2,
    p: 2}}>
      <Typography variant='h4'
      color={'primary'}
      >Fist of all you have to connect your Wallet</Typography>
      <Button onClick={() => setActiveStep(prev => prev + 1)}>
    <ConnectWallet />
    </Button>   
    </Box>
   
    </> );
}
 
export default ZeroStep;