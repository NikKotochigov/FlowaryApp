import { useState } from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import FirstStep from './firstStep';
import SecondStep from './secondStep';
import ThirdStep from './thirdStep';

const steps = ['Create company', 'Set token', 'Set admin'];

export default function CompanyCreateStepper() {
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
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed!
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                    </Box>
                </>
            ) : (
                <>
                    {activeStep === 0 && <FirstStep setActiveStep={setActiveStep} />}
                    {activeStep === 1 && <SecondStep setActiveStep={setActiveStep} />}
                    {activeStep === 2 && <ThirdStep setActiveStep={setActiveStep} />}
                </>
            )}
        </Box>
    );
}
