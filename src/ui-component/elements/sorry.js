import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import sorry from '../../assets/images/sorry.png';

const Sorry = () => {
    return ( 
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={sorry} alt="gif" width="345" />

<Typography color="primary" 
sx={{ display: 'flex', 
alignItems: 'center', 
fontSize: '26px', 
fontWeight: 'medium',
width: '450px',
textAlign: 'justify',
m: 3 }}>
  If you see this touching pic, it means that we can't show you content of the requsted company:
  maybe you're not a owner/employee or you don't have enougth rigths of access. But, don't be upset, you can get acquainted with our Demo!
</Typography>
</Box>

     );
}
 
export default Sorry;