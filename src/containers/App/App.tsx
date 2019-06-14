import React from 'react';
import './App.css';
import Login from '../../components/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <Login>
        <Route exact path='/' component={() => <div>Home</div>} />
      </Login>
    </Router>
  );
}

export default App;
