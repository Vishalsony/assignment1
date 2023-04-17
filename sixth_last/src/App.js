
import './App.css';
import NavBar from './Components/NavBar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SpectusPage from './Components/SpectusPage';
import Pagination from './Components/Pagination';

function App() {
  
  return (
    <BrowserRouter>
    <div>
    <NavBar/>
    <Routes>
    <Route exact path='/' element={<SpectusPage/>}/>
     <Route exact path='/pagination' element={<Pagination/>}/> 
       
    </Routes>
   
    </div>
    </BrowserRouter>
  );
}

export default App;
