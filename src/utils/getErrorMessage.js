

const getErrorMessage = (error) => {
  if (error.code === "INSUFFICIENT_FUNDS") {
    return "Not Enough Funds 😢";
  }

  if (error.code === "INVALID_ARGUMENT") {
    return "Invalid Input ❌";
  }

  if (error.code === "UNSUPPORTED_OPERATION") {
    return "Opps, you can't sign tx! Install MetaMask 🦊";
  }

  if (error.code === "ACTION_REJECTED") {
    return "Transaction was Rejected ❌";
  }
  if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
    return "Balance is very low! ❌";
  }
  return "Oii wei, we got problem! 😞";
};

export default getErrorMessage;

