import React from 'react';
import { useNavigate } from 'react-router-dom';

const ANavebar = () => {
    const navigate = useNavigate();

    const handleProjectClick = () => {
      navigate('/:projectId');
    };
    const ProjectClick = () => {
      navigate('/Time');
    };
    const Click = () => {
      navigate('/Dashboard');
    };
    return (
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-white">Your Project</span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {/* <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Work</a> */}
                  <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={handleProjectClick}>Project</a>
                  <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={ProjectClick}>Time</a>
                  <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" onClick={Click}>Dashboard</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  


};

export default ANavebar;
