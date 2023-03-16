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

const Outsource = () => {
    const { name, balance, address, symbolToken, arrOutsource, decimalsToken } = useSelector(contractSelector);

const arrOutsorceAlive = arrOutsource.filter(i => i.status !=3)
const arrOutsorceFinished = arrOutsource.filter(i => i.status ===3)

console.log("MAssiv AUTSORSA", arrOutsorceFinished)
return ( <>
    <HeaderCompanyBalance />

                    <Box sx={{ display: 'flex', justifyContent: 'center', m:5}}>
<AddOutsourceModal />
</Box>
<Box
sx={{ display: 'flex', justifyContent: 'center', m:5}}>
<Grid container spacing={3} maxWidth={600}>
{arrOutsorceAlive.map(({taskName, wage, who, startDate, deadline, id, status}) => (
                                    <OutsourceCard 
                                    key={uuidv4()} 
                                    who={who} 
                                    wage={wage} 
                                    taskName={taskName}
                                    startDate={startDate}
                                    deadline={deadline}
                                    id={id}
                                    status={status} />
                                ))}
                                </Grid></Box>

                                <TableOutsource 
                                arrOutsorceFinished={arrOutsorceFinished}
                                />

    </> );
}
 
export default Outsource;
