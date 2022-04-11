import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Box,
  IconButton,
  TableFooter,
  TablePagination,
  useTheme,
} from '@mui/material';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

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
  like: number,
  type: string,
  title: string,
  created_by: string,
  created_at: Date,
  read_count: number
) {
  return { like, type, title, created_by, created_at, read_count };
}

const LENGTH = 20;
const tests = Array.from({ length: LENGTH }, (_, i) => {
  const testDate = new Date();
  testDate.setDate(testDate.getDate() - i);

  return createData(
    getRandomInt(0, 10),
    getRandomType(),
    LENGTH - i + '번 테스트 게시물 입니다.',
    '익명' + getRandomInt(1, LENGTH),
    testDate,
    getRandomInt(10, 100)
  );
});

const rows = tests;

export default function PostList() {
  const [page, setPage] = React.useState(0);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">추천</TableCell>
            <TableCell align="center">분류</TableCell>
            <TableCell align="center">제목</TableCell>
            <TableCell>작성</TableCell>
            <TableCell align="center">날짜</TableCell>
            <TableCell align="center">조회</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.like}</TableCell>
              <TableCell align="center">{row.type}</TableCell>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell>{row.created_by}</TableCell>
              <TableCell align="center">
                {row.created_at.toLocaleDateString()}
              </TableCell>
              <TableCell align="center">{row.read_count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              // rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              rowsPerPageOptions={[20]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={20}
              // labelDisplayedRows={() => {
              //   return null;
              // }}
              labelRowsPerPage={null}
              page={page}
              onPageChange={handleChangePage}
              // onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
