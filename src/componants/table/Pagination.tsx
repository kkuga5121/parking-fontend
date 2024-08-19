import { Table } from "@tanstack/react-table";
import React from "react";
import {
    Button,
    TextField,
    Select,
    MenuItem,
    Typography,
    Box,
    IconButton
  } from '@mui/material';
  import {
    FirstPage as FirstPageIcon,
    LastPage as LastPageIcon,
    NavigateBefore as NavigateBeforeIcon,
    NavigateNext as NavigateNextIcon
  } from '@mui/icons-material';
type Props = {
  // table returned from useTable hook.
  table: Table<any>;
};
const Pagination = ({ table }: Props) =>{

    const state = table.getState().pagination;
    //last page helper function
    const goLastPage = () => table.setPageIndex(table.getPageCount() - 1);
    return (
        <Box my={2} display="flex" alignItems="center" gap={2}>
          <Box>
            {/* button to go to first page */}
            <IconButton
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              color="primary"
            >
              <FirstPageIcon />
            </IconButton>
            {/* button to go previous page */}
            <IconButton
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              color="primary"
            >
              <NavigateBeforeIcon />
            </IconButton>
            {/* button to go next page */}
            <IconButton
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              color="primary"
            >
              <NavigateNextIcon />
            </IconButton>
            {/* button to go last page */}
            <IconButton
              onClick={goLastPage}
              disabled={!table.getCanNextPage()}
              color="primary"
            >
              <LastPageIcon />
            </IconButton>
          </Box>
          {/* page info */}
          <Typography variant="body2" display="flex" alignItems="center" gap={1}>
            Page <strong>{state.pageIndex + 1} of {table.getPageCount()}</strong>
          </Typography>
          {/* input to skip to a specific page */}
          <Box display="flex" alignItems="center" gap={1}>
            | Go to page:
            <TextField
              defaultValue={state.pageIndex + 1}
              type="number"
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              size="small"
              variant="outlined"
              style={{ width: '60px', marginLeft: '8px' }}
            />
          </Box>
          {/* select to input page size */}
          <Select
            value={state.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            sx={{
                width:'150px'
            }}
            size="small"
            variant="outlined"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <MenuItem key={pageSize} value={pageSize} >
                Show {pageSize}
              </MenuItem>
            ))}
          </Select>
        </Box>
      );
};
export default Pagination;