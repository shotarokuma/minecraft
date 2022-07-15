import React from 'react';
import { NextPage } from 'next';
import { useForm, SubmitHandler, UseFormRegister } from 'react-hook-form';

import AdjustIcon from '@mui/icons-material/Adjust';
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import TableContainer from "@mui/material/TableContainer";
import Table from '@mui/material/Table';
import TableBody from "@mui/material/TableBody";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Header from '../../components/Header';
import FormTextField from '../../components/FormTextField';
import CoordinateForm from '../../components/CoordinateForm';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../style/constants';

type User = {
  id: number;
  name: string;
  coordinate: number[];
  foodbar: number;
  health: string;
};

type Form = {
  register: UseFormRegister<User>
}

const Form: React.FC<Form> = ({ register }) => {
  return (
    <>
      <FormTextField register={register} type="id" isNum={true} />
      <FormTextField register={register} type="name" isNum={false} />
      <CoordinateForm />
      <FormTextField register={register} type="foodbar" isNum={true} />
      <FormTextField register={register} type="health" isNum={false} />
    </>
  );
};

const Page: NextPage = () => {
  //mock data 
  const [users, setUsers] = React.useState<User[]>([
    { id: 1, name: "Mark", coordinate: [3, 3, 3], foodbar: 2, health: "hunger" },
    { id: 2, name: "Mark", coordinate: [3, 3, 3], foodbar: 2, health: "hunger" },
    { id: 3, name: "Mark", coordinate: [3, 3, 3], foodbar: 2, health: "hunger" },
    { id: 4, name: "Mark", coordinate: [3, 3, 3], foodbar: 2, health: "hunger" },
    { id: 5, name: "Mark", coordinate: [3, 3, 3], foodbar: 2, health: "hunger" },
  ]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const { register, handleSubmit, reset } = useForm<User>();

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container maxWidth="sm">
        <Typography variant="h5" style={{ marginTop: "30px", textAlign: "center" }} >{"User's data"}</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form register={register} />
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
              <TableBody>
                {users.map((user, key) => {
                  return (
                    <TableRow
                      hover
                      key={key}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="left" width="20px">
                        <IconButton color="primary" onClick={handleOpen}>
                          <AdjustIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell >{user.coordinate.toString()}</TableCell>
                      <TableCell >{user.foodbar}</TableCell>
                      <TableCell >{user.health}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          {"Edit your data"}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Form register={register}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}
              variant="contained"
              color="primary"
            >Delete</Button>
            <Button
              variant="contained"
              type="submit"
              color="primary"
            >Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </ThemeProvider >
  )
}

export default Page;
