import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { ConnectWallet } from 'ui-component/connect-wallet/connectWallet';

const ZeroStep = ({setActiveStep}) => {
    return ( <>
    <Box sx={{display: 'flex', justifyContent:'center', p: 2}}>
      <Button onClick={() => setActiveStep(prev => prev + 1)}>
    <ConnectWallet />
    </Button>   
    </Box>
   
    </> );
}
 
export default ZeroStep;