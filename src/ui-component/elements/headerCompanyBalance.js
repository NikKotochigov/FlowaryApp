import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";
import { contractSelector } from "store/reducers/contract/reducer";
import copyTextToClipboard from "utils/copyPast";
import AvatarChip from "./chip";
import LiquidationModal from "./liquidationModal";
import Toolkit from "./tooltip";

const HeaderCompanyBalance = () => {
    const { address, name, balance, symbolToken, liquidation} = useSelector(contractSelector);

    const [isOpen, setIsOpen] = useState(false);

    const handleOnClick = () => {
      setIsOpen((prev) => !prev);
  };
      
    return ( 
        <>
 <Box
sx={{
    display: {
        sm: 'block', //600px
        md: 'flex' //900px
    },
    justifyContent: 'space-between'
}}
>
<Box
    sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        m: 3
    }}
>
    <Typography variant="h2" color="primary">
        Company {name}
    </Typography>
    <Toolkit title={"Click on it to copy!"}>
<Button variant='text'
onClick={()=>{copyTextToClipboard(address)}}
>
<AvatarChip 
address={address} />        
</Button>
</Toolkit>
</Box>
{liquidation 
? <LiquidationModal
isOpen={isOpen} 
handleOnClick={handleOnClick} 
/>
: <Box
    sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        m: 4
    }}
>
    <Typography variant="h4" color="primary">
            Available balance:   {balance} {symbolToken}
    </Typography>
    <Box sx={{display: 'flex',
gap: 1}}>
    </Box>
</Box>   
}


</Box>
       
        </>
     );
}
 
export default HeaderCompanyBalance;

