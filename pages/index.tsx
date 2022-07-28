import React from 'react';
import { NextPage } from 'next';
import { useForm, SubmitHandler, UseFormRegister } from 'react-hook-form';
import axios from "axios";

import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import Table from '@mui/material/Table';
import TableBody from "@mui/material/TableBody";
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Header from '../components/Header';
import FormTextField from '../components/FormTextField';
import ProgressStepper from '../components/ProgressStepper';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../style/constants';

type Input0 = {
  Name: string;
};

type Input1 = {
  ID: number;
};

type FormsProps = {
  activeStep: number;
  register: UseFormRegister<Input0> | UseFormRegister<Input1>;
};

const Forms: React.FC<FormsProps> = ({
  activeStep,
  register
}) => {
  switch (activeStep) {
    case 0:
      return  <FormTextField register={register} type="Name" isNum={false} />
    case 1:
    case 2:
    case 3:
      return  <FormTextField register={register} type="ID" isNum={true} />
    case 4:
      return <></>
    default:
      return <></>
  }
};


const Home: NextPage = () => {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const { register, handleSubmit, reset } = useForm<Input0>();
  const { register: register1, handleSubmit: handleSubmit1, reset: reset1 } = useForm<Input1>();

  console.log(activeStep)

  const handleNext = () => {
    const newStep = activeStep != 4 ? activeStep+  1 : 0
    setActiveStep(newStep);
  }

  const onSubmit0: SubmitHandler<Input0> = async (data) => {
    console.log(data);
    reset();
  };

  const onSubmit1: SubmitHandler<Input1> = async (data) => {
    console.log(data);
    reset1();
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ProgressStepper activeStep={activeStep} />
      <Container maxWidth="sm">
      <Typography variant="h5" style={{ marginTop: "30px", textAlign: "center" }} >{"Search your info"}</Typography>
        <form onSubmit={activeStep === 0 ? handleSubmit(onSubmit0) : handleSubmit1(onSubmit1)}>
          <Forms activeStep={activeStep} register={activeStep === 0 ? register : register1} />
          <Button
            style={{ marginTop: "30px" }}
            variant="contained"
            type="submit"
            color="primary"
            fullWidth
          >Submit
          </Button>
        </form>
        <Button
          style={{ marginTop: "30px" }}
          variant="contained"
          onClick={handleNext}
          color="primary"
          fullWidth
        >Next
        </Button>
      </Container>
    </ThemeProvider >
  )
}

export default Home;
