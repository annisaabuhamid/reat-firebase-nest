import {useParams} from 'react-router-dom';
import '../styles/App.css';

const HomeWithId = () => {

const param = useParams()

  return (
    <div >
      <p>hi {param.id}</p>
    
    </div>
  );
}

export default HomeWithId;
