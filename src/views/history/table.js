import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import BasicModal from "../../ui-component/elements/modal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Toolkit from "../../ui-component/elements/tooltip"
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import { useState } from "react";
import tableImg from 'assets/images/tableImg.gif';
import dayjs, { Dayjs } from "dayjs";
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { contractSelector } from '../../store/reducers/contract/reducer';
import { IconArrowBigLeftLine, IconArrowBigRightLine, IconRun } from "@tabler/icons";


const TableS = ({ rows, arrayItem }) => {
  const [open, setOpen] = useState(false);
const handleClickOpen = () => setOpen(prev => !prev);
const { symbolToken, decimalsToken } = useSelector(contractSelector);

  return (<>

    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 10,
      }}
    >
      <TableContainer
        sx={{
          boxShadow: "0 2px 14px 0px rgb(41 109 198 / 80%)",
          borderRadius: 2,
          maxWidth: 850,
          background: 'white'
        }}
      >
        <Table aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <>
                <TableRow
                  key={uuidv4()}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    align="right"
                    sx={{
                      p: "1px",
                    }}
                  >
               {arrayItem == '1' 
               ? (row.name == "Finished" || row.name == 'Finish All') 
                      ? (
                      <HighlightOffIcon style={{fontSize: '250%', color: 'red'}}/>
                    ) : (
                      <img src={tableImg} alt="gif" width="45" />

                    )
               : (row.name == 'Deposit' ? <IconArrowBigRightLine color='green' size={28}/> : <IconArrowBigLeftLine color='red' size={28}/>)
               }
                  </TableCell>

                  <TableCell
                    align="center"
                  >
                    <Typography
                      color={row.name == 'Finished' || row.name == 'Withdraw' ? 'red' : 'green'}
                      sx={{ fontSize: 16 }}
                    >
                       {arrayItem == '1' ? `Stream is ${row.name}` : row.name}
                    </Typography>
                    <Typography fontSize={12}>
                      {dayjs.unix(row.time).format('HH:mm DD/MM/YYYY')}
                       </Typography>
                  </TableCell>

                  <TableCell
                    sx={{
                      justifyContent: "center",
                      display: {
                        xs: "none", // 100%
                        sm: "none", //600px
                        md: "flex", //900px
                      },
                      py: 3.5,
                    }}
                  >
{arrayItem == '1' 
? (row.name == 'Finished' ? Number(row.earned).toFixed(2) : <IconRun color='green'/>) 
: Number(row.amount).toFixed(2)} {symbolToken}
    
                  </TableCell>
                  {arrayItem == '1' &&
                  <TableCell
                    align="center"
                    sx={{
                      pt: 0.5,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography fontSize={12}>To:</Typography>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          gap: 1,
                        }}
                      >
                        <Jazzicon
                          diameter={30}
                          seed={jsNumberForAddress(row.addr)}
                        />
                        {row.addr.slice(0, 5) +
                          "..." +
                          row.addr.slice(38)}
                      </Box>
                    </Box>
                  </TableCell>}
                  {arrayItem && <>
                  <TableCell
                    align="center"
                    sx={{
                      pt: 3,
                    }}
                  >
                    <Toolkit title={"see tx on Etherscan"}>
                      <a
                        href={`https://goerli.etherscan.io/tx/${row.txHash}`}
                        target="_blank"
                      >
                        <OpenInNewOutlinedIcon />
                      </a>
                    </Toolkit>
                  </TableCell>

                  {/* <TableCell align="center"
                                 sx={{
                                  display: {
                                          xs: "none", // 100%
                                          sm: "none", //600px
                                          md: "flex", //900px
                                        },
                                 }}       
                  >
                    <BasicModal 
                    nameModal={"Info"}
                    open={open}
                    handleClickOpen={handleClickOpen}
          >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 2,
                          width: 400,
                        }}
                      >
                        <Typography>Additional info</Typography>
                      </Box>
                    </BasicModal>
                  </TableCell> */}
           </> }
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

  </>);
}

export default TableS;