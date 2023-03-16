import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { jsNumberForAddress } from "react-jazzicon";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import LoadDepositModal from "ui-component/pages/company/loadDepositModal/loadDepositModal";
import BasicModal from "./modal";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import useContract from "contracts/prepareContract";
import { useDispatch, useSelector } from "react-redux";
import { contractSelector } from "store/reducers/contract/reducer";
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import {  setLiquidation, setBalance } from '../../store/reducers/contract/reducer';

const LiquidationModal = ({isOpen, handleOnClick}) => {
const [totalDebt, setTotalDebt] = useState(0)
const [debtArray, setDebtArray] = useState([])
const { contract, contractSigner } = useContract();
const { balance, decimalsToken, symbolToken, amountEmployee } = useSelector(contractSelector);
const dispatch = useDispatch();

const blink = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const BlinkedBox = styled('div')({
  backgroundColor: 'red',
  borderRadius: 15,
  width: 30,
  height: 30,
  animation: `${blink} 1s linear infinite`,
});

    useEffect(() => {
        (async () => {
            try {
              const total = await contract._totalDebt();
              const totalD = Number(ethers.utils.formatUnits(total, decimalsToken)).toFixed(2)
              setTotalDebt(totalD)
              const debtArray = [];
              for(let i=0; i < amountEmployee; i++){
                const addrEmpl = await contract.allEmployeeList(i);
                const result = await contract.debtToEmployee(addrEmpl);
                const employee = {who: addrEmpl, debt: Number(ethers.utils.formatUnits(result, decimalsToken)).toFixed(2)}
            if(employee.debt > 0) debtArray.push(employee)
              }
              setDebtArray(debtArray)
            } catch (error) {
                console.log('DEV>>>>', error);
            }
        })();
    }, []);

  //========Finish liq========//
  const handleFinishLiqudation = async() =>{
    try {
      const tx = await contractSigner.finishLiqudation()
      await tx.wait();
      const liqudation = await contract.liqudation();
     dispatch(setLiquidation(liqudation));
     const bal = await contract.currentBalanceContract();
     const balan  = Number(ethers.utils.formatUnits(bal, decimalsToken)).toFixed(2)
     dispatch(setBalance(balan));

    } catch (error) {
      console.log(error)
    }
  }

    return ( <>
    <Box sx={{display:'flex', flexDirection:'row', gap: 0.5, alignItems: 'center'}}>
        <BlinkedBox />
          <BasicModal nameModal={'Start Liquidation procedure'} open={isOpen} handleClickOpen={handleOnClick} size='medium'>
<Box sx={{
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: 1
}}>
  <Typography variant="h2" color='red'>
   Total debt of your company is: {totalDebt} {symbolToken}     
  </Typography>
  
  <Typography variant="h3">
Personal debts: 
  </Typography>
  {debtArray.map(({who, debt}) => 
  <Box sx={{
    display: 'flex',
    alignContent: 'center',
    m: 0.5,
    gap: 1,
    fontSize: '18px'
}}
  key={uuidv4()}> 
  <Jazzicon diameter={20} seed={jsNumberForAddress(who)} />
  {who.slice(0, 5) + '...' + who.slice(38)}: {debt} {symbolToken}</Box>)}
  {+balance >= totalDebt 
? <Typography variant="h2" color='green'>You have enought funds to pay off, push the button</Typography>
: <Typography textAlign={'center'} variant="h2" color='red'>You have to deposit: {(totalDebt-(+balance)).toFixed(2)} {symbolToken}</Typography>
}  
{+balance >= totalDebt 
? <Button sx={{fontSize: '26px', color: 'red', fontWeight: 'bold'}} 
variant="outlined" size='large' onClick={handleFinishLiqudation}>Finish it!</Button>
: <Box sx={{display: 'flex', flexDirection: 'column', gap:1, alignItems: 'center'}}> 
<Typography variant="h3" color='red'>Are you ready to pay off your debts?</Typography>
<LoadDepositModal showWithdraw={false}/>
</Box>}

</Box>

</BasicModal>
  
    </Box>

    </> );
}
 
export default LiquidationModal;