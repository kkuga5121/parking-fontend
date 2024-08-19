import { faker } from "@faker-js/faker";
import { LprParkingShow } from "../../config/type/parking.type";
import { Box, TextField, Switch, Typography, Button, Tooltip, 
  IconButton, alpha, styled, Divider, Alert, LinearProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import * as XLSX from 'xlsx';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CssBaseline,
    
  } from '@mui/material';
  import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    // 1. add necessary import
    getPaginationRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    SortingState,
    useReactTable,
    RowSelectionState,
  } from "@tanstack/react-table";
import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import LprShowDialog from '../dialog/LprShowDialog';
import { LprParkingColumnDefs } from "./LprParkingColumnDefs";
import LprParkingDialog from "../dialog/LprParkingDailog";
import httpService from "../../service/httpService";
import useLprParking from "../../hooks/useLprParking";
import { Receipt } from "@mui/icons-material";
import SearchBar from "../SearchBar";
import { licProSearch, rangeDate } from "../../config/type/lpr.type";


const LprParkingTable = (props:any)=>{

   const {isError ,isSuccess,data ,handle,isIdle,isPending} = useLprParking();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filtering,setFiltering] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({}) 
  const [messError,SetMessError] = useState<string>('')

  const table = useReactTable({
      columns: LprParkingColumnDefs,
      //  data: records as LprParkingShow[],
      //data:[],
        data: isSuccess == true ? data as LprParkingShow[] : [],
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      //2.  add getPaginationRowModel
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel:getFilteredRowModel(),
      onRowSelectionChange: setRowSelection, 
      state: {
        sorting,
        globalFilter:filtering,
        columnFilters,
        rowSelection
      },
      onSortingChange: setSorting,
      onGlobalFilterChange:setFiltering,  initialState:{
        pagination: {
            pageSize: 50,
        },
      },
  });

  const headers = table.getFlatHeaders();
  //const rows = table.getRowModel().rows;
  const rowsFilter = table.getFilteredRowModel().rows;
  const [rowCount,setRowCount] = useState<number>();

  const [openDialog, setOpenDialog] = useState(false);

  const [dataSelect,setDataSelect] =useState<LprParkingShow | null >();
  const [loading, setLoading] = useState(false);
  
  const handleCloseDialog  = () =>{
      setOpenDialog(false);
  }

  const handlefetchExport = async (search:licProSearch,daterange:rangeDate) => {
    if(isSuccess){
      setLoading(true);
      SetMessError('');
      try {

        let payload ={
            LICENSEPLATE:search.license,
            PROVINCE:search.province,
            TimeStart: daterange.start?.toDate().toISOString(),
            TimeEnd:daterange.end?.toDate().toISOString()
        }
        console.log('payload',payload)
        const response = await  httpService.postStream('/parking/findAllDataExcel',payload);
         // Create a blob from the data and trigger download
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet ' },);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'parkingdata.xlsx'; // Set your desired file name
        document.body.appendChild(a);
        a.click();
        a.remove();
      } catch (error) {
        SetMessError('Failed to download file');
      } finally {
        setLoading(false);
      }
    }
  };
  useEffect(()=>{
    setRowCount(rowsFilter.length)
  },[rowsFilter])

  const onClickSearch= (search:licProSearch,daterange:rangeDate)=>{
    handle(search,daterange)
}
  return (
    <React.Fragment>
    <SearchBar onClickList={onClickSearch} handlefetchExport={handlefetchExport}/>
    <div className="overflow-auto">
      <Box sx={{ mb: 2 ,mt: 2}}>
        <Box sx={{ display: 'flex',
        alignItems: 'center',
          mb: 0, position: 'relative' }}>
          <SearchIcon sx={{ width: { lg: 35, xs: 20 }, height: { lg: 35, xs: 20 }, mx: 2 }} />
          <TextField id="outlined-search"
            placeholder="Search"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            
            size="small"
            sx={{ 
              width: { lg: '25%', xs: '50%' },
                m: 0, 
            
            '& .MuiInputBase-input': {
              color: 'black', // Set your desired text color here
            },
            '& .MuiInputBase-input::-webkit-search-cancel-button': {
              color:  'black',
              bgcolor:'red',
            }}}
            
          //   variant="filled"
            required
          />
          {/* <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  sx={{
                    ml:'10px',
                    justifyContent:'center',
                  }}
                  onClick={() => handlefetchExport()}
                >
                  Export to Excel
            </Button> */}
          <Typography sx={{ ml: 2,fontWeight:'bold',position: 'absolute', right: 0, mr: 2  }}>Parking Record : {rowCount}</Typography>
        </Box>

      </Box>
  
      {messError !='' &&<Alert variant="filled" severity="error">{messError}</Alert>}
      {(isPending || loading) && <LinearProgress />}
      <Divider sx={{my:2}}/>
      <TableContainer component={Paper}  sx={{
          // ...sx,
          border: '1px solid',
          borderColor:(theme)=> theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
          borderRadius: '15px',
          boxShadow: 3,
          padding:(theme)=>theme.spacing(0),
          
          '&::-webkit-scrollbar': {
          // display: 'none',
          width: '8px',
          height: '8px',
          visibility:'hidden'
          },
          '&::-webkit-scrollbar-track': {
          background: 'inherit',
          borderRadius:'15px',
          boxShadow: 'inset 0 0 2px rgba(0, 0, 0, 0.3)',
          visibility:'hidden'
          },
          '&::-webkit-scrollbar-thumb': {
          backgroundColor: (theme)=>alpha(theme.palette.primary.light,0.5),
          borderRadius: '20px',
          border:(theme)=>alpha(theme.palette.primary.dark,0.5),
          // visibility:'hidden'
          },
          '&::-webkit-scrollbar-corner': {
          background: 'inherit',
          },
      }}>
          <Table stickyHeader={true} >
          <TableHead >
              {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} >
                  {headerGroup.headers.map((header) => {
                    const direction = header.column.getIsSorted();
                    const arrow: any = {
                    asc: "🔼",
                    desc: "🔽",
                    };
                    const sort_indicator = direction && arrow[direction];

                    return (
                        <TableCell key={header.id} onClick={header.column.getToggleSortingHandler()}
                        size='medium'
                        sx={{
                            bgcolor:(theme)=>theme.palette.primary.light,
                            fontWeight:'bold',  
                            color:(theme)=>theme.palette.primary.dark ,
                            cursor: "pointer"
                        }}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                      {direction && <span>{sort_indicator}</span>}
                        </TableCell>
                        )
                  })}
              </TableRow>
              ))}
          </TableHead>
          <TableBody>
              {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}  hover role="checkbox" 
              tabIndex={-1} sx={{
                cursor: "pointer"
              }}
              onClick={row.getToggleSelectedHandler()}>
                  {row.getVisibleCells().map(cell => (
                  <TableCell onClick={() => {
                    // console.log("click",row.original)
                    if(row.original != null){
                        setDataSelect(row.original);
                    }
                    setOpenDialog(true);
                }}  size='small' 
                  key={cell.id} sx={{fontWeight:500}}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                  ))}
              </TableRow>
              ))}
          </TableBody>
          </Table>
      </TableContainer>
      
      <Pagination table={table} />
    <LprParkingDialog id="my_modal_7" 
            open={openDialog}  
            data={dataSelect}
            onClose={handleCloseDialog}/>
    </div>
    </React.Fragment>
  )
}
export default LprParkingTable;