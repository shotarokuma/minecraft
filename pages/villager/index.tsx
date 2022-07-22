import React from 'react';
import { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import TableContainer from "@mui/material/TableContainer";
import Table from '@mui/material/Table';
import TableBody from "@mui/material/TableBody";
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Header from '../../components/Header';
import FormTextField from '../../components/FormTextField';
import CoordinateForm from '../../components/CoordinateForm';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../style/constants';

type Villager = {
  id: number;
  CoordinateX: number;
  CoordinateY: number;
  CoordinateZ: number,
  Health: string;
  Occupation: string;
};

const Page: NextPage = () => {
  const [villagers, setVillagers] = React.useState<Villager[]>([]);

  const { register, handleSubmit, reset } = useForm<Villager>();
  const onSubmit: SubmitHandler<Villager> = (data) => {
    console.log(data);
    reset();
  };

  React.useEffect(() => {
    axios.get("http://localhost:3001/villagers")
    .then((res) => {
      setVillagers(res.data)
    })
    .catch(err => alert(err));
  },[])

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container maxWidth="sm">
        <Typography variant="h5" style={{ marginTop: "30px",textAlign:"center" }} >{"Villager's data"}</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormTextField register={register} type="id" isNum={true} />
          <FormTextField register={register} type="name" isNum={false} />
          <CoordinateForm />
          <FormTextField register={register} type="foodbar" isNum={true} />
          <FormTextField register={register} type="health" isNum={false} />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            fullWidth
          >Submit
          </Button>
        </form>
      </Container>
      <Container component="main" maxWidth="md">
        <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={3} style={{ marginTop: "100px" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table aria-label="simple table">
                <TableHead>
                  <TableCell>Coordinate</TableCell>
                  <TableCell>Health</TableCell>
                  <TableCell>Occupation</TableCell>
                </TableHead>
                <TableBody>
                {villagers.map((villager, key) => {
                  return (
                    <TableRow
                      key={key}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell >{[villager.CoordinateX,villager.CoordinateY, villager.CoordinateZ].toString()}</TableCell>
                      <TableCell>{villager.Health}</TableCell>
                      <TableCell >{villager.Occupation}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </ThemeProvider >
  )
}

export default Page;
