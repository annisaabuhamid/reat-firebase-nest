import {useState, useEffect} from 'react';
import { Button,TextField } from  '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import {TODO_STATUS} from '../constants/todoStatus'; 
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import '../styles/LandingPage.css';
import { TodoList } from '../components/TodoList';
import { firestore } from '../initFirebase';
import {  collection, doc, setDoc , getDocs ,onSnapshot} from "firebase/firestore";



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
  
  const [completedtodolist, setCompletedtodolist ] = useState([]);
  
  const [deletedtodolist, setDeletedtodolist ] = useState([]);
  
  const [todo,setTodo] = useState('');

  const [isLoadDone,setLoadDone] = useState(false)

  useEffect(() => {
    if(isLoadDone === true) {
      const unsub = onSnapshot(doc(firestore, "anisa-react-todo-app", "8szY9XM76YSh55vtIT3o"), (doc) => {
          console.log("Current data: ", doc.data());

          const data = doc.data();
          const cloneTodo = [...todolist]
          const getTndex = cloneTodo.findIndex((each) => each.id === data.id)
          cloneTodo[getTndex] =data;
          setTodolist(cloneTodo)
      });

      return () => {
        unsub();
      } 
    }
  },[isLoadDone])

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

        saveToFB(transformTodo)
        setTodolist(cloneArray)
        setTodo("")

  }
}
  
  const completedTodo =(id) => {
    const cloneArray = [...todolist] //[...] spread operator
    const getTodoID = cloneArray.findIndex((eachTodo) => eachTodo.id === id)


    if (getTodoID !== -1){
      const completedArr = [...completedtodolist] //[...] spread operator

      //push new recod to array
      completedArr.push({
        ...cloneArray[getTodoID],
        status: TODO_STATUS.COMPLETED
      })

      setCompletedtodolist(completedArr)
      cloneArray.splice(getTodoID,1)

      setTodolist(cloneArray)
    }
   

  }

  const deleteTodo =(id) => {
    const cloneArray = [...todolist] //[...] spread operator
    const completeArray = [...completedtodolist] //[...] spread operator
    const allTodoArray =cloneArray.concat(completeArray)
    const getTodoIndex = allTodoArray.findIndex((eachTodo) => eachTodo.id === id)


    if (getTodoIndex !== -1){

      const deleteArr =[...deletedtodolist]


      deleteArr.push({
        ...cloneArray[getTodoIndex],
        status: TODO_STATUS.DELETED
      })

      setDeletedtodolist(deleteArr)
      
      if(getTodoIndex > (cloneArray.length - 1)){
        const getIndex = getTodoIndex - cloneArray.length
        completeArray.splice(getIndex,1)
        setCompletedtodolist(completeArray)

      }else{
        cloneArray.splice(getTodoIndex,1)
        setTodolist(cloneArray)
      }

    }
   
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

  
  const keydownTemp = (evt) =>{

    console.log('evt',evt)
   if (evt.key === 'Enter' ){
      saveTodo()
   }

  }

  const saveToFB = async (todo) => {
    // Add a new document in collection "cities"
    //await need to async
      // await setDoc(addDoc(firestore, "cities", "LA"), {
      //   name: "Los Angeles",
      //   state: "CA",
      //   country: "USA"
      // });
      await setDoc(doc(firestore, "anisa-react-todo-app",todo.id), todo);
      alert('this already save')
  }

  const getAllTodo = async (todo) =>{
    const querySnapshot = await getDocs(collection(firestore, "anisa-react-todo-app"));
    const dataArr =[]
    querySnapshot.forEach((doc)=>{
      dataArr.push(doc.data())
    });

    setTodolist(dataArr)
    setLoadDone(true)
  }
    useEffect(() => {
          // Get all the todo
          getAllTodo()
        }, []
  )

  return (
   <div className='container'>
    <div>
    <TextField 
      onChange={(et) => setTodo(et.target.value)}
      id="outlined-basic"
      label="Todo"
      variant="outlined"
      value ={todo}
      onKeyDownCapture={keydownTemp}
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

      <TodoList
        todoArr = {todolist}
        editTodo = {editTodo}
        completedTodo = {completedTodo}
        deleteTodo = {deleteTodo}
      />
      
      <TodoList
        todoArr = {completedtodolist}
        editTodo = {editTodo}
        completedTodo = {completedTodo}
        deleteTodo = {deleteTodo}
      />
       <TodoList
        todoArr = {deletedtodolist}
        editTodo = {editTodo}
        completedTodo = {completedTodo}
        deleteTodo = {deleteTodo}
      />
      </div>
   </div>
 
    
  );
}
 

export default LandingPage;
