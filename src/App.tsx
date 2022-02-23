import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Menu from './components/Menu';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Route } from 'react-router-dom';
import Users from './pages/users/Users';
import Register from './pages/Register';
import Login from './pages/Login';
import Learn_setState from './pages/Learn_setState';
import CreateUser from './pages/users/CreateUser';
import EditUser from './pages/users/UpdateUser';
import UpdateUser from './pages/users/UpdateUser';
import Roles from './pages/roles/Roles';
import CreateRoles from './pages/roles/CreateRoles';
import UpdateRole from './pages/roles/UpdateRole';
import CreateRole from './pages/roles/CreateRoles';

function App() {
  return (
      <div className="App">
      <BrowserRouter>
      {/* fungsinya untuk routing */}
            <Route path={'/'} exact component={Dashboard} />  
            <Route path={'/register'} component={Register} />
            <Route path={'/login'} component={Login} />
            <Route path={'/learn'} component={Learn_setState} />
            <Route path={'/users'} exact component={Users} />
            <Route path={'/users/create'} component={CreateUser} />
            <Route path={'/users/:id/edit'} component={UpdateUser} />
            <Route path={'/roles'} exact component={Roles} />
            <Route path={'/roles/create'} exact component={CreateRole} />
            <Route path={'/roles/:id/edit'} exact component={UpdateRole} />
      </BrowserRouter>
    </div>
  );
}

export default App;
