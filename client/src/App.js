import React from 'react';
import './App.css';
import Typography from "@material-ui/core/Typography"
import AuthenticationContainer from "./pages"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AuthenticationContainer />
      </header>
    </div>
  );
}

export default App;
