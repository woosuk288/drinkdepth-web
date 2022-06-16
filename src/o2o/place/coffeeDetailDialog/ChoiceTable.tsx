import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type ChoiceOptionType = {
  name: string;
  value: string;
};

type ChoiceOptionTable = {
  choiceOptions: ChoiceOptionType[];
};

export default function ChoiceTable({ choiceOptions }: ChoiceOptionTable) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        {/* <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          {choiceOptions.map((choiceOption) => (
            <TableRow
              key={choiceOption.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                {choiceOption.name}
              </TableCell>
              <TableCell align="right">{choiceOption.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
