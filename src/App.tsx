import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Menu from './components/Menu';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Route } from 'react-router-dom';
import Users from './pages/Users';
import Register from './pages/Register';

function App() {
  return (
      <div className="App">
      <BrowserRouter>
      {/* fungsinya untuk routing */}
            <Route path={'/'} exact component={Dashboard} />  
            <Route path={'/users'} component={Users} />
            <Route path={'/register'} component={Register} />
      </BrowserRouter>
    </div>
  );
}

export default App;
