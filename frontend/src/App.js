import './App.css';
import Navbar from './Components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';

function App() {
  return (
    <div className="App">
      <Navbar/>

      {/* All Routes */}
        <Routes> 
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          {/* <Route path='/login/verify' element={}/> */}
        </Routes>
    </div>
  );
}

export default App;
