import React from 'react';
import { NextPage } from 'next';
import Image from 'next/image'
import { useForm, SubmitHandler, UseFormRegister } from 'react-hook-form';
import axios from "axios";

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import TableContainer from "@mui/material/TableContainer";
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
import { User } from './user'
import { animals } from '../img';

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

type Host_In = {
  Reputation: string;
  CoordinateX: number;
  CoordinateY: number;
  CoordinateZ: number;
}

const Forms: React.FC<FormsProps> = ({
  activeStep,
  register
}) => {
  switch (activeStep) {
    case 0:
      return <FormTextField register={register} type="Name" isNum={false} />
    case 1:
    case 2:
    case 3:
      return <FormTextField register={register} type="ID" isNum={true} />
    default:
      return <></>
  }
};


const Home: NextPage = () => {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const { register, handleSubmit, reset } = useForm<Input0>();
  const { register: register1, handleSubmit: handleSubmit1, reset: reset1 } = useForm<Input1>();
  const [user, setUser] = React.useState<User | null>(null);
  const [host, setHost] = React.useState<Host_In[] | null>(null);
  const [animalNum, setAnimalNum] = React.useState<number | null>(null);
  const [strongNum, setStrongNum] = React.useState<number | null>(null);
  const [users, setUsers] = React.useState<User[] | null>(null);



  const handleNext = () => {
    const newStep = activeStep != 4 ? activeStep + 1 : 0
    setActiveStep(newStep);
  }

  const onSubmit0: SubmitHandler<Input0> = async (data) => {
    axios.get('/api/user/select', { params: { ...data } })
      .then((res) => {
        res.data.length !== 0 ? setUser(res.data[0]) : setUser(null);
      })
      .catch(err => alert("invalid input"));
    reset();
  };

  const getEndPoint = (): string => {
    switch (activeStep) {
      case 1:
        return '/api/user/join';
      case 2:
        return '/api/user/aggregation';
      case 3:
        return '/api/user/nestedAggregation';
      default:
        return '';
    }
  };

  const onSubmit1: SubmitHandler<Input1> = async (data) => {
    axios.get(getEndPoint(), { params: { ...data } })
      .then((res) => {
        switch (activeStep) {
          case 1:
            setHost(res.data);
            break;
          case 2:
            setAnimalNum(res.data[0]['COUNT(*)']);
            break;
          case 3:
            setStrongNum(res.data[0]['COUNT(*)']);
            break;
        }
      })
      .catch(err => alert("invalid input"));
    reset1();
  };

  React.useEffect(() => {
    if (activeStep !== 4) return;
    axios.get('/api/user/division')
      .then((res) => setUsers(res.data))
      .catch(err => alert("invalid input"));
  }, [activeStep])

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <ProgressStepper activeStep={activeStep} />
      <Container maxWidth="sm">
        <Typography variant="h5" style={{ marginTop: "30px", textAlign: "center" }} >{"Search your info"}</Typography>
        <form onSubmit={activeStep === 0 ? handleSubmit(onSubmit0) : handleSubmit1(onSubmit1)}>
          <Forms activeStep={activeStep} register={activeStep === 0 ? register : register1} />
          {activeStep !== 4 && (
            <Button
              style={{ marginTop: "30px" }}
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
            >Submit
            </Button>
          )}
        </form>
        {activeStep !== 4 && (
          <Button
            style={{ marginTop: "30px" }}
            variant="contained"
            onClick={handleNext}
            color="primary"
            fullWidth
          >Next
          </Button>
        )}
      </Container>
      <Container component="main" maxWidth="md">
        {(activeStep === 0 && user !== null) && (
          <Paper sx={{ width: '100%' }} elevation={3} style={{ marginTop: "100px" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" width="20px">
                      ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Coordinate</TableCell>
                    <TableCell>Food Bar</TableCell>
                    <TableCell>Health</TableCell>
                    <TableCell>Spawn Point</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow hover>
                    <TableCell align="left" width="20px">
                      {user.ID}
                    </TableCell>
                    <TableCell>{user.Name}</TableCell>
                    <TableCell >{[user.CoordinateX, user.CoordinateY, user.CoordinateZ].toString()}</TableCell>
                    <TableCell >{user.Food_Bar}</TableCell>
                    <TableCell >{user.Health}</TableCell>
                    <TableCell >{[user.Spawn_PointX, user.Spawn_PointY, user.Spawn_PointZ].toString()}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
        {(activeStep === 1 && host !== null) && (
          <Paper sx={{ width: '100%' }} elevation={3} style={{ marginTop: "100px" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Reputation</TableCell>
                    <TableCell>Coordinate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {host.map((h, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        {h.Reputation}
                      </TableCell>
                      <TableCell >{[h.CoordinateX, h.CoordinateY, h.CoordinateZ].toString()}</TableCell>
                    </TableRow>))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
        {(activeStep === 2 && animalNum !== null) && (
          <Card sx={{ display: 'flex', width: "80%" }} style={{ marginTop: "100px", marginRight: "auto", marginLeft: "auto" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  the number of your animals
                </Typography>
                <Typography component="div" variant="h3">
                  {animalNum}
                </Typography>
              </CardContent>
            </Box>
            <CardMedia>
              <Image
                src={animals}
                alt="animals"
                width="400px"
                height="300px"
              />
            </CardMedia>
          </Card>
        )}
        {(activeStep === 3 && strongNum !== null) && (
          <Card sx={{ display: 'flex', width: "80%" }} style={{ marginTop: "100px", marginRight: "auto", marginLeft: "auto" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  the number of your <strong></strong> animals
                </Typography>
                <Typography component="div" variant="h3">
                  {strongNum}
                </Typography>
              </CardContent>
            </Box>
            <CardMedia>
              <Image
                src={animals}
                alt="animals"
                width="400px"
                height="300px"
              />
            </CardMedia>
          </Card>
        )}
         {(activeStep === 4 && users !== null) && (
          <Paper sx={{ width: '100%' }} elevation={3} style={{ marginTop: "100px" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" width="20px">
                      ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Coordinate</TableCell>
                    <TableCell>Food Bar</TableCell>
                    <TableCell>Health</TableCell>
                    <TableCell>Spawn Point</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    users.map((user,index) => (
                      <TableRow key ={index} hover>
                      <TableCell align="left" width="20px">
                        {user.ID}
                      </TableCell>
                      <TableCell>{user.Name}</TableCell>
                      <TableCell >{[user.CoordinateX, user.CoordinateY, user.CoordinateZ].toString()}</TableCell>
                      <TableCell >{user.Food_Bar}</TableCell>
                      <TableCell >{user.Health}</TableCell>
                      <TableCell >{[user.Spawn_PointX, user.Spawn_PointY, user.Spawn_PointZ].toString()}</TableCell>
                    </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Container>
    </ThemeProvider >
  )
}

export default Home;
