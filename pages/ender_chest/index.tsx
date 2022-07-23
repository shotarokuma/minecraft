import React from 'react';
import { NextPage } from 'next';
import axios from 'axios';

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
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../style/constants';


type Ender_Chest = {
  Storage_ID: number;
  User_ID: number;
};

const Page: NextPage = () => {
  const [enderChests, setEnderChests] = React.useState<Ender_Chest[]>([]);

  React.useEffect(() => {
    axios.get('/api/ender_chest')
    .then((res) => {
      setEnderChests(res.data)
    })
    .catch(err => alert(err)) 
  },[]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container maxWidth="sm">
        <Typography variant="h5" style={{ marginTop: "30px",textAlign:"center" }} >{"Ender Chests's data"}</Typography>
      </Container>
      <Container component="main" maxWidth="md">
        <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={3} style={{ marginTop: "100px" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableCell>Storage ID</TableCell>
                <TableCell>User ID</TableCell>
              </TableHead>
              <TableBody>
                {enderChests.map((echest, key) => {
                  return (
                    <TableRow
                      key={key}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell >{echest.Storage_ID}</TableCell>
                      <TableCell>{echest.User_ID}</TableCell>
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
