import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../style/constants';


type Props = {
  register: UseFormRegister<any>;
};


const CheckBox: React.FC<Props> = ({
  register
}) => {
  return (
    <ThemeProvider theme={theme}>
      <FormGroup>
        <FormControlLabel 
        {...register("Ender_Chest")}
        control={<Checkbox defaultChecked />} label="Ender Chest" />
        <FormControlLabel 
        {...register("User_Storage")}
        control={<Checkbox />} label="User Storage" />
      </FormGroup>
    </ThemeProvider>
  )
};

export default CheckBox;