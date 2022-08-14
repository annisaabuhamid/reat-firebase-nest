import {useState} from 'react';
// import logo from './logo.svg';
import './App.css';


//es6
//Hook
//mutate
//name hold the value, setNAme for change the value
const App = () => {

  const [name, setName ] = useState('hi');
  const updateNameState = (element) =>{
    const value = element.target.value;
    setName(value);
  }
  return (
    <div className='container'>
      <p>My Name is : {name}</p>
      <input type="text" id="name"  onChange={updateNameState} />
    </div>
  );
}

export default App;
