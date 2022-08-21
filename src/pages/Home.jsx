import { useLocation, useParams, useRoutes } from 'react-router-dom';
import '../styles/App.css';



const Home = () => {

const location = useLocation()
const {state} = location



  return (
    <div >
      <p>hi {state.firstName}</p>
      <p>{state.desc}</p>
    </div>
  );
}

export default Home;
