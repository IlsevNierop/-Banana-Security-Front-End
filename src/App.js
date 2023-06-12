import React, {useContext} from 'react';
import {Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css';
import {AuthContext} from "./context/AuthContext";

function App() {
    const {isAuth} = useContext(AuthContext);

  return (
    <>
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/profile" element={isAuth? <Profile /> : <Home />} />
          <Route path="/signin" element={isAuth? <Home /> : <SignIn />} />
          <Route path="/signup" element={isAuth? <Home /> : <SignUp /> } />
        </Routes>
      </div>
    </>
  );
}

export default App;
