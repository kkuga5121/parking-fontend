
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Grid,
    FormHelperText,
    Tooltip,
    Alert,
    Box,
    Typography,
    alpha,
  } from '@mui/material';
  import IconButton from '@mui/material/IconButton';
  import SearchIcon from '@mui/icons-material/Search';
  import RefreshIcon from '@mui/icons-material/Refresh';
  import KeyIcon from '@mui/icons-material/Key';
  import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
  import DomainIcon from '@mui/icons-material/Domain';
  import VideocamIcon from '@mui/icons-material/Videocam';
  import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useEffect, useState } from 'react';
import { LprParkingShow } from '../../config/type/parking.type';
import { format } from 'date-fns';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import NotificationsIcon from '@mui/icons-material/Notifications';
const categoriesGrid=[
    {id:'id',
    name:"ID",
    icon:<KeyIcon/>,},
    {id:'license',
    name:"License Plate",
    icon:<DirectionsCarFilledIcon/>,},
    {id:'province',
    name:"Province",
    icon:<DomainIcon/>,},
    {id:'timeParking',
    name:"Parking time (minute:second)",
    icon:<LocalParkingIcon/>,},
    {id:'timeCapture',
    name:"Captured Time",
    icon:<AccessTimeIcon/>,},
    {id:'timeUpdate',
    name:"Last Captured Time",
    icon:<AccessTimeIcon/>,},
    {id:'alarm',
    name:"Alarm",
    icon:<NotificationsIcon/>,},
]
const LprParkingDialog = (props:any) =>{
    const {open,onClose,data } = props; 
    const [value,setValue] =useState<LprParkingShow>(data)
    const handleClose = () => {
        onClose()
    }
    useEffect(() => {
        setValue(data)
    },[data])

    function formatLicensePlate(plate: string | undefined): string {
        // Match the format for Thai license plates
        const thaiCharRegex = /[\u0E00-\u0E7F]/;
       if(plate){
        if (thaiCharRegex.test(plate)) {
          for (let i = 0; i < plate.length; i++) {
            if( i < plate.length -1){
              if(thaiCharRegex.test(plate[i]) && !thaiCharRegex.test(plate[i+1])){
                let part1 = plate.substring(0, i+1);
                let  part2 = plate.substring(i+1);
                return (part1 +'-'+part2);
              }
              }
            }
          
        } else  {
            let part1 = plate.substring(0, 2);
            let  part2 = plate.substring(2);
            return (part1 +'-'+part2);
        } 
       }
        return "";
    }
    function formatTime(seconds:number) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = remainingSeconds.toString().padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
      }
    return (
        
        <Dialog open={open} onClose={handleClose} 
        maxWidth="lg" sx={{
            backdropFilter: "blur(5px) sepia(5%)","& .MuiDialog-paper": {
            borderRadius: "20px",
          },}}>
          <DialogTitle>LPR Information</DialogTitle>
          <DialogContent
            sx={{overflowX:'hidden',
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
              },}}
          >
            <Box 
            sx={{display:'flex',
            flexDirection:'column',
            width:'600px',
            alignItems:'center',
            gap:(theme)=>theme.spacing(1)
            }}>
            {value && (
                    <img src={import.meta.env.VITE_API_URL+"/lpr/image/"+value.lprId}
             alt="Plate" style={{ width: '450px', height: 'auto',borderRadius:'15px' }} />
            )}
            {value && categoriesGrid.map(({id,icon,name})=>{
                let d = value[id as keyof LprParkingShow] ;
               
                if(id=='timeCapture' ){
                    d = format(new Date(d),'yyyy-MM-dd HH:mm:ss')
                }
                if(id=='timeUpdate'){
                    if(d != ''){
                        d = format(new Date(d),'yyyy-MM-dd HH:mm:ss')
                    }
                }
                if(id=='timeParking'){
                    d = formatTime(d as number);
                }
                if(id=='alarm'){
                    d= d + " time"
                }
                return(<Grid key={id} container spacing={2} alignItems="center">
                <Grid item>
                    {icon}
                </Grid>
                <Grid item xs>
                   <Box sx={{display:'flex',flexDirection:'column'}}>
                   <Typography sx={{textAlign: 'left',alignContent:'center',
                        my:(theme)=>theme.spacing(1),
                        fontWeight: 'bold',}} color="text.secondary">
                        {name}
                    </Typography>
                   <Typography sx={{textAlign: 'left',alignContent:'center',
                        fontWeight: 'light',}} color="text.secondary">
                        {d}
                    </Typography>
                   </Box>
                </Grid>
            </Grid>)
            })}
            
            </Box>
        </DialogContent>
          </Dialog>)
};
export default LprParkingDialog;