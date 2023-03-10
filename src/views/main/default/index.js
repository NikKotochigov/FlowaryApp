
import {
  Box,
  Button,
  Toolbar,
} from "@mui/material";
import BasicModal from "../../../ui-component/elements/modal";
import { useState } from "react";
import { useAccount } from 'wagmi'
import connectContract from "contracts/erc20";
import { useNavigate } from "react-router-dom";
import CompanyCreateStepper from "../../../views/main/Steps/companyCreateStepper";
import CustomPopover from "../../../ui-component/elements/customPopover";
import { useDispatch } from "react-redux";
import companyMatrix from '../../../assets/images/companyMatrix.png'
import companyExists from '../../../assets/images/companyExists.png'
import SelectAutoComplete from "ui-component/pages/main/selectAutoComplete/selectAutoComplete";
import { LoadingButton } from "@mui/lab";

const Main = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(prev => !prev);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { address } = useAccount()
  const navigate = useNavigate();

  const handleConnectCompany = async () => {
    setLoading(true)
    await connectContract(value.company, dispatch)
    navigate("/personal-page")
    setLoading(false)
  };
  const handleCreateCompany = () => {
    console.log("hello");
    setIsCreateOpen(true);
  }
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const id = open ? 'simple-popover' : undefined;
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <>
      {isCreateOpen ? <CompanyCreateStepper />
        : <>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 6
          }}>
            <img src={companyMatrix} alt="gif" width="445" />
          </Box>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Box sx={{ display: 'flex', gap: 5 }}>
              <Button variant="contained"
                sx={{
                  background: 'red',
                  fontSize: '30px',
                }}
                size='large'
                onClick={address ? handleCreateCompany : handleOpenPopover}>
                Create company
              </Button>
              <BasicModal
                fontSize='30px'
                nameModal={"Company exist"}
                open={open}
                handleClickOpen={address ? handleClickOpen : handleOpenPopover}
                variant='contained'
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    width: 400
                  }}
                >
                  <img src={companyExists} alt="gif" width="145" />
                  <SelectAutoComplete
                    value={value}
                    setValue={setValue}
                  />
                  <LoadingButton
                    size="small"
                    onClick={handleConnectCompany}
                    loading={loading}
                    loadingIndicator="Loading???"
                    variant="outlined"
                  >
                    <span>Choose company</span>
                  </LoadingButton>
                </Box>
              </BasicModal>
              <CustomPopover
                text={'Connect wallet, pls'}
                handleOpenPopover={handleOpenPopover}
                anchorEl={anchorEl}
                id={id}
                setAnchorEl={setAnchorEl}
              />
            </Box>
          </Toolbar>
        </>}
    </>
  );
};

export default Main;