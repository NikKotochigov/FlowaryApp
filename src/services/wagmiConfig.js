import {
    getDefaultWallets
  } from '@rainbow-me/rainbowkit';
  import {
    configureChains,
    createClient,
    createStorage
  } from 'wagmi';
  import {
    goerli
  } from 'wagmi/chains'
  import { publicProvider } from 'wagmi/providers/public';
  
  export const { chains, provider } = configureChains(
    [goerli],
    [
      publicProvider()
    ]
  );
  
  export const { connectors } = getDefaultWallets({
    appName: 'Superfluid',
    chains
  });
  
  export const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  })