import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import PublicIcon from '@mui/icons-material/Public';
import NatureIcon from '@mui/icons-material/Nature';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

import { BeanType } from '../../../../pages/o2o/place';
import { Typography } from '@mui/material';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

type BeanOptionType = {
  name: string;
  value: string;
};

type BeanTableProps = {
  beans: BeanType[];
};

export default function BeanTable({ beans }: BeanTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table /* sx={{ minWidth: 650 }}  */ aria-label="simple table">
        <TableHead>
          <TableRow sx={{ '& th': { width: '33.3%' } }}>
            <TableCell align="center">
              <PublicIcon sx={{ color: '#B69B75' }} fontSize="large" />
              <Typography variant="subtitle2">지역</Typography>
            </TableCell>
            <TableCell align="center">
              <NatureIcon sx={{ color: '#B69B75' }} fontSize="large" />
              <Typography variant="subtitle2">품종</Typography>
            </TableCell>
            <TableCell align="center">
              <AccountTreeIcon sx={{ color: '#B69B75' }} fontSize="large" />
              <Typography variant="subtitle2">가공법</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {beans?.map((bean) => (
            <TableRow
              key={bean.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {bean.country}
              </TableCell>
              <TableCell align="center">{bean.variety}</TableCell>
              <TableCell align="center">{bean.processLabel}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
