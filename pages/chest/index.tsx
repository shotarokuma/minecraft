import React from 'react';
import { NextPage } from 'next';
import axios from 'axios';

import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper';
import TableContainer from "@mui/material/TableContainer";
import Table from '@mui/material/Table';
import TableBody from "@mui/material/TableBody";
import TableCell from '@mui/material/TableCell';
import  TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Header from '../../components/Header';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../style/constants';

type Chest = {
  Storage_ID : number;
  LocationX: number,
  LocationY: number,
  LocationZ: number,
};

const Page: NextPage = () => {
  const [chests, setChests] = React.useState<Chest[]>([]);

  React.useEffect(() => {
    axios.get('/api/chests')
    .then((res) => {
      setChests(res.data)
    })
    .catch(err => console.log(err));
  },[]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container maxWidth="sm">
        <Typography variant="h5" style={{ marginTop: "30px",textAlign:"center" }} >{"Chest's data"}</Typography>
      </Container>
      <Container component="main" maxWidth="md">
        <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={3} style={{ marginTop: "100px" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableCell align="center">Location</TableCell>
              </TableHead>
              <TableBody>
                {chests.map((chest, key) => {
                  return (
                    <TableRow
                      key={key}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align='center'>{[chest.LocationX,chest.LocationY,chest.LocationZ].toString()}</TableCell>
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
