import React from 'react';
import './App.css';
import logo from './assets/logo.svg';

import Routes from './routes';

// a componentização (método de desenvolver) é muito utilizada no React
// uma vez que permite a reutilização de código
// o componente nada mais é do que uma função do JS que retorna HTML (parecido com RN)
function App() {
  return (
    <div className="container">
      <img src={logo} alt="AirCnC"/>
      <div className="content">
        <Routes />
      </div>
    
    </div>

    
  );
}

export default App;
