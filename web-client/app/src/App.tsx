import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const api_url = process.env.REACT_APP_API_URL;


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
          <div>NODE ENV ? <p className="text-red-600"> {process.env.NODE_ENV}</p></div>
          <div>HI ? <p className="text-red-600"> { api_url } </p></div>
          <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
