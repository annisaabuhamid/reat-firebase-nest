import { React } from "react";
import { TODO_STATUS } from "../constants/todoStatus";
import { List,Button,ListItem,ListItemButton,ListItemText,Typography } from  '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


export const TodoList = ({ todoArr,editTodo,completedTodo,deleteTodo,title = '' }) =>{


    return (
        
      todoArr.length > 0 && 
    <div style={{ marginTop: 30 }}>
      {
        title !== '' &&
        <Typography>{title}</Typography>
      }
      <List className='todoListContainer'>
        {
          todoArr.map((eachTodo, key) => {
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
              
              style={defaultStyle}
              className='todoItemsContainer' 
              key={key}
              disablePadding
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
             )
            })
          }
          </List>
        </div>
          
           
    )
}