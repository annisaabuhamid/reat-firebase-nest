import {useState, useEffect} from 'react';
import { Button,TextField } from  '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import {TODO_STATUS} from '../constants/todoStatus'; 
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
// import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import '../styles/LandingPage.css';
import { TodoList } from '../components/TodoList';
import { firestore } from '../initFirebase';
import {  collection, doc, setDoc , getDocs ,onSnapshot, updateDoc, deleteDoc} from "firebase/firestore";



const LandingPage = () => {
  
  
// TODO day 9
  /**
  delete
  update

  day 10
  merge
  login

   */


  const [todolist, setTodolist ] = useState([]);
  
  const [completedtodolist, setCompletedtodolist ] = useState([]);
  
  const [deletedtodolist, setDeletedtodolist ] = useState([]);
  
  const [todo,setTodo] = useState('');

  const [isLoadDone,setLoadDone] = useState(false)

  // useEffect(() => {
  //   if(isLoadDone === true) {
  //     const unsub = onSnapshot(doc(firestore, "anisa-react-todo-app", "8szY9XM76YSh55vtIT3o"), (doc) => {
  //         console.log("Current data: ", doc.data());

  //         const data = doc.data();
  //         const cloneTodo = [...todolist]
  //         const getTndex = cloneTodo.findIndex((each) => each.id === data.id)
  //         cloneTodo[getTndex] =data;
  //         setTodolist(cloneTodo)
  //     });

  //     return () => {
  //       unsub();
  //     } 
  //   }
  // },[isLoadDone, todolist])

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
  
  const updateStatus= async(todoID,status) => {

    try{
      const getDocbyId = doc(firestore,"anisa-react-todo-app",todoID);
      await updateDoc(getDocbyId,{
        status: status
      });
    }catch(err){
        // console.log(err)
    }

  }
  const completedTodo = async(id) => {


    try{
      const completeStatus = updateStatus(id,TODO_STATUS.COMPLETED)
      console.log('status',completeStatus)
      
    }catch(err){

    }
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

  const deleteTodo = async(id) => {



    //delete from firestore

    try{
      // const deleteStatus = updateStatus(id,TODO_STATUS.DELETED)
      // console.log('status',deleteStatus)
      await deleteDoc(doc(firestore,"anisa-react-todo-app",id));
    }catch(err){

    }




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

    const completedTodo = dataArr.filter(each => each.status === TODO_STATUS.COMPLETED)
    setCompletedtodolist(completedTodo)

    const deleteTodo = dataArr.filter(each => each.status === TODO_STATUS.DELETED)
    setDeletedtodolist(deleteTodo)

    const activeTodo = dataArr.filter(each => each.status === TODO_STATUS.ACTIVE)
    setTodolist(activeTodo)

   
    setLoadDone(true)
  }
  useEffect(() => {
        // Get all the todo
        getAllTodo()
      }, [])


  const saveToMerge = async (todo) => {
      await setDoc(doc(firestore, "anisa-react-todo-app",'0689743f-212a-4a2d-9912-c694daee9e8c'),
      {
          name:"annisa",
          day:"10", 
      },{ merge: true });
      
  }

  const saveToCreate = async (todo) => {
    await setDoc(doc(firestore, "anisa-react-todo-app",'0689743f-212a-4a2d-9912-c694daee9e8c'),
    {
        month:"october", 
        year:"2022",
        today:"sunday"
    });
    
  }

  const saveToAppend = async (todo) => {
    await updateDoc(doc(firestore, "anisa-react-todo-app",'0689743f-212a-4a2d-9912-c694daee9e8c'),
    {
        month:"october", 
        year:"2022",
        today:"friday"
    });
    
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
      onKeyDownCapture={keydownTemp}
      sx={{
        width:400,
      }} />
      <Button
      onClick={saveToMerge}
      variant="contained"
      size="large"
      sx={{
        height: 55,
        marginLeft: 2
      }}
      >SAVE TO MERGE
      </Button>

      <Button
      onClick={saveToAppend}
      variant="contained"
      size="large"
      sx={{
        height: 55,
        marginLeft: 2
      }}
      >SAVE TO APPEND
      </Button>

      <Button
      onClick={saveToCreate}
      variant="contained"
      size="large"
      sx={{
        height: 55,
        marginLeft: 2
      }}
      >CREATE/UPDATE
      </Button>
      </div>
      <div>

      <TodoList
        todoArr = {todolist}
        editTodo = {editTodo}
        completedTodo = {completedTodo}
        deleteTodo = {deleteTodo}
      />
      <h1>Completed List</h1>
      <TodoList
        todoArr = {completedtodolist}
        editTodo = {editTodo}
        completedTodo = {completedTodo}
        deleteTodo = {deleteTodo}
      />
      <h1>Deleted List</h1>
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
