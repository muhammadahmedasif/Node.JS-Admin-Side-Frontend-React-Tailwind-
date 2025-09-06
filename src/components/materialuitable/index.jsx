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
import ProgressBar from "../progressslider";
import { TfiPencil } from "react-icons/tfi";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";



function MaterialUiTable({ rows, columns, currentpage }) {
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
              {currentpage === "" &&
                <TableCell><Checkbox /></TableCell>
              }
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontSize: "18px", fontWeight: "bolder" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {
            currentpage === "" &&
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index} hover role="checkbox">
                    <TableCell><Checkbox /></TableCell>

                    {/* Product (image + title + subtext) */}
                    <TableCell align="center">
                      <div className="gap-3 w-full items-center flex">
                        <div className="w-[30%] object-cover rounded-md overflow-hidden">
                          <img src={row.product.image} alt="" className="w-full" />
                        </div>
                        <div className="w-[70%]">
                          <h3 className="text-[12px] font-[500] w-full cursor-pointer hover:text-blue-800 leading-4">
                            {row.product.title}
                          </h3>
                          <h3 className="pt-2 cursor-pointer hover:text-red-500 text-gray-600 font-[500] text-[14px]">
                            {row.product.subtitle}
                          </h3>
                        </div>
                      </div>
                    </TableCell>

                    {/* Category */}
                    <TableCell align="center">{row.catagory}</TableCell>

                    {/* Sub Category */}
                    <TableCell align="center">{row.sub_catagory}</TableCell>

                    {/* Price */}
                    <TableCell align="center">
                      {row.price.old && (
                        <h3 className="text-[15px] text-gray-600 font-[500] line-through">
                          {row.price.old}
                        </h3>
                      )}
                      <h3 className="text-[15px] text-black font-[500]">
                        {row.price.new}
                      </h3>
                    </TableCell>

                    {/* Sale */}
                    <TableCell align="center">
                      <h3 className="text-[15px] text-black font-[500]">
                        {row.sale.text}
                      </h3>
                      <ProgressBar value={row.sale.progress} type={row.sale.type} />
                    </TableCell>

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
          }
          {
            currentpage === "users" && <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index} hover role="checkbox">

                    <TableCell align="center">
                      <div className="w-[150px] h-[150px] rounded-full overflow-hidden mx-auto">
                        <img
                          src={row.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </TableCell>

                    <TableCell align="center" className='!text-[14px] !font-[600] !text-gray-500 !overflow-hidden'>{row.name}</TableCell>

                    <TableCell
                      align="center"
                      className="!text-[14px] !font-[600] !text-gray-500"
                    >
                      <div className="flex items-center justify-center gap-2 break-words">
                        <MdOutlineMailOutline className="text-gray-400 text-[25px]" />
                        <span>{row.email}</span>
                      </div>
                    </TableCell>

                    <TableCell
                      align="center"
                      className="!text-[14px] !font-[600] !text-gray-500"
                    >
                      <div className="flex items-center justify-center gap-2 break-words">
                        <MdOutlinePhone className="text-gray-400 text-[20px]" />
                        <span>{row.phone}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          }
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

export default MaterialUiTable;
