import React from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

type Props = {
  activeStep: number;
}

const getSteps = ():string[] =>{
  return ['find your user', 'find your village and your reputation in there', 'find the number of your animal','find the number of your strong animal', 'find users with ender chest & storage'];
};

const ProgressStepper: React.FC<Props> = ({activeStep}) => {
  const steps = getSteps();

  return(
    <Box m={{ width: '100%' }} style={{
      marginTop: "50px"
    }}>
    <Stepper activeStep={activeStep} alternativeLabel>
    {steps.map((label, index) => {
      return (
        <Step key={index}>
          <StepLabel>{label}</StepLabel>
        </Step>
      );
    })}
  </Stepper>
  </Box>
  )
};

export default ProgressStepper;