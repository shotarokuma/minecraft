import React from "react";
import { NextPage } from "next";
import { useForm, SubmitHandler, UseFormRegister } from 'react-hook-form';
import axios from "axios";

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
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Header from '../../components/Header';
import FormTextField from '../../components/FormTextField';
import CoordinateForm from '../../components/CoordinateForm';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../style/constants';

export type User = {
  ID: number;
  Name: string;
  CoordinateX: number;
  CoordinateY: number;
  CoordinateZ: number;
  Food_Bar: number;
  Health: string;
  Spawn_PointX: number;
  Spawn_PointY: number;
  Spawn_PointZ: number;
};

type Form = {
  register: UseFormRegister<User>
};

const Form: React.FC<Form> = ({ register }) => {
  return (
    <>
      <FormTextField register={register} type="ID" isNum={true} />
      <FormTextField register={register} type="Name" isNum={false} />
      <CoordinateForm register={register} type={"Coordinate"} />
      <FormTextField register={register} type="Food_Bar" isNum={true} />
      <FormTextField register={register} type="Health" isNum={false} />
      <CoordinateForm register={register} type={"Spawn_Point"} />
    </>
  );
};

const Page: NextPage = () => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [open, setOpen] = React.useState(false);
  const [id, setID] = React.useState<number|null>(null);
  const handleOpen = (ID : number) => {
    setOpen(true);
    setID(ID);
  };

  const handleClose = () => {
    setOpen(false);
    setID(null);
  };

  const { register, handleSubmit, reset } = useForm<User>();

  const updateDisplay = React.useCallback(async () => {
    await axios.get("/api/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => alert(err));
  }, []);

  const onSubmit: SubmitHandler<User> = async (data) => {
    await axios.post("/api/user",  data)
      .then(() => {
        updateDisplay();
      })
    .catch((err) => alert(err))
    reset();
  };

  const onSubmitUpdate: SubmitHandler<User> = async (data) => {
    await axios.put("/api/user",  {...data,target:id})
      .then(() => {
        updateDisplay();
      })
    .catch((err) => alert(err))
    reset();
    setOpen(false);
  };

  const onDelete = async () => {
    await axios.delete("/api/user",{ data: { target: id } })
    .then(() => {
      updateDisplay();
      handleClose();
    })
    .catch((err) => alert(err))
  };

  React.useEffect(() => {
    updateDisplay();
  }, [updateDisplay])

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
              <TableHead>
                <TableRow>
                  <TableCell align="left" width="20px" />
                  <TableCell>Name</TableCell>
                  <TableCell>Coordinate</TableCell>
                  <TableCell>Food Bar</TableCell>
                  <TableCell>Health</TableCell>
                  <TableCell>Spawn Point</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, key) => {
                  return (
                    <TableRow
                      hover
                      key={key}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="left" width="20px">
                        <IconButton color="primary" onClick={() => handleOpen(user.ID)}>
                          <AdjustIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>{user.Name}</TableCell>
                      <TableCell >{[user.CoordinateX, user.CoordinateY, user.CoordinateZ].toString()}</TableCell>
                      <TableCell >{user.Food_Bar}</TableCell>
                      <TableCell >{user.Health}</TableCell>
                      <TableCell >{[user.Spawn_PointX, user.Spawn_PointY, user.Spawn_PointZ].toString()}</TableCell>
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
        <form>
          <DialogContent>
            <Form register={register} />
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={onDelete}
              variant="contained"
              color="primary"
            >Delete</Button>
            <Button
              onClick={handleSubmit(onSubmitUpdate)}
              variant="contained"
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
