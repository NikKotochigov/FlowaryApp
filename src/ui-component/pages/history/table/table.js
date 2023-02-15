import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import BasicModal from "../../../elements/modal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Tooltip from "../../../elements/tooltip"
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import { table } from "../../../../consts/table";
import { useState } from "react";
import tableImg from 'assets/images/tableImg.gif';


const TableS = ({ rows }) => {
  const [open, setOpen] = useState(false);
const handleClickOpen = () => setOpen(prev => !prev);

  const theme = useTheme();


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
          boxShadow:     '0 2px 14px 0 rgb(32 40 45 / 30%)',
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
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    align="center"
                    sx={{
                      p: "1px",
                      // border: 1
                    }}
                  >
                    {row.status == "finished" ? (
                      <HighlightOffIcon style={{fontSize: '250%', color: 'red'}}/>
                    ) : (
                      // <img
                      //   alt="logo"
                      //   src="tableImg.gif"
                      //   width={40}
                      //   height={40}
                      // />
                      <img src={tableImg} alt="gif" width="45" />

                    )}
                  </TableCell>

                  <TableCell
                    align="left"
                    // sx={{border: 0}}
                  >
                    <Typography
                      color={row.status == 'finished' ? 'red' : 'green'}
                      sx={{ fontSize: 16 }}
                    >
                      {" "}
                      {`Stream ${row.status}`}
                    </Typography>
                    <Typography fontSize={12}>{row.time}</Typography>
                  </TableCell>

                  <TableCell
                    // align="center"
                    sx={{
                      alignItems: "center",
                      display: {
                        xs: "none", // 100%
                        sm: "none", //600px
                        md: "flex", //900px
                      },
                      gap: 2,
                      fontSize: 14,
                      p: 3,
                      // border: 1
                    }}
                  >
                    <img
                      alt="coin"
                      src={`https://assets.coincap.io/assets/icons/${row.token.toLowerCase()}@2x.png`}
                      width={30}
                      height={30}
                    />
                    {row.token.toUpperCase()}
                  </TableCell>

                  <TableCell
                    align="right"
                    sx={{
                      pt: 0.5,
                      // border:0
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
                          seed={jsNumberForAddress(row.from)}
                        />
                        {row.from.toString().slice(0, 5) +
                          "..." +
                          row.from.toString().slice(38)}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      pt: 3,
                    }}
                  >
                    <Tooltip title={"see tx on Etherscan"}>
                      <a
                        href={`https://goerli.etherscan.io/tx/${row.txhash}`}
                        target="_blank"
                      >
                        <OpenInNewOutlinedIcon />
                      </a>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
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
                  </TableCell>
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