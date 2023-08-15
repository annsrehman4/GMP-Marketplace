import './App.css';
import FrontPage from './components/frontpage';
import { Route  ,BrowserRouter, Routes } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import { UserAuthContextProvider } from './context/UserAuthContextProvider';
import Home from './components/home';


function App() {
  return (
    <BrowserRouter>
    <UserAuthContextProvider>
    <Routes>
    <Route path='/home' element= {<Home/>}></Route>
      <Route path='/' element= {<FrontPage/>}></Route>
      <Route path='/login' element= {<Login/>}></Route>
      <Route path='/signup' element= {<Signup/>}></Route>
    </Routes>
    </UserAuthContextProvider>
    </BrowserRouter>
    
  );
}


export default App;