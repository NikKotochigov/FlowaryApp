import { Box, Button, Card, CardMedia, Popover, TextField, Toolbar, Typography, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import useContract from '../../contracts/prepareContract';
import LoadDepositModal from 'ui-component/pages/company/loadDepositModal/loadDepositModal';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { contractSelector } from 'store/reducers/contract/reducer';
import { setOwner, setAdmin, setHl } from '../../store/reducers/contract/reducer';
import HeaderCompanyBalance from 'ui-component/elements/headerCompanyBalance';
import LiquidationModal from 'ui-component/elements/liquidationModal';
import Sorry from 'ui-component/elements/sorry';
import WalletPointer from 'ui-component/elements/walletPointer';

const Settings = () => {
    const { address: addressWallet } = useAccount();

    const { contractSigner } = useContract();

    const [addrAdmin, setAddrAdmin] = useState('');
    const [addrOwner, setAddrOwner] = useState('');
    const [hlLimit, sethlLimit] = useState();

    const [loading, setLoading] = useState(false);
    const [loadingAdmin, setLoadingAdmin] = useState(false);
    const [loadingBuffer, setLoadingBuffer] = useState(false);

    const { liquidation, owner, admin, hl } = useSelector(contractSelector);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    const handleOnClick = () => {
        setIsOpen((prev) => !prev);
    };

    //-----------------------------  Administration FUNC -----------------
    const handleSetAdmin = async () => {
        try {
            setLoadingAdmin(true);
            const tx = await contractSigner.changeAdmin(addrAdmin);
            await tx.wait();
            console.log('DONE!!!!');
            dispatch(setAdmin(addrAdmin));
            setLoadingAdmin(false);
        } catch (error) {
            console.log(error);
            setLoadingAdmin(false);
        }
    };

    const handleSetOwner = async () => {
        try {
            setLoading(true);
            const tx = await contractSigner.sendOwnership(addrOwner);
            await tx.wait();
            console.log('DONE OWNER!!!!');
            dispatch(setOwner(addrOwner));
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };
    //-----------------------------  Buffer FUNC -----------------
    const handleBufferLimit = async () => {
        try {
            setLoadingBuffer(true);
            const tx = await contractSigner.setHLStartStream(hlLimit * 3600);
            await tx.wait();
            console.log('DONE OWNER!!!!');
            dispatch(setHl(hlLimit * 3600));
            setLoadingBuffer(false);
        } catch (error) {
            console.log(error);
            setLoadingBuffer(false);
        }
    };

    return (
        <>
            {addressWallet ? (
                addressWallet == owner || addressWallet == admin ? (
                    <>
                        <HeaderCompanyBalance />
                        <Typography variant="h1" color="primary" textAlign="center" m="30px">
                            Administration function
                        </Typography>

                        <Typography variant="h3" color="secondary">
                            Current Owner:{' '}
                        </Typography>
                        <Typography variant="h4" color="secondary">
                            {owner}
                        </Typography>
                        <Box sx={{ m: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
                            <TextField
                                onChange={(e) => {
                                    setAddrOwner(e.target.value);
                                }}
                                type="text"
                                label="address of new Owner"
                                sx={{ minWidth: '300px', maxHeight: '50px' }}
                            />

                            <LoadingButton
                                size="small"
                                onClick={handleSetOwner}
                                loading={loading}
                                loadingIndicator="Setting..."
                                variant="outlined"
                            >
                                <span>Set new Owner</span>
                            </LoadingButton>
                        </Box>

                        <Typography variant="h3" color="secondary" mt="30px">
                            Current Admin:{' '}
                        </Typography>
                        <Typography variant="h4" color="secondary">
                            {admin}
                        </Typography>

                        <Box sx={{ m: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
                            <TextField
                                onChange={(e) => {
                                    setAddrAdmin(e.target.value);
                                }}
                                type="text"
                                label="address of new Admin"
                                sx={{ minWidth: '300px', maxHeight: '50px' }}
                            />

                            <LoadingButton
                                size="small"
                                onClick={handleSetAdmin}
                                loading={loadingAdmin}
                                loadingIndicator="Setting..."
                                variant="outlined"
                            >
                                <span>Set new Admin</span>
                            </LoadingButton>
                        </Box>

                        <Typography variant="h3" color="secondary" mt="30px">
                            Current Buffer: {hl / 60 / 60} hours
                        </Typography>

                        <Typography variant="h4" color="secondary">
                            🤷‍♀️ Restriction to start new stream. If there is not enough funds in smart contract it wont start new stream
                        </Typography>

                        <Box sx={{ m: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
                            <TextField
                                onChange={(e) => {
                                    sethlLimit(e.target.value);
                                }}
                                type="number"
                                InputProps={{ inputProps: { min: 0 } }}
                                label="Set new number of hours"
                                sx={{ minWidth: '300px', maxHeight: '50px' }}
                            />

                            <LoadingButton
                                size="small"
                                onClick={handleBufferLimit}
                                loading={loadingBuffer}
                                loadingIndicator="Setting..."
                                variant="outlined"
                            >
                                <span>Set new buffer</span>
                            </LoadingButton>
                        </Box>

                        <Typography variant="h2" color="secondary" mt="30px">
                            Payment
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, m: 1 }}>
                            <LoadDepositModal />
                        </Box>

                        <Typography variant="h2" color="secondary" mt="30px">
                            Liquidation
                        </Typography>
                        <Typography variant="h4" color="secondary">
                            🤷‍♀️ Happed if smart contract went bankrupt, and cant pay wages.
                        </Typography>
                        <Typography variant="h4" color="secondary" mb="14px">
                            Status : {liquidation ? 'Liquidation' : '👌 Active'}
                        </Typography>
                        {liquidation && <LiquidationModal isOpen={isOpen} handleOnClick={handleOnClick} />}
                    </>
                ) : (
                    <Sorry />
                )
            ) : (
                <WalletPointer />
            )}
        </>
    );
};

export default Settings;
