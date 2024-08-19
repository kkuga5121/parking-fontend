import { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Header from './containers/Header';
import Navigator from './containers/Navigator';
import { Container, DialogContent } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';
export default function App(props:any)  {
  const {theme} =props;
  const drawerWidth = 256;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [path, setPath] = useState<string>('/');
  const [headerValue, setHeader] = useState<string>('LPR Record');
   const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(()=>{
    console.log("pathGet ",path)
    console.log("import.meta.env.API_URL ",import.meta.env.VITE_API_URL)
    
  },[path]);
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh',width:'100vw'}}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {isSmUp ? null : (
          <Navigator
            setpath={setPath}
            setheader = {setHeader}
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        )}
        <Navigator
          setpath={setPath}
          setheader = {setHeader}
          PaperProps={{ style: { width: drawerWidth } }}
          sx={{ display: { sm: 'block', xs: 'none' } }}
        />
      </Box>
      
      <Box sx={{ flex: 1, display: 'flex', 
      flexDirection: 'column', 
      }}>
      <Header onDrawerToggle={handleDrawerToggle} title={headerValue}/>
        <Box component="main" sx={{ flex: 1, py: 2, px: 4, 
        bgcolor: '#eaeff1' ,flexGrow:1,
       }}>
          {/* <Content /> */}
          {/* {pageUp(path)} */}
          <Outlet/>
       {

       }
        </Box>
      </Box>
       {/* <Box sx={{ flex: 1, display: 'flex', 
      flexDirection: 'column', bgcolor:(theme)=> theme.palette.primary.light
      }}>

      </Box> */}
    </Box>
  );
}
