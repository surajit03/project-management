import React from 'react';
import { useNavigate } from "react-router-dom";

const Navebar = () => {
  const navigate = useNavigate();

  const handleJoinUs = () => {
    navigate("/JoinUs");
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleAbout = () => {
    navigate("/about");
  };

  const handleContact = () => {
    navigate("/contact");
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800">
      <div className="flex items-center ml-8">
        <img src="logo.png" alt="Logo" className="w-8 h-8 mr-2" />
        <a href="/" onClick={handleHome} className="text-white hover:text-gray-300">Home</a>
        <a href="/About" onClick={handleAbout} className="ml-4 text-white hover:text-gray-300">About</a>
        <a href="/Contact" onClick={handleContact} className="ml-4 text-white hover:text-gray-300">Contact</a>
      </div>
      <button onClick={handleJoinUs} className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">Join Us</button>
    </nav>
  );
};

export default Navebar;
