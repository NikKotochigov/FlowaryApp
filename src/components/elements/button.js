import { Button } from "@mui/material";

const CustomButton = ({h=100, w=200, fs="16", children}) => {
    return ( <>
    <Button variant="outlined" 
        sx={{
            height: {h},
            width: {w},
            fontSize: {fs},
          }}
    >
        {children}
    </Button>
    </> );
}
 
export default CustomButton;