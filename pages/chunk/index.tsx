import React from 'react';
import { NextPage } from 'next';
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

type Chunk = {
  CoordinateX: number;
  CoordinateY: number;
  CoordinateZ: number;
  Weather: string;
};

type Form = {
  register: UseFormRegister<Chunk>
};


const Form: React.FC<Form> = ({ register }) => {
  return (
    <>
      <CoordinateForm register={register} type={"Coordinate"} />
      <FormTextField register={register} type="Weather" isNum={false} />
    </>
  );
};

const Page: NextPage = () => {
  const [chunks, setChunks] = React.useState<Chunk[]>([]);
  const [open, setOpen] = React.useState(false);
  const [coordinates, setCoordiantes] = React.useState<number[] | null>(null);
  const handleOpen = (CoordinateX: number,CoordinateY: number,CoordinateZ: number) => {
    setOpen(true);
    setCoordiantes([CoordinateX, CoordinateY, CoordinateZ]);
  };


  const handleClose = () => {
    setOpen(false);
    setCoordiantes(null);
  }

  const { register, handleSubmit, reset } = useForm<Chunk>();

  const updateDisplay = React.useCallback(async () => {
    await axios.get("/api/chunks")
      .then((res) => {
        setChunks(res.data);
      })
      .catch((err) => alert(err));
  }, []);


  const onSubmit: SubmitHandler<Chunk> = async (data) => {
    await axios.post("/api/chunk", data)
      .then(() => {
        updateDisplay();
      })
      .catch((err) => alert(err))
    reset();
  };


  const onSubmitUpdate: SubmitHandler<Chunk> = async (data) => {
    await axios.put("/api/chunk", { ...data, target: coordinates })
      .then(() => {
        updateDisplay();
      })
      .catch((err) => alert(err))
    reset();
    setOpen(false);
  };

  const onDelete = async () => {
    await axios.delete("/api/chunk", { data: { target: coordinates } })
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
        <Typography variant="h5" style={{ marginTop: "30px", textAlign: "center" }} >{"Chunk's data"}</Typography>
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
                <TableCell >Coordinate</TableCell>
                <TableCell>Weather</TableCell>
              </TableHead>
              <TableBody>
                {chunks.map((chunk, key) => {
                  return (
                    <TableRow
                      key={key}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="left" width="20px">
                        <IconButton color="primary" onClick={() => handleOpen(chunk.CoordinateX,chunk.CoordinateY,chunk.CoordinateZ)}>
                          <AdjustIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell >{[chunk.CoordinateX, chunk.CoordinateY, chunk.CoordinateZ].toString()}</TableCell>
                      <TableCell>{chunk.Weather}</TableCell>
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
