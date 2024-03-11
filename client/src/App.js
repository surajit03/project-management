import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import './App.css';
import Home from './pages/Home.jsx';
import JoinUs from './pages/JoinUs.jsx';
import Navebar from './components/Navebar.jsx'
import Dashboard from "./pages/Dashboard.jsx";

const App = () => {
  const { currentRole } = useSelector((state )=> state.user);
  console.log(currentRole);
  return (
    <Router>
       {currentRole === null &&
      <Routes>
              <Route path="Home" element={<Home />}> </Route>
              <Route index element={<Home />} />
              <Route path="JoinUs" element={<JoinUs />} />
              <Route path="Navebar" element={<Navebar/>} />
              <Route path="Dashboard" element={<Dashboard/>} />



      </Routes>} 
      {/* {currentRole === "user" &&
              <Route path="Navebar" element={<Navebar/>} />
            
      } */}
    </Router>
  );
}

export default App;
