import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useContract from "contracts/prepareContract";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { contractSelector } from "store/reducers/contract/reducer";
import AvatarChip from "ui-component/elements/chip";
import Toolkit from "ui-component/elements/tooltip";
import copyTextToClipboard from "utils/copyPast";
import AddOutsourceModal from "./addOutsourceModal";
import OutsourceCard from "./outsourceCard";
import { v4 as uuidv4 } from 'uuid';
import TableOutsource from "./tableOutsource";
import HeaderCompanyBalance from "ui-component/elements/headerCompanyBalance";
import { useAccount } from 'wagmi';
import OutsourceMain from "./outsourceMain";
import OutsourceEmployee from "./outsourceEmployee";
import { useState } from "react";
import WalletPointer from "ui-component/elements/walletPointer";
import Sorry from "ui-component/elements/sorry";

const Outsource = () => {
    const { address, owner, admin, arrOutsource } = useSelector(contractSelector);
    const { address: addressWallet } = useAccount();
    const [isEmployee, setIsEmployee] = useState(false);
    const arrOutsorceEmployee = arrOutsource.filter(i => i.who === addressWallet).filter(i => i.status !=3)
    useEffect(() => {
        const findedEmployee = arrOutsource.find((item) => item.who === addressWallet);
        setIsEmployee(findedEmployee != undefined);
    }, [arrOutsource, addressWallet]);
return ( <>
{
            address === '0x3598f3a5A8070340Fde9E9cEcaF6F1F0129b323a'
            ? <OutsourceMain />
            :
(addressWallet ? (
                addressWallet == owner || addressWallet == admin ? (
                    <OutsourceMain />
                ) : isEmployee ? (
                    <OutsourceEmployee arrOutsorceEmployee={arrOutsorceEmployee} />
                ) : (<Sorry />)
            ) : (<WalletPointer />))}



</>)}
 
export default Outsource;
