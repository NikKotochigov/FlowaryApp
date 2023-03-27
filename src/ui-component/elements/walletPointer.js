import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import fingerPoint from '../../assets/images/fingerPoint.png';

const WalletPointer = () => {
    return ( 
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Typography color="primary" sx={{ display: 'flex', alignItems: 'center', fontSize: '40px', fontWeight: 'medium' }}>
            Connect your Wallet, pls
        </Typography>
        <img src={fingerPoint} alt="gif" width="245" />
    </Box>

     );
}
 
export default WalletPointer;