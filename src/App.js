import { useDispatch, useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { Button, CssBaseline, StyledEngineProvider } from '@mui/material';
import { WagmiConfig } from 'wagmi';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { customizationSelector } from 'store/reducers/customization/reducer';
import { chains, wagmiClient } from 'services/wagmiConfig';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

import "@rainbow-me/rainbowkit/styles.css";
import { useState } from 'react';
//========================||effort to make laending||===========//


import {
    Box,
    Card,
    CardMedia,
    Grid,
    Popover,
    TextField,
    Toolbar,
    Typography,
    useTheme,
  } from "@mui/material";
  import BasicModal from "../src/ui-component/elements/modal";
  // import { useDispatch, useSelector } from 'react-redux'
  import { useAccount } from 'wagmi'
  import { redirect, useNavigate } from "react-router-dom";
  // import { useEffect } from "react";
  // import { ethers } from "ethers";
  import CompanyCreateStepper from "../src/views/main/Steps/companyCreateStepper";
  import CustomPopover from "../src/ui-component/elements/customPopover";
import Lending from 'ui-component/pages/lending/lending';
import Main from 'views/main/default';



// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector(customizationSelector);
    const [app, setApp] = useState(false)
    

    return (<>


      <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={themes(customization)}>
                        <CssBaseline />
{app ? <>
<NavigationScroll>
                            <Routes />
                        </NavigationScroll>
</>
   : 
    <Main setApp={setApp}/>
   //<Lending setApp={setApp}/>                    
}



                    </ThemeProvider>
                </StyledEngineProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    </>
      
    );
};

export default App;
