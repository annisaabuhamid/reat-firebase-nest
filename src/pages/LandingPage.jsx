
import '../styles/LandingPage.css';
import {useState} from 'react';
import { Button,TextField,List,ListItem,ListItemButton,ListItemText } from  '@mui/material';




const LandingPage = () => {

  const [todolist, setTodolist ] = useState([]);
  const [todo,setTodo] = useState('test');
  const saveTodo = () =>{
        //deep clone cause xleh ubah directly todolist
        const cloneArray = [...todolist] //[...] spread operator
        cloneArray.push(todo)
        setTodolist(cloneArray)
        setTodo("")
  }
  
  return (
   <div className='container'>
    <div>
    <TextField 
      onChange={(et) => setTodo(et.target.value)}
      id="outlined-basic"
      label="Todo"
      variant="outlined"
      value={todo}
      sx={{
        width:400,
      }} />
      <Button
      onClick={saveTodo}
      variant="contained"
      size="large"
      sx={{
        height: 55,
        marginLeft: 2
      }}
      >SAVE
      </Button>
      </div>
      <div>
         
      <List>
        {
           todolist.map((eachTodo,key)=>(
          <ListItem disablePadding key={key}>
           <ListItemButton>
             <ListItemText primary={eachTodo} />
           </ListItemButton>
          </ListItem>
          )
          )
        }
         
      </List>
         
      </div>
   </div>
 
    
  );
}
 

export default LandingPage;
