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
  return (
    <div className='container'>
      <p>My Name is : {name}</p>
      <input type="text" id="name"  onChange={updateNameState} />
      { /* add a way to route */}
      
      <button onClick={() => {  navigate(routeNames.HOME)  }}>Home</button>
    </div>
  );
}

export default LandingPage;
