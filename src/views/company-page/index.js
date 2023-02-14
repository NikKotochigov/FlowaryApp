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
// ==============================|| SAMPLE PAGE ||============================== //
const SamplePage = () => {
    const { name } = useSelector(contractSelector);

    return (
        <>
            <RoleBadge content={'your role: Admin'} />

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
                        COMPANY name
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
                        Avaibale balance: 1000$
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
                <AddRecieverModal />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Grid container spacing={3} maxWidth={800}>
                    {goods.map((item) => (
                        <User key={item.id} {...item} />
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default SamplePage;
