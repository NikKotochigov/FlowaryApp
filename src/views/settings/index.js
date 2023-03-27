import { Box, Button, Card, CardMedia, Popover, TextField, Toolbar, Typography, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import useContract from '../../contracts/prepareContract';
import { useDispatch, useSelector } from 'react-redux';
import { contractSelector } from 'store/reducers/contract/reducer';
import SettingsInfo from './settingsInfo';
import WalletPointer from 'ui-component/elements/walletPointer';

const Settings = () => {
    const { address: addressWallet } = useAccount();


    const { address, owner, admin } = useSelector(contractSelector);




    return (
        <>{
            address === '0x3598f3a5A8070340Fde9E9cEcaF6F1F0129b323a'
            ? <SettingsInfo />
            :
            (addressWallet ? (
                addressWallet == owner || addressWallet == admin ? (
<SettingsInfo />
                ) : (
                    <Sorry />
                )
            ) : (
                <WalletPointer />
            ))}
        </>
    );
};

export default Settings;

