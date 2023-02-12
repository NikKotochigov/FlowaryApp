import provider from "./provider";

const conectSigner = (contract) => {
  const signer = provider.getSigner();
  return contract.connect(signer);
};

export default conectSigner;