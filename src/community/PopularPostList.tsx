import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';

import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

function getRandomType() {
  const types = ['잡담', '후기', '질문'];
  return types[getRandomInt(0, types.length - 1)];
}

function createData(
  index: number,
  like: number,
  type: string,
  name: string,
  created_by: string,
  created_at: Date,
  read_count: number
) {
  return { index, like, type, name, created_by, created_at, read_count };
}

const LENGTH = 5;
const tests = Array.from({ length: LENGTH }, (_, i) => {
  const testDate = new Date();
  testDate.setDate(testDate.getDate() - i);

  return createData(
    i + 1,
    getRandomInt(0, 10),
    getRandomType(),
    LENGTH - i + '번 테스트 게시물 입니다.',
    '익명' + getRandomInt(1, LENGTH),
    testDate,
    getRandomInt(10, 100)
  );
});

const rows = tests;

type PopularPostProps = {
  tableTitle: string;
};

export default function PopularPost({ tableTitle }: PopularPostProps) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: 'primary.main' }}>
            <TableCell></TableCell>
            <TableCell
              colSpan={1}
              sx={{ color: 'white', fontWeight: 600, fontSize: '1rem' }}
            >
              {tableTitle} 인기글
            </TableCell>

            <TableCell align="center" sx={{ padding: 0 }}>
              <IconButton sx={{ color: 'white' }}>
                <KeyboardArrowRight />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.index}</TableCell>

              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.created_by}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
