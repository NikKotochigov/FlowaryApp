import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createCompany } from 'utils/createCompany';
import { LoadingButton } from '@mui/lab';
import { Box, TextField, Typography } from '@mui/material';
import getRecordByName from 'utils/dataBase/getRecordByName';

function FirstStep({ setActiveStep }) {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [existedName, setExistedName] = useState('');
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleAddCompany = async () => {
        const record = await getRecordByName(name);
        if (record) {setExistedName(`Company with name: "${name}" already exists. Choose another name, pls`);
        setTimeout(()=>setExistedName(''), 3000)}
        else createCompany(name, dispatch, setLoading, setActiveStep);
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    mt: 3,
                    alignItems:'center',
                    width: '100%'
                }}
            >
              <Typography variant='h4' 
      color={'primary'} align='justify'
      >On this step you have to come up with a name of your Company and after it your have to sign transaction, which would create contract on Goerly network</Typography>
        
                <TextField 
                sx={{ width: 270 }}
                value={name} 
                type="text" 
                label="Company name" 
                size="small" 
                onChange={handleNameChange} />
                    <LoadingButton
                        loading={loading}
                        loadingIndicator="Creating..."
                        variant="outlined"
                        sx={{ width: 170 }}
                        onClick={handleAddCompany}
                    >
                        Create company
                    </LoadingButton>
                    <Typography textAlign={'center'}
                    variant="h3" color={'red'}>
                        {existedName}
                    </Typography>
                </Box>
        </>
    );
}

export default FirstStep;
