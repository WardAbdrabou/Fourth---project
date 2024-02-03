import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/Website/HomePage';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Users from './Pages/Dashboard/Users';
import GoogleCallBack from './Pages/Auth/GoogleCallBack';
import Dashboard from './Pages/Dashboard/Dashboard';
import RequireAuth from './Pages/Auth/RequireAuth';
import User from './Pages/Dashboard/User';
import AddUser from './Pages/Dashboard/AddUser';
import Err403 from './Pages/Auth/403';
import Writer from './Pages/Dashboard/Writer';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* public Route */}
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/auth/google/callback' element={<GoogleCallBack></GoogleCallBack>}></Route>

        {/* Protected Route */}
        <Route element={<RequireAuth allowedRole={['1996' , '1995']}></RequireAuth>}>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}>
            <Route element={<RequireAuth allowedRole={"1995"}></RequireAuth>}>
            <Route path="users" element={<Users></Users>}></Route>
            <Route path="users/:id" element={<User></User>}></Route>
            <Route path='user/add' element={<AddUser></AddUser>}></Route>
          </Route>
          <Route element={<RequireAuth allowedRole={["1996", "1995"]}></RequireAuth>}>
            <Route path='writer' element={<Writer></Writer>}></Route>
          </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

