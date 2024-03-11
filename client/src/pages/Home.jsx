import React from 'react';
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <nav className="flex items-center justify-between bg-gray-900 p-4">
        <div className="flex items-center">
          <img src="/path/to/logo.png" alt="Logo" className="h-8 w-8" />
          <h1 className="text-white ml-2 text-lg font-bold">Lending Page</h1>
        </div>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            <Link to="/JoinUs">Login</Link>
        </button>
      </nav>
      {/* Rest of the lending page content */}
    </div>
  );
};

export default Home;
