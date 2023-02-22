import { ethers } from "ethers";
import provider from "./provider";
import { setArrEmployee, setBalance, setAmountEmployee, setName, setOwner, setAdmin, setAddress, setToken, setDecimalsToken, setSymbolToken } from "../store/reducers/contract/reducer";
import { CONTRACT_ABI } from "../consts/contractAbi";
import { TOKEN_ABI } from "../consts/contractAbi";


const connectContract = async (add, dispatch) => {   
const contract = new ethers.Contract(add, CONTRACT_ABI, provider);
//-----get constant info from contrac-----//
const address = add;
dispatch(setAddress(address));
 const admin = await contract.administrator()
 dispatch(setAdmin(admin));
 const name = await contract.name()
 dispatch(setName(name));
 const owner = await contract.owner()
 dispatch(setOwner(owner));
  const token = await contract.token()
dispatch(setToken(token));
const decimalsToken = (await contract.getDecimals()).toNumber()
dispatch(setDecimalsToken(decimalsToken));

//=========get variable info=====//
const bal = await contract.currentBalanceContract();
const balan  = Number(ethers.utils.formatUnits(bal, decimalsToken)).toFixed(2)
dispatch(setBalance(balan));

const amountEmployee = (await contract.amountEmployee()).toNumber();
dispatch(setAmountEmployee(amountEmployee));

let employeeArr = [];
for (let i = 0; i < amountEmployee; i++) {
    const addrEmpl = await contract.allEmployeeList(i);
    const result = await contract.allEmployee(addrEmpl);
    const employee = {who: result.who, rate: (Number(ethers.utils.formatUnits(result.flowRate, decimalsToken))*60*60).toFixed(2)}
    employeeArr.push(employee);
}
dispatch(setArrEmployee(employeeArr));
console.log('massiv sotrud :', employeeArr)

//------get info about symbol of token which uses in contract-----//
const contractToken = new ethers.Contract(token, TOKEN_ABI, provider);
const symbolToken = await contractToken.symbol()
dispatch(setSymbolToken(symbolToken));
}

 export default connectContract;

