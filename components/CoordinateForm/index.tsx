import React from 'react';
import { UseFormRegister } from 'react-hook-form';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

type Props = {
  register: UseFormRegister<any>;
  type: string;
};

const CoordinateForm:React.FC<Props> = ({
  register,
  type
}) => {
  const typeX = type + 'X';
  const typeY = type + 'Y';
  const typeZ = type + 'Z';
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField 
          {...register(typeX)}
          variant="outlined"
          margin="normal"
          label={typeX}
          color="secondary"
          type="number"
          required
        />
      </Grid>
      <Grid item xs={4}>
        <TextField 
          {...register(typeY)}
          variant="outlined"
          margin="normal"
          label={typeY}
          color="secondary"
          type="number"
          required />
      </Grid>
      <Grid item xs={4}>
        <TextField 
           {...register(typeZ)}
          variant="outlined"
          margin="normal"
          label={typeZ}
          color="secondary"
          type="number"
          required />
      </Grid>
    </Grid>)
};

export default CoordinateForm;
