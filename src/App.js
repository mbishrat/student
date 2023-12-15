import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import { Route, Routes } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import ProtectedRoutes from './utils/ProtectedRoutes';
import { useContext, useEffect } from 'react';
import UserContext from './context/UserContext';
import setAuthToken from './utils/setAuthToken';
import Users from './components/users';

function App() {
  const token = localStorage.getItem("token");
const {fetchUserInfo } = useContext(UserContext);
  useEffect(() =>{
   if(token){
    setAuthToken(token)
    fetchUserInfo(token);
   }
  },[])
  return (
    <div>
    
      <Routes>
        <Route path='/signup' element={<SignUpForm/>}/>
        <Route path='/' element={<LoginForm/>}/>
        <Route element ={<ProtectedRoutes/>}>
        <Route path='/users' element={<Users/>}/>
        <Route path='/profile' element={<UserProfile/>}/>
        </Route>

      </Routes>
    
      
      
    </div>
  );
}

export default App;
