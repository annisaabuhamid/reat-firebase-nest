
import '../styles/LandingPage.css';
import {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {TODO_STATUS} from '../constants/todoStatus'; 
import { Button,TextField,List,ListItem,ListItemButton,ListItemText } from  '@mui/material';




const LandingPage = () => {
  // TODO
  /**
   * 1. Create a input box - DONE
   * 2. Create a save button - DONE
   * 3. After click save, we need to save the record in a todo state - DONE
   * 4. Display the saved todos - DONE
   * 
   * -- version v.0.2
   * a. Have a edit, delete and complete option
   * 
   * -- version v.0.3
   * a. Deleted and completed record will be moved to another list
   */

  const [todolist, setTodolist ] = useState([]);
  const [todo,setTodo] = useState('test');
  const saveTodo = () =>{
        //deep clone cause xleh ubah directly todolist
        const cloneArray = [...todolist] //[...] spread operator
     
        // transform before save data
        const transformTodo={
          id:uuidv4(),
          content: todo,
          status: TODO_STATUS.ACTIVE
        }

        cloneArray.push(transformTodo)
        setTodolist(cloneArray)
        setTodo("")

  }
  
  const completedTodo =(id) => {
    const cloneArray = [...todolist] //[...] spread operator
    const getTodoID = cloneArray.find((eachTodo) => eachTodo.id === id)

    if (getTodoID){
      getTodoID.status = TODO_STATUS.COMPLETED
    }
    setTodolist(cloneArray)
  }

  const deleteTodo =(id) => {
    const cloneArray = [...todolist] //[...] spread operator
    const getTodoID = cloneArray.find((eachTodo) => eachTodo.id === id)

    if (getTodoID){
      getTodoID.status = TODO_STATUS.DELETED
    }
    setTodolist(cloneArray)
  }

  const editTodo =(id) => {
    const cloneArray = [...todolist] //[...] spread operator
    const getTodoID = cloneArray.find((eachTodo) => eachTodo.id === id)

    if (getTodoID){
      getTodoID.status = TODO_STATUS.DELETED
    }
    setTodolist(cloneArray)
  }


  return (
   <div className='container'>
    <div>
    <TextField 
      onChange={(et) => setTodo(et.target.value)}
      id="outlined-basic"
      label="Todo"
      variant="outlined"
      
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
          todolist.map((eachTodo,key)=>{
          
            let defaultStyle = {color:"black"}
            if(eachTodo.status === TODO_STATUS.COMPLETED){
              defaultStyle = {color:'blue'}
            }
            if(eachTodo.status === TODO_STATUS.DELETED){
              defaultStyle = {color:'red'}
            }
          return(
          <ListItem disablePadding key={key}>
           <ListItemButton style={defaultStyle}  onClick={()=>editTodo(eachTodo.id)}>
             <ListItemText primary={eachTodo.content} />
             <ListItemText primary={eachTodo.status} />
           </ListItemButton>
           <Button size="small" color="success" onClick={()=>completedTodo(eachTodo.id)}>Done</Button>
           <Button size="small" color="error" onClick={()=>deleteTodo(eachTodo.id)}>Delete</Button>
          </ListItem>
           )}
          )
        }
         
      </List>
         
      </div>
   </div>
 
    
  );
}
 

export default LandingPage;
