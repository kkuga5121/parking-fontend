import { pink, teal } from '@mui/material/colors'
import { createTheme, ThemeProvider } from '@mui/material/styles';

export const themeOptions = createTheme({
  palette: {
    mode:'light',
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3',
    },
  },
  
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
    h6:{
      fontWeight: 'light',
      color:'#364152'
    },
    h4:{
      color:'#121926'
    },
    subtitle1:{
      color:'#121926',
      fontSize:20
    },
  },
  
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});