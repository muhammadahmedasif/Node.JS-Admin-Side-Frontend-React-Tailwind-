import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { Button } from "@mui/material";
import { TfiPencil } from "react-icons/tfi";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';

const columns = [
  { id: 'product', label: 'Product', minWidth: 120, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 170, align: 'center' }
];

function MaterialUiTableHomeslider({ rows }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }} >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell><Checkbox /></TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index} hover role="checkbox">
                  <TableCell><Checkbox /></TableCell>

                  {/* Product (image + title + subtext) */}
                  <TableCell align="center">
                    <div className="gap-3 w-full items-center justify-center">
                      <div className="w-[50%] rounded-md overflow-hidden">
                        <img
                          src={row.product.image}
                          alt=""
                          className="w-full object-contain"
                        />
                      </div>
                    </div>

                  </TableCell>

                  {/* Category */}

                  {/* Action buttons */}
                  <TableCell align="center">
                    <div className="flex items-center justify-evenly w-full">
                      <Tooltip title="Edit" placement="top">
                        <Button className="hover:!bg-[rgba(0,0,0,0.2)] !w-[45px] !h-[45px] !min-w-[45px] !text-black p-2 !text-[40px] !rounded-full">
                          <TfiPencil />
                        </Button>
                      </Tooltip>
                      <Tooltip title="View" placement="top">
                        <Button className="hover:!bg-[rgba(0,0,0,0.2)] !w-[45px] !h-[45px] !min-w-[45px] !text-black p-2 !text-[40px] !rounded-full">
                          <AiOutlineEye />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top">
                        <Button className="hover:!bg-[rgba(0,0,0,0.2)] !w-[45px] !h-[45px] !min-w-[45px] !text-black p-2 !text-[40px] !rounded-full">
                          <MdOutlineDeleteOutline />
                        </Button>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default MaterialUiTableHomeslider;
