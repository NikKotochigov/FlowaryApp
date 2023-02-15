import { Box, Button, Grid, Typography } from '@mui/material';
import { goods } from 'consts/data';
import { useSelector } from 'react-redux';
import { contractSelector } from 'store/reducers/contract/reducer';
import CustomBadge from 'ui-component/elements/badge';
import CustomSelector from 'ui-component/elements/customSelector';
import AddRecieverModal from 'ui-component/pages/company/addRecieverModal/addRecieverModal';
import LoadDepositModal from 'ui-component/pages/company/loadDepositModal/loadDepositModal';
import RoleBadge from 'ui-component/pages/company/roleBadge/roleBadge';
import User from '../../ui-component/pages/company/user';
import { useAccount } from 'wagmi'
import provider from "../../contracts/provider";
import { useEffect } from 'react';
import { useState } from 'react';
import { ethers } from "ethers";
import CompanyContract from "../../contracts/CompanyContract";
import conectSigner from "../../contracts/SIGNER";


// ==============================|| SAMPLE PAGE ||============================== //
const SamplePage = () => {
    const { name, contractAdd, owner } = useSelector(contractSelector);
    const { address, isConnecting, isDisconnected } = useAccount()
    const [arrEmployee, setArrEmployee] = useState([])
    const [balance, setBalance] = useState('')
const abi = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"address","name":"_addressOwner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_who","type":"address"},{"indexed":false,"internalType":"uint256","name":"_rate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"when","type":"uint256"}],"name":"AddEmployee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_who","type":"address"},{"indexed":false,"internalType":"uint256","name":"_earned","type":"uint256"}],"name":"FinishFlow","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_whoCall","type":"address"}],"name":"Liqudation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_who","type":"address"},{"indexed":false,"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"StartFlow","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endsAt","type":"uint256"}],"name":"StreamAllFinished","type":"event"},{"anonymous":false,"inputs":[{"components":[{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"startAt","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"},{"internalType":"uint32","name":"streamId","type":"uint32"}],"indexed":false,"internalType":"struct StreamLogic.Stream","name":"stream","type":"tuple"}],"name":"StreamCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"who","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenEarned","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endsAt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"startedAt","type":"uint256"}],"name":"StreamFinished","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"CR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"EFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_totalDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"activeStreamAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"},{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"addEmployee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"addrListDebt","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"administrator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"allEmployee","outputs":[{"internalType":"address","name":"who","type":"address"},{"internalType":"uint256","name":"flowRate","type":"uint256"},{"internalType":"bool","name":"worker","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allEmployeeList","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"amountActiveStreams","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"amountEmployee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceContract","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"calculateETF","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"commonRateAllEmployee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentBalanceContract","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"currentBalanceEmployee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"currentBalanceLiquidation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"debtToEmployee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"deleteEmployee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"finish","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"finishAllStream","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"finishLiqudation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getDecimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"getStream","outputs":[{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"startAt","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"},{"internalType":"uint32","name":"streamId","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newRate","type":"uint256"}],"name":"getTokenLimitToAddNewEmployee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"getTokenLimitToStreamOne","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hoursLimitToAddNewEmployee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liqudation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"},{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"modifyRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"newStreamCheckETF","outputs":[{"internalType":"bool","name":"canOpen","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"sendOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"setToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"start","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenLimitMaxHoursPerPerson","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
const contract = new ethers.Contract(contractAdd, abi, provider)
    useEffect((()=>{
        (async()=>{
          try { 
        const decimals = (await contract.getDecimals()).toNumber()
        const bal = (await contract.currentBalanceContract()).toString()
        const cut = bal.length - decimals
        const balan = bal.slice(0, cut)
        setBalance(balan)
        const amount = (await contract.amountEmployee()).toNumber()
        let employeeArr=[]
        for (let i = 0; i < amount; i++) {
        const addrEmpl = await contract.allEmployeeList(i);
        const bal = (await contract.currentBalanceContract()).toString()
        console.log(bal)
        const employee = await contract.allEmployee(addrEmpl)
          employeeArr.push(employee)
          }
          setArrEmployee(employeeArr)
          } catch (error) {
            console.log(error)
          }
        })()
      }),[])
//      const [adNew, setAdNew] = useState('')
//      const [rate, setRate] = useState(0)
// const hadleNewUser = async() => {
//     try {
//         const contractSigner = conectSigner(contract)
//         console.log('add :', adNew, 'rate :', rate)
//         const addUser = await contractSigner.addEmployee(adNew, rate)
//         const res = await addUser.wait()
//         console.log(res)
//     } catch (error) {
//         console.log(error)
//     }
// }

    return (
        <>
            <RoleBadge content={address===owner ? 'Your role is Owner' : 'Your role is nothing'} />

            <Box
                sx={{
                    display: {
                        // xs: "block", // 100%
                        sm: 'block', //600px
                        md: 'flex' //900px
                    },
                    justifyContent: 'space-between'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1,
                        m: 5
                    }}
                >
                    <Typography variant="h1" color="red">
                        COMPANY {name}
                    </Typography>

                    {/* <Button variant="outlined" size="large"
                        sx={{
                            minWidth: "200px",
                        }}
                    >Activity history</Button> */}
                    <CustomSelector />
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        m: 5
                    }}
                >
                    <Typography variant="h2" color="common.main">
                        Avaibale balance: {balance.slice(0,5)}
                    </Typography>
                    <LoadDepositModal />
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 2,
                    mb: 3
                }}
            >
                <AddRecieverModal 
                // hadleNewUser={hadleNewUser}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Grid container spacing={3} maxWidth={800}>
                    {arrEmployee.map((item) => (
                        <User key={item[0]}  who={item[0]} rate={item[1].toString()}/>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default SamplePage;
