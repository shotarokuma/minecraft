import React from 'react';
import { NextPage } from 'next';
import axios from "axios";

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

type Block = {
  CoordinateBlockX: number;
  CoordinateBlockY: number;
  CoordinateBlockZ: number;
  CoordinateChunkX: number;
  CoordinateChunkY: number;
  CoordinateChunkZ: number;
  Type: string;
};

const Page: NextPage = () => {
  const [blocks, setBlocks] = React.useState<Block[]>([]);

  React.useEffect(() => {
    axios.get("/api/blocks")
    .then((res) => {
      setBlocks(res.data)
    })
    .catch((err) => alert(err));
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container maxWidth="sm">
        <Typography variant="h5" style={{ marginTop: "30px", textAlign: "center" }} >{"Block's data"}</Typography>
      </Container>
      <Container component="main" maxWidth="md">
        <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={3} style={{ marginTop: "100px" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableCell>Coordinate of Block</TableCell>
                <TableCell>Coordinate of Chunk</TableCell>
                <TableCell>Type</TableCell>
              </TableHead>
              <TableBody>
                {blocks.map((block, key) => {
                  return (
                    <TableRow
                      key={key}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell >{[block.CoordinateBlockX,block.CoordinateBlockY,block.CoordinateBlockZ].toString()}</TableCell>
                      <TableCell >{[block.CoordinateChunkX,block.CoordinateChunkY,block.CoordinateChunkZ].toString()}</TableCell>
                     <TableCell>{block.Type}</TableCell>
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
