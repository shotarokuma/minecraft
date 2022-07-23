import React from 'react';
import { NextPage } from 'next';
import { useForm, SubmitHandler, UseFormRegister } from 'react-hook-form';
import axios from 'axios';

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

type Pillager = {
  ID: number;
  Location: string;
  Occupation: string;
};


type Form = {
  register: UseFormRegister<Pillager>
};

const Form: React.FC<Form> = ({ register }) => {
  return (
    <>
      <FormTextField register={register} type="ID" isNum={true} />
      <FormTextField register={register} type="Location" isNum={false} />
      <FormTextField register={register} type="Occupation" isNum={false} />
    </>
  );
};

const Page: NextPage = () => {
  const [pillagers, setPillagers] = React.useState<Pillager[]>([]);
  const { register, handleSubmit, reset } = useForm<Pillager>();
  const [open, setOpen] = React.useState(false);
  const [id, setID] = React.useState<number | null>(null);
  const handleOpen = (ID: number) => {
    setOpen(true);
    setID(ID);
  };


  const handleClose = () => {
    setOpen(false);
    setID(null);
  };

  const updateDisplay = React.useCallback(async () => {
    await axios.get('/api/pillagers')
      .then((res) => {
        setPillagers(res.data);
      })
      .catch((err) => alert(err));
  }, []);


  const onSubmit: SubmitHandler<Pillager> = async (data) => {
    await axios.post("/api/pillager", data)
      .then(() => {
        updateDisplay();
      })
      .catch((err) => alert(err))
    reset();
  };


  const onSubmitUpdate: SubmitHandler<Pillager> = async (data) => {
    await axios.put("/api/pillager", { ...data, target: id })
      .then(() => {
        updateDisplay();
      })
      .catch((err) => alert(err))
    reset();
    setOpen(false);
  };


  const onDelete = async () => {
    await axios.delete("/api/pillager", { data: { target: id } })
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
        <Typography variant="h5" style={{ marginTop: "30px", textAlign: "center" }} >{"Pillager's data"}</Typography>
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
                <TableCell align="left" width="20px" />
                <TableCell>Location</TableCell>
                <TableCell>Occupation</TableCell>
              </TableHead>
              <TableBody>
                {pillagers.map((pillager, key) => {
                  return (
                    <TableRow
                      key={key}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="left" width="20px">
                        <IconButton color="primary" onClick={() => handleOpen(pillager.ID)}>
                          <AdjustIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell >{pillager.Location}</TableCell>
                      <TableCell>{pillager.Occupation}</TableCell>
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
