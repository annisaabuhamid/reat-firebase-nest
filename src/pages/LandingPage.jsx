import {useState} from 'react';
import { Button,TextField,List,ListItem,ListItemButton,ListItemText } from  '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import {TODO_STATUS} from '../constants/todoStatus'; 
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import '../styles/LandingPage.css';



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
  const [todo,setTodo] = useState('');
  
  const saveTodo = () =>{
    //condition where blank value is not accepted
    if(todo !== '') {
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

  const editTodo = (todoObj) => {
    setTodo(todoObj.content)

    const cloneArray = [...todolist] //[...] spread operator
    const getTodoIndex = cloneArray.findIndex((eachTodo) => eachTodo.id === todoObj.id)

    if(getTodoIndex !== -1){
      cloneArray.splice(getTodoIndex,1)
      setTodolist(cloneArray)
    }
  }


  return (
   <div className='container'>
    <div>
    <TextField 
      onChange={(et) => setTodo(et.target.value)}
      id="outlined-basic"
      label="Todo"
      variant="outlined"
      value ={todo}
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
          
            // let defaultStyle = {color:"black"}
            // if(eachTodo.status === TODO_STATUS.COMPLETED){
            //   defaultStyle = {color:'blue'}
            // }
            // if(eachTodo.status === TODO_STATUS.DELETED){
            //   defaultStyle = {color:'red'}
            // }

            let defaultStyle = { marginBottom: 5, paddingRight: 5}

            if(eachTodo.status === TODO_STATUS.COMPLETED) {
              defaultStyle = { ...defaultStyle, backgroundColor: '#0096FF', color: 'white' }
            }
            else if(eachTodo.status === TODO_STATUS.DELETED) {
              defaultStyle = { ...defaultStyle, backgroundColor: 'lightgrey', color: 'white' }
            }
          return(
          <ListItem 
            disablePadding
            style={defaultStyle}
            className='todoItemsContainer' 
            key={key}
            disabled={eachTodo.status === TODO_STATUS.DELETED ? true : false}
            >
            <ListItemButton   onClick={()=>editTodo(eachTodo)}>
              <ListItemText primary={eachTodo.content} />
            </ListItemButton>
            {
            eachTodo.status === TODO_STATUS.ACTIVE &&
              <Button size="small" color="success" onClick={() => completedTodo(eachTodo.id)}>
                <CheckCircleOutlineIcon />
              </Button>
          }

          {
            eachTodo.status !== TODO_STATUS.DELETED &&
              <Button size="small" color="error" onClick={() => deleteTodo(eachTodo.id)}>
                <RemoveCircleIcon />
              </Button>
          }
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
