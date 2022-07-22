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
import TableHead  from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Header from '../../components/Header';
import FormTextField from '../../components/FormTextField';
import CoordinateForm from '../../components/CoordinateForm';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../style/constants';

type Monster = {
  ID: number;
  Health: string;
  Damage: number;
};

const Page: NextPage = () => {
  const [monsters, setMonsters] = React.useState<Monster[]>([]);

  const { register, handleSubmit, reset } = useForm<Monster>();

  const onSubmit: SubmitHandler<Monster> = (data) => {
    console.log(data);
    reset();
  };

  React.useEffect(() => {
    axios.get('http://localhost:3001/monsters')
    .then((res) => {
      setMonsters(res.data)
    })
    .catch(err => alert(err))
  },[])

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container maxWidth="sm">
        <Typography variant="h5" style={{ marginTop: "30px",textAlign:"center" }} >{"Monser's data"}</Typography>
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
                <TableCell>Health</TableCell>
                <TableCell>Damage</TableCell>
              </TableHead>
              <TableBody>
                {monsters.map((monster, key) => {
                  return (
                    <TableRow
                      key={key}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell >{monster.Health}</TableCell>
                      <TableCell>{monster.Damage}</TableCell>
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
