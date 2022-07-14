import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import TextField from '@mui/material/TextField';

type Props = {
  register: UseFormRegister<any>;
  type: string;
  isNum: boolean;
};

const FormTextField: React.FC<Props> = ({
  register,
  type,
  isNum
}) => {
  return (
    <TextField
      {...register(type)}
      color="secondary"
      label={type}
      type={isNum?"number":"text"}
      variant="standard"
      margin="normal"
      required
      fullWidth
    />
  )
};


export default FormTextField;
