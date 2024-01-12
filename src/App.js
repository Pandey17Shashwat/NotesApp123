import './App.css';
import Landing from './components/landing/Landing';
import Navbar from './components/navbar/Navbar';
import { useSelector } from 'react-redux';
import Error from './error/Error';

function App() {
  const mode=useSelector((state)=>state.mode)
  return (
    <div className={mode?"App":"App app-dark"}>
        <Navbar />
        <Landing/>
        <div className='wrong'>
          <Error/>
        </div>
    </div>  
  );
}

export default App;
