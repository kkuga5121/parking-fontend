import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StyleIcon from '@mui/icons-material/Style';
import { useNavigate ,useLocation} from 'react-router-dom';
const categories = [
  {
    id: 'History',
    children: [
      { id: 'LPR Record', icon: <InventoryIcon /> ,link:'/',active:false },
      { id: 'LPR Parking Record', icon: <InventoryIcon />,link:'/lprparking',active:false  },
    ],
  },
];

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
};

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
};

export default function Navigator(props: any) {
  const { ...other} = props;
  const {setpath,setheader} = props;
  const [categoriesValue,setCategoriesValue] = React.useState(categories);
   const navigate = useNavigate();
   const location = useLocation();

  const handleNavigation = (path:string | undefined,id:string,childId:string) => {
    if(path != null){
      console.log(path);
      setpath(path);
      // categoriesValue.find((cat)=> cat.children.findIndex((child)=> child.id== childId) > -1)
      console.log("id ",id) 
      console.log("childId ",childId)
      // let categoriesUp = categoriesValue.map((category)=>{
      //   if(category.id == id){
      //     category.children = category.children.map((child)=>{
      //       if(child.id == childId){
      //         child.active =true;
      //         setheader(child.id)
      //       }else{
              
      //         child.active =false;
      //       }
      //       return child
      //     })
      //   }else{
      //     category.children = category.children.map((child)=>{
      //       child.active=false
      //       return child
      //     })
      //   }
      //   return category
      // });
      // setCategoriesValue(categoriesUp);

      navigate(path);
    }
  };
  React.useEffect(()=>{
    
    console.log(location.pathname);
    let categoriesUp = categoriesValue.map((category)=>{
      category.children = category.children.map((child)=>{
        if(child.link == location.pathname){
          child.active =true;
          setheader(child.id)
          setpath(child.link)
        }else{
          
          child.active =false;
        }
        return child
      })
      return category
    });
    setCategoriesValue(categoriesUp);
  },[location.pathname])

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          LPR Parking
        </ListItem>
        {categoriesValue.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active ,link}) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton selected={active} sx={item} 
                onClick={() => handleNavigation(link,id,childId)}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
