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

function MaterialUiTableAddCatagory({ rows, columns }) {
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
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center"><Checkbox /></TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontSize: "16px",
                    fontWeight: '600',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index} hover role="checkbox">
                  <TableCell align="center"><Checkbox /></TableCell>

                  {/* Category Image */}
                  <TableCell align="center">
                    <div className="w-[200px] h-[200px] mx-auto flex items-center justify-center rounded-md overflow-hidden border ">
                      <img
                        src={row.product.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>

                  {/* Category Text */}
                  <TableCell align="center">
                    <h3 className="text-[15px] font-[500] cursor-pointer hover:text-blue-600">
                      {row.product.subcatagory} {row.product.catagory}
                    </h3>
                  </TableCell>

                  {/* Action buttons */}
                  <TableCell align="center">
                    <div className="flex items-center justify-center gap-2">
                      <Tooltip title="Edit" placement="top">
                        <Button className="hover:!bg-[rgba(0,0,0,0.1)] !w-[40px] !h-[40px] !min-w-[40px] !text-black !rounded-full">
                          <TfiPencil size={18} />
                        </Button>
                      </Tooltip>
                      <Tooltip title="View" placement="top">
                        <Button className="hover:!bg-[rgba(0,0,0,0.1)] !w-[40px] !h-[40px] !min-w-[40px] !text-black !rounded-full">
                          <AiOutlineEye size={20} />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top">
                        <Button className="hover:!bg-[rgba(0,0,0,0.1)] !w-[40px] !h-[40px] !min-w-[40px] !text-black !rounded-full">
                          <MdOutlineDeleteOutline size={20} />
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
        rowsPerPageOptions={[10, 25, 50]}
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

export default MaterialUiTableAddCatagory;
