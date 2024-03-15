import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [isPlanningOpen, setIsPlanningOpen] = useState(false);
  const [isDevelopmentOpen, setIsDevelopmentOpen] = useState(false);
  const navigate = useNavigate();

  const handlePlanningClick = () => {
    setIsPlanningOpen(!isPlanningOpen);
  };

  const handleDevelopmentClick = () => {
    setIsDevelopmentOpen(!isDevelopmentOpen);
  };

  const handleIssueClick = () => {
    navigate("/Issue");
  };

  const handleTimelineClick = () => {
    navigate("/Timeline");
  };

  const handleCalendarClick = () => {
    navigate("/Calendar");
  };

  return (
    <div className="h-screen bg-gray-800">
      <div className="flex flex-col justify-center items-center h-1/6">
        <h1 className="text-white text-2xl font-bold">Project Name</h1>
      </div>
      <div className="flex flex-col justify-start items-start h-2/3 ml-4">
        <div className="">
          <h2 className="text-white text-lg cursor-pointer m-3" onClick={handlePlanningClick}>
            Planning 
          </h2>
          {isPlanningOpen && (
            <ul>
              <li className="text-white text-lg m-1 cursor-pointer" onClick={handleIssueClick}>Issue</li>
              <li className="text-white text-lg m-1 cursor-pointer" onClick={handleTimelineClick}>Time line</li>
              <li className="text-white text-lg m-2 cursor-pointer" onClick={handleCalendarClick}>Calendar</li>
            </ul>
          )}
        </div>
      
          <h2 className="text-white text-lg cursor-pointer m-3" onClick={handleDevelopmentClick}>
            development
          </h2>
          {isDevelopmentOpen && (
            <ul>
              <li className="text-white text-lg m-1 cursor-pointer">Git integration</li>
              <li className="text-white text-lg m-2 cursor-pointer">Dev Environment</li>
            </ul>
          )}
       
      </div>
    </div>
  );
};

export default Menu;
