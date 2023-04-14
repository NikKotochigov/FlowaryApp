import walletProvider from "./walletProvider";


const conectSigner = (contract) => {
  const signer = walletProvider.getSigner();
  return contract.connect(signer);
};

export default conectSigner;