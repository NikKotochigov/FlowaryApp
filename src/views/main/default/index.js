import { Box, Button, Grid, TextField, Toolbar, Typography } from '@mui/material';
import BasicModal from '../../../ui-component/elements/modal';
import { useState } from 'react';
import { useAccount } from 'wagmi';
import connectContract from 'contracts/erc20';
import { useNavigate, Navigate } from 'react-router-dom';
import CompanyCreateStepper from '../../../views/main/Steps/companyCreateStepper';
import CustomPopover from '../../../ui-component/elements/customPopover';
import { useDispatch } from 'react-redux';
import companyMatrix from '../../../assets/images/companyMatrix.png';
import existCompany from '../../../assets/images/existCompany.png';
import SelectAutoComplete from 'ui-component/pages/main/selectAutoComplete/selectAutoComplete';
import { LoadingButton } from '@mui/lab';
import useContract from 'contracts/prepareContract';
import getRecordByName from 'utils/dataBase/getRecordByName';
import ReactCardFlip from 'react-card-flip';
import Logo3 from 'assets/images/Logo3.png';

const Main = ({ setApp }) => {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen((prev) => !prev);
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [add, setAdd] = useState('');

    const handleConnectCompany = async () => {
        const record = await getRecordByName(add);
        console.log(record);
        if (record) {
            setLoading(true);
            await connectContract(record.address, dispatch);
            navigate('/dashboard');
            setApp(true);
            setLoading(false);
        } else setText('Company with such name doesnt exist');
        setTimeout(() => setText(''), 3000);
    };
    const handleConnectDemo = async () => {
            setIsLoading(true);
            await connectContract('0x3598f3a5A8070340Fde9E9cEcaF6F1F0129b323a', dispatch);
            navigate('/dashboard');
            setApp(true);
            setIsLoading(false);
    };

    const handleCreateCompany = () => setIsCreateOpen((prev) => !prev);

    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const [isFlipped, setIsFlipped] = useState(false);
    const handleClickFlip = () => {
        setIsFlipped(true);
    };
    return (
        <>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" flipSpeedBackToFront={2} flipSpeedFrontToBack={2}>
            <Grid 
             container
             spacing={0}
             direction="column"
             alignItems="center"
             justifyContent="center"
             style={{ minHeight: '100vh' }}
           >
           
             <Grid 
             //item xs={3}
             sx={{
                border:1,
            borderRadius: 4,
            width: '700px',
            height: '500px',
            p: 2,
            justifyItems:'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
            }}
             >
         <img src={Logo3} alt="logo" width="570" />
                    <Button variant='outlined' size='large'
                    onClick={handleClickFlip}>START</Button>
                </Grid>  
</Grid>  
                

                <Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 6
                    }}
                >
                    <img src={companyMatrix} alt="gif" width="445" />
                </Box>

                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Box sx={{ display: 'flex', gap: 3 }}>
                        <BasicModal
                            sx={{ border: 1 }}
                            fontSize="30px"
                            backgroundColor="red"
                            nameModal={'Create company'}
                            open={isCreateOpen}
                            handleClickOpen={handleCreateCompany}
                            variant="contained"
                        >
                            <CompanyCreateStepper setApp={setApp} />
                        </BasicModal>

                        <BasicModal
                            fontSize="30px"
                            nameModal={'Company exist'}
                            open={open}
                            handleClickOpen={handleClickOpen}
                            variant="contained"
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 2,
                                    width: 400
                                }}
                            >
                                <img src={existCompany} alt="gif" width="445" />

                                <TextField
                                    fullWidth
                                    label="Address of your company"
                                    variant="outlined"
                                    onChange={(event) => setAdd(event.target.value)}
                                />

                                <LoadingButton
                                    size="small"
                                    onClick={handleConnectCompany}
                                    loading={loading}
                                    loadingIndicator="Loading…"
                                    variant="outlined"
                                >
                                    <span>Choose company</span>
                                </LoadingButton>
                                <Typography variant="h4" color="red">
                                    {text}
                                </Typography>
                            </Box>
                        </BasicModal>

                    </Box>
                </Toolbar>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                <LoadingButton
                                    size="large"
                                    onClick={handleConnectDemo}
                                    loading={isLoading}
                                    loadingIndicator="Loading…"
                                    variant="outlined"
                                    sx={{ display: 'flex', justifySelf: 'center', fontSize: '30px', minWidth: '190px', mt: 3 }}

                                >
                                    DEMO
                                </LoadingButton>

                    {/* <Button
                        variant="outlined"
                        sx={{ display: 'flex', justifySelf: 'center', fontSize: '30px', minWidth: '190px', mt: 3 }}
                        size="large"
                        onClick={}
                    >
                        DEMO
                    </Button> */}
                </Box>

                </Box>
            </ReactCardFlip>

        </>
    );
};

export default Main;
