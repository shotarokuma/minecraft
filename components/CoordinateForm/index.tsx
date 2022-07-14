import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const CoordinateForm = () => {

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TextField variant="outlined"
          margin="normal"
          label="x"
          color="secondary"
          type="number"
          required
        />
      </Grid>
      <Grid item xs={4}>
        <TextField variant="outlined"
          margin="normal"
          label="y"
          color="secondary"
          type="number"
          required />
      </Grid>
      <Grid item xs={4}>
        <TextField variant="outlined"
          margin="normal"
          label="z"
          color="secondary"
          type="number"
          required />
      </Grid>
    </Grid>)
};

export default CoordinateForm;
