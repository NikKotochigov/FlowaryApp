import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
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

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector(customizationSelector);

    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={themes(customization)}>
                        <CssBaseline />
                        <NavigationScroll>
                            <Routes />
                        </NavigationScroll>
                    </ThemeProvider>
                </StyledEngineProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    );
};

export default App;
