import { Box,List,ListItem,ListItemButton,ListItemIcon,ListItemText } from '@mui/material';

import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { routeNames } from '../routes/routeNames';
import '../styles/App.css';



const LandingPage = () => {
  let navigate = useNavigate();

  const [name, setName ] = useState('hi');
  const updateNameState = (element) =>{
    const value = element.target.value;
    setName(value);
  }
  const [desc, setDesc ] = useState('desc');
  const updateDescState = (element) =>{
    const value = element.target.value;
    setDesc(value);
  }
  const navigateToHome = () =>
  navigate(routeNames.HOME,{state:{
    firstName:name,
    desc:desc
  }})
  return (
    <div className='container'>

      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
         <List>
            <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
      <input type="text" id="name"  onChange={updateNameState} />
      <input type="text" id="desc"  onChange={updateDescState} />
      { /* add a way to route */}
      <button onClick={navigateToHome}>Home</button>
    </div>
  );
}

export default LandingPage;
