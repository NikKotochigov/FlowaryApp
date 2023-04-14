import { ethers } from "ethers";
import provider from "./provider";

import { CONTRACT_ABI, TOKEN_ABI } from "../consts/contractAbi";
import { setArrOutsource, setArrEmployee, setSymbolToken, setContractInfo, setAddress } from "../store/reducers/contract/reducer";


const connectContract = async (address, dispatch) => {
  if (!address) return
  try {
    const contract = new ethers.Contract(address, CONTRACT_ABI, provider);
    dispatch(setAddress(address)); // TODO диспатчить адрес по кнопке
    /* get contract info */
    const admin = await contract.administrator();
    const name = await contract.name();
    const owner = await contract.owner();
    const token = await contract.token();
    const decimalsToken = (await contract.getDecimals()).toNumber();
    const hl = (await contract.tokenLimitMaxHoursPerPerson()).toNumber();
    const contractBalance = await contract.currentBalanceContract();
    const balance = Number(ethers.utils.formatUnits(contractBalance, decimalsToken)).toFixed(2);
    const amountEmployee = (await contract.amountEmployee()).toNumber();
 const liquidation = await contract.liqudation();
 
    dispatch(setContractInfo({
      admin,
      name,
      owner,
      token,
      decimalsToken,
      hl,
      balance,
      amountEmployee,
      liquidation
    }));

    /* get employee info */
    const employeeArr = [];
    for (let i = 0; i < amountEmployee; i++) {
      const addrEmpl = await contract.allEmployeeList(i);
      const result = await contract.allEmployee(addrEmpl);
      const employee = { who: result.who, rate: (Number(ethers.utils.formatUnits(result.flowRate, decimalsToken)) * 60 * 60).toFixed(2) }
      employeeArr.push(employee);
    }
    dispatch(setArrEmployee(employeeArr));

    /* get outsource info */
   const amountOutsources = (await contract.OutsourceID()).toNumber();
    const outsourcesArr = [];
    for (let i = 0; i < amountOutsources; i++) {
      const result = await contract.listOutsource(i);
      const outsourceJob = {
        taskName: result.task,
        who: result.who,
        startDate: Number(result.startAt),
        deadline: Number(result.deadline),
        wage: Number(ethers.utils.formatUnits(result.wage, decimalsToken)).toFixed(2),
        status: Number(result.status),
        id: i
      }
      outsourcesArr.push(outsourceJob);
    }
    dispatch(setArrOutsource(outsourcesArr));
    /* get info about symbol of token which uses in contract */
    const contractToken = new ethers.Contract(token, TOKEN_ABI, provider);
    const symbolToken = await contractToken.symbol()
    dispatch(setSymbolToken(symbolToken));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default connectContract;


// import { ethers } from "ethers";
// import provider from "./provider";
// import { setArrOutsource, setHl, setArrEmployee, setBalance, setAmountEmployee, setName, setOwner, setAdmin, setAddress, setToken, setDecimalsToken, setSymbolToken } from "../store/reducers/contract/reducer";
// import { CONTRACT_ABI } from "../consts/contractAbi";
// import { TOKEN_ABI } from "../consts/contractAbi";
// import dayjs from "dayjs";


// const connectContract = async (add, dispatch) => {   
// const contract = new ethers.Contract(add, CONTRACT_ABI, provider);
// //-----get constant info from contrac-----//
// const address = add;
// dispatch(setAddress(address));
//  const admin = await contract.administrator()
//  dispatch(setAdmin(admin));
//  const name = await contract.name()
//  dispatch(setName(name));
//  const owner = await contract.owner()
//  dispatch(setOwner(owner));
//   const token = await contract.token()
// dispatch(setToken(token));
// const decimalsToken = (await contract.getDecimals()).toNumber()
// dispatch(setDecimalsToken(decimalsToken));
// const hl = (await contract.tokenLimitMaxHoursPerPerson()).toNumber();
// dispatch(setHl(hl));
// //=========get variable info=====//
// const bal = await contract.currentBalanceContract();
// const balan  = Number(ethers.utils.formatUnits(bal, decimalsToken)).toFixed(2)
// dispatch(setBalance(balan));

// const amountEmployee = (await contract.amountEmployee()).toNumber();
// dispatch(setAmountEmployee(amountEmployee));

// let employeeArr = [];
// for (let i = 0; i < amountEmployee; i++) {
//     const addrEmpl = await contract.allEmployeeList(i);
//     const result = await contract.allEmployee(addrEmpl);
//     const employee = {who: result.who, rate: (Number(ethers.utils.formatUnits(result.flowRate, decimalsToken))*60*60).toFixed(2)}
//     employeeArr.push(employee);
// }
// dispatch(setArrEmployee(employeeArr));

// const amountOutsources = (await contract.id()).toNumber();
// let outsourcesArr = [];
// for (let i = 0; i < amountOutsources; i++) {
//     const result = await contract.listOutsource(i);
//     const outsourceJob = {taskName: result.task, 
//       who: result.who,
//       startDate: Number(result.startAt),
//       deadline: Number(result.deadline),
//       wage: Number(ethers.utils.formatUnits(result.wage, decimalsToken)).toFixed(2),
//       status: Number(result.status),
//       id: i
//     }
//     outsourcesArr.push(outsourceJob);
// }
// dispatch(setArrOutsource(outsourcesArr));

// //------get info about symbol of token which uses in contract-----//
// const contractToken = new ethers.Contract(token, TOKEN_ABI, provider);
// const symbolToken = await contractToken.symbol()
// dispatch(setSymbolToken(symbolToken));
// }

//  export default connectContract;

