import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import './App.css';
import Home from './pages/Home.jsx';
import JoinUs from './pages/JoinUs.jsx';
import Navebar from './components/Navebar.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import ANavebar from './components/ANavebar.jsx';
import Menu from './components/Menu.jsx';
import Dashboard from './pages/Dashboard.jsx'
import Issue from './pages/Issue.jsx'
import Calendar from './pages/Calendar.jsx'
import Timeline from './pages/TimeLine.jsx'


const App = () => {
  const { user } = useSelector((state) => state.user);// Add this line to define currentRole
  console.log(user);
  return (

    // <Router>
    //   {user === null &&
    //     <Routes>
    //       <Route path="/" element={<JoinUs />} />
    //       <Route path="/Navebar" element={<Navebar />} />
    //     </Routes>}
    //   {user === "user" &&
    //     <>
    //       <Route path="/Navebar" element={<Navebar />} />
    //     </>
    //   }
    // </Router>


    <div className='App'>
      {user ? (
        <Router>
          <div className='navebar' style={{borderBottom: '1px solid white' }}>
            <ANavebar />
          </div>
          <div className='menu' style={{ display: 'flex' }}>
            <div className='side-bar ' style={{width: '12%', borderRight: '2px solid red', borderLeft: 'none', borderTop: 'none', borderBottom: 'none'}}>
              <Menu />
            </div>
            <div className='rout' style={{ display: 'block', margin: '2px' }}>
              <Routes>

                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/Issue" element={<Issue />} />
                <Route path="/Calendar" element={<Calendar />} />
                <Route path="/Timeline" element={<Timeline />} />


              </Routes>
            </div>
          </div>
        </Router>
      ) : (
        <div>
          <Router>
            <div className='Inavebar'>
              <Navebar />
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/JoinUs" element={<JoinUs />} />
              <Route path="/About" element={<About />} />
              <Route path="/Contact" element={<Contact />} />

            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}


export default App;
