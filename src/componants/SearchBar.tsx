import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider, DateTimePicker, TimePicker } from '@mui/x-date-pickers';
import { TextField,Box,Typography, alpha ,Grid, Divider, Button, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThaiProvinces, licProSearch, rangeDate } from '../config/type/lpr.type';
// or

const SearchBar = (props:any) => {
  const {onClickList,handlefetchExport} = props
  // const {setSearchValue,setValue,onClick,searchValue,value} = props

  const [searchValue,setSearchValue] = React.useState<licProSearch>({
    license:'',
    province:''
  })
  const [value, setValue] = React.useState<rangeDate>({
    start:dayjs(new Date().setHours(0,0,0,1)),
    end:dayjs(new Date().setHours(23, 59, 59, 999)),
});

    // const onClickSearch = ()=>{
    //   // setTime(value)
    //   // setSearch(searchValue)
    //   console.log("searchValue onClickSearch",searchValue)
    //   console.log("value onClickSearch",value)
    //   // setSearch(searchValue)
    //   // setTime(value)

    //   onClickList(searchValue,value);
    // }
    
  return (
   <Box sx={{
    display:'flex',
    flexWrap:'wrap',
   // gridTemplateColumns: 'repeat(auto-fill, minmax(10em, 1fr))',
    gap:(theme)=>theme.spacing(4),
    alignItems:'center',
   }} 
   >
    
   <Box sx={{
    display:'flex',
     flexDirection:'row',
                
    gap:(theme)=>theme.spacing(1),
    paddingRight:(theme)=>theme.spacing(2),
    alignItems:'center',
    border: '1px solid' ,
    borderColor:(theme)=> theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0'
       , borderRadius: '16px',
       minWidth:'500px',
       '& hr': {
         mx: 0.5,
       },
   }} >
    <Typography  sx={{textAlign: 'right',
            fontSize: { lg: '1rem', xs: '0.75rem' },alignContent:'center',p:2,
            my:(theme)=>theme.spacing(1),
            fontWeight: 'bold',}} color="text.primary">
              Search From Time
    </Typography>
    <Divider orientation="vertical" flexItem  />

     <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker','DateTimePicker']}
       >
        
       <Box sx={{display:'flex',flexDirection:'row',gap:(theme)=>theme.spacing(2)}}>
       <DateTimePicker
        sx={{ width:'200px'}} 
        label="Start Time"
        defaultValue={dayjs(new Date())}
        ampm={false}
        views={['year','month','day','hours','minutes']}
        value={value.start}
        // onChange={(newValue) => setValue((prevState:any)=>({...prevState, start:newValue}))} 
        
        onChange={(newValue) => setValue({start:newValue, end:value.end})}
        />
        <DateTimePicker
        sx={{ width:'200px'}} 
        label="End Time"
        defaultValue={dayjs(new Date())}
        ampm={false}
        views={['year','month','day','hours','minutes']}
        value={value.end}
        onChange={(newValue) => setValue({start:value.start, end:newValue})}
        // onChange={(newValue) => setValue((prevState:any)=>({...prevState, end:newValue}))}
         />
    
       </Box>
      </DemoContainer>
    </LocalizationProvider>
    </Box>

    
   <Box sx={{
    display:'flex',
    flexDirection:'row',
    gap:(theme)=>theme.spacing(1),
    paddingRight:(theme)=>theme.spacing(2),
    alignItems:'center',
    border: '1px solid' ,
    borderColor:(theme)=> theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0'
       , borderRadius: '16px',
       minWidth:'500px',
       '& hr': {
         mx: 0.5,
       },
   }} >
   <Typography sx={{textAlign: 'right',
            fontSize: { lg: '1rem', xs: '0.75rem' },alignContent:'center',p:2,
            my:(theme)=>theme.spacing(1),
            fontWeight: 'bold',}} color="text.primary">
              Search From License
            </Typography>
            <Divider orientation="vertical" flexItem />
    <TextField 
    sx={
      { width:'150px'}
    } id="outlined-basic" label="License" placeholder="License" variant="outlined" value={searchValue.license} 
    onChange={(e)=>setSearchValue((prevState:any)=>({...prevState, license:e.target.value}))} />
   <FormControl sx={ { width:'175px'}} >
    <InputLabel id="province-label"  >Province</InputLabel>
           
    <Select variant="outlined"
              labelId="province-label"
              value={searchValue.province} 
              label="Province"
              onChange={(e)=>setSearchValue((prevState:any)=>({...prevState, province:e.target.value}))}
              name="province">
              <MenuItem value=''>None</MenuItem>
              {Object.values(ThaiProvinces).map((provinceName) => (
                    <MenuItem key={provinceName} value={provinceName}>
                        {provinceName}
                    </MenuItem>
                ))}
              {/* Add other menu items as needed */}
            </Select>
          </FormControl>
   
   </Box>
    
   <Button
          variant="contained"
          color="primary"
          size="medium"
          sx={{
            justifyContent:'center',
          }}
          onClick={() =>  onClickList(searchValue,value)}
        >
          Search
    </Button>
    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      sx={{
                        // ml:'10px',
                        justifyContent:'center',
                      }}
                      onClick={() => handlefetchExport(searchValue,value)}
                    >
                      Export to Excel
                </Button>
   </Box>
  );
}
export default SearchBar;
