import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthenticationContainer from "./pages"
import PostLogin from "./pages/postLogin.js"

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <AuthenticationContainer />
      </header> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthenticationContainer />}></Route>
          <Route path="/postLogin" element={<PostLogin />}>
          </Route>
        </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
