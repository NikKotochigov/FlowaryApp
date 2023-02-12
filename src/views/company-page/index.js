import { Box, Button, Typography } from "@mui/material";

// ==============================|| SAMPLE PAGE ||============================== //
const SamplePage = () => {

    return (
        <>
            <Box
                sx={{
                    display: {
                        // xs: "block", // 100%
                        sm: "block", //600px
                        md: "flex", //900px
                    },
                    justifyContent: "space-between",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        m: 7
                    }}
                >
                    <Typography variant="h3" color="error.main">
                        COMPANY page
                    </Typography>
                    <Button variant="outlined" size="large"
                        sx={{
                            minWidth: "200px",
                        }}
                    >Activity history</Button>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        m: 7
                    }}
                >
                    <Typography variant="h4" color="common.main">
                        Avaibale balance: 1000$</Typography>
                    {/* <LoadDepositModal /> */}
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mb: 3,
                }}
            >
                {/* <AddRecieverModal /> */}
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {/* <Grid container spacing={3} maxWidth={800}>
            {goods.map((item) => (
                <User key={item.id} {...item} check={check} />
            ))}
        </Grid> */}
            </Box>
        </>

    );
};

export default SamplePage;
