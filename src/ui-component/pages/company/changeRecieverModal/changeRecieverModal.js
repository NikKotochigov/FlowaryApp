import { useState } from 'react';
import { useSelector } from 'react-redux';
import conectSigner from "../../../../contracts/SIGNER";
import { ethers } from "ethers";
import provider from "../../../../contracts/provider";
import { contractSelector } from "../../../../store/reducers/contract/reducer";
import { Box, Button, CardMedia, TextField } from '@mui/material';
import CustomModal from '../../../elements/customModal';


function ChangeRecieverModal({who}) {
    const [rate, setRate] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const handleOnClick = () => {
        setIsOpen((prev) => !prev);
    };

    const handleRateChangeInput = (e) => {
        setRate(e.target.value);
    };

const { contractAdd } = useSelector(contractSelector);
const abi = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"address","name":"_addressOwner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_who","type":"address"},{"indexed":false,"internalType":"uint256","name":"_rate","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"when","type":"uint256"}],"name":"AddEmployee","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_who","type":"address"},{"indexed":false,"internalType":"uint256","name":"_earned","type":"uint256"}],"name":"FinishFlow","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_whoCall","type":"address"}],"name":"Liqudation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_who","type":"address"},{"indexed":false,"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"StartFlow","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endsAt","type":"uint256"}],"name":"StreamAllFinished","type":"event"},{"anonymous":false,"inputs":[{"components":[{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"startAt","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"},{"internalType":"uint32","name":"streamId","type":"uint32"}],"indexed":false,"internalType":"struct StreamLogic.Stream","name":"stream","type":"tuple"}],"name":"StreamCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"who","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenEarned","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"endsAt","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"startedAt","type":"uint256"}],"name":"StreamFinished","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"CR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"EFT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_totalDebt","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"activeStreamAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"},{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"addEmployee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"addrListDebt","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"administrator","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"allEmployee","outputs":[{"internalType":"address","name":"who","type":"address"},{"internalType":"uint256","name":"flowRate","type":"uint256"},{"internalType":"bool","name":"worker","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"allEmployeeList","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"amountActiveStreams","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"amountEmployee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"balanceContract","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"calculateETF","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_newAdmin","type":"address"}],"name":"changeAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"commonRateAllEmployee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"currentBalanceContract","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"currentBalanceEmployee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"currentBalanceLiquidation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"debtToEmployee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"deleteEmployee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"finish","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"finishAllStream","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"finishLiqudation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getDecimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"getStream","outputs":[{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"startAt","type":"uint256"},{"internalType":"bool","name":"active","type":"bool"},{"internalType":"uint32","name":"streamId","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newRate","type":"uint256"}],"name":"getTokenLimitToAddNewEmployee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"getTokenLimitToStreamOne","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"hoursLimitToAddNewEmployee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liqudation","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"},{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"modifyRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"newStreamCheckETF","outputs":[{"internalType":"bool","name":"canOpen","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_newOwner","type":"address"}],"name":"sendOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"setToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_who","type":"address"}],"name":"start","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenLimitMaxHoursPerPerson","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
const contract = new ethers.Contract(contractAdd, abi, provider)

const handleRateChange = async() => {
    try {
     const contractSigner = conectSigner(contract)
     handleOnClick()
     const changeRate = await contractSigner.modifyRate(who, rate)
        const res = await changeRate.wait()
        console.log(res)
    } catch (error) {
        console.log(error)
    }
 }

 const handleDelete = async() => {
    try {
     const contractSigner = conectSigner(contract)
     handleOnClick()
     const deleteUser = await contractSigner.deleteEmployee(who)
        const res = await deleteUser.wait()
        console.log(res)
    } catch (error) {
        console.log(error)
    }
 }

    return (
        <div>
            <CustomModal handleClickOpen={handleOnClick} open={isOpen}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        width: 400
                    }}
                >
                    <CardMedia component="img" height="160" image="/static/images/stream.jpg" alt="stream picture" />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <TextField
                            value={rate}
                            type="number"
                            label="Enter new rate per hour"
                            variant="outlined"
                            onChange={handleRateChangeInput}
                        />
                        <Button
                            variant="outlined"
                            // sx={{ width: 170, }}
                            onClick={handleRateChange}
                        >
                            Set new rate
                        </Button>
                    </Box>

                    <Button
                        variant="outlined"
                        // sx={{ width: 170, }}
                        onClick={handleDelete}
                    >
                        Delete reciever
                    </Button>
                </Box>
            </CustomModal>
        </div>
    );
}

export default ChangeRecieverModal;
