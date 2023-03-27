import { useState } from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import FirstStep from './firstStep';
import SecondStep from './secondStep';
import ThirdStep from './thirdStep';
import { Button } from '@mui/material';
import ZeroStep from './zeroStep';

const steps = ['Connect Wallet', 'Create company', 'Set token', 'Set admin'];

export default function CompanyCreateStepper({setApp}) {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => {
                    return (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <>
            <Box sx={{ display: 'flex', flexDirection: 'column', m: 2, alignItems: 'center'}}>
                    <Typography sx={{ m: 2 }} variant='h3' color='primary'>
                        All steps completed!
                    </Typography>
 <Button 
 onClick={() => setApp(true)} 
 variant='outlined'
 sx={{width:'200px'}}
 >
    Go to work!
    </Button>
                    </Box>
                </>
            ) : (
                <>
                    {activeStep === 0 && <ZeroStep setActiveStep={setActiveStep} />}
                    {activeStep === 1 && <FirstStep setActiveStep={setActiveStep} />}
                    {activeStep === 2 && <SecondStep setActiveStep={setActiveStep} />}
                    {activeStep === 3 && <ThirdStep setActiveStep={setActiveStep} />}
                </>
            )}
        </Box>
    );
}
