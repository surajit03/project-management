import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import './App.css';
import { Toaster } from "react-hot-toast";

import Home from './pages/Home.jsx';
import JoinUs from './pages/JoinUs.jsx';
import Navebar from './components/Navebar.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import ANavebar from './components/ANavebar.jsx';
// import Menu from './components/Menu.jsx';
import Dashboard from './pages/Dashboard.jsx'
import Time from './pages/Time.jsx'
import Issue from './pages/Issue.jsx'
import Calendar from './pages/Calendar.jsx'
import Timeline from './pages/TimeLine.jsx'
import AppLayout from './components/AppLayout.js'
import Task from './components/Task.js'
// import Sidebar from './components/Sidebar.js'



const App = () => {
  const { user } = useSelector((state) => state.user);// Add this line to define currentRole
  console.log(user);
  return (


    <div className='App</div>'>
      {user ? (
        // <Router>
        //   <div className='navebar' style={{ borderBottom: '1px solid white' }}>
        //     <ANavebar />
        //   </div>
        //   <div>
        //     <AppLayout />
        //     <div className="w-[220px]</div>">
        //       <Toaster
        //         position="top-right"
        //         gutter={8}
        //       />
        //     </div>
        //     <div className='rout' style={{ display: 'block', margin: '2px' }}>
        //       <Routes>
        //         <Route path="/" element={
        //           <div className="flex flex-col items-center w-full pt-10">
        //             <img src="./image/welcome.svg" className="w-5/12" alt="" />
        //             <h1 className="text-lg text-gray-600">Select or create new project</h1>
        //           </div>

        //         } />

        //         <Route path="/Dashboard" element={<Dashboard />} />
        //         <Route path="/Time" element={<Time />} />
        //         <Route path="/Issue" element={<Issue />} />
        //         <Route path="/Calendar" element={<Calendar />} />
        //         <Route path="/Timeline" element={<Timeline />} />
        //         <Route path="/:projectId" element={<Task />} />
        //         <Route path="/Contact" element={<Contact />} />

        //       </Routes>
        //     </div>
        //   </div>
        // </Router>
        <Router>
        <AppLayout>
          <Toaster
            position="top-right"
            gutter={8}
          />
          <Routes>
            <Route path="/:projectId" element={<Task />} />
            <Route path="/" element={
              <div className="flex flex-col items-center w-full pt-10">
                <img src="./image/welcome.svg" className="w-5/12" alt="" />
                <h1 className="text-lg text-gray-600">Select or create new project</h1>
              </div>
            } />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Time" element={<Time />} />
          </Routes>
        </AppLayout>
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
