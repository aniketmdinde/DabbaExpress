import React from 'react';

const SearchFood = () => {



    









  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side - Map */}
      <div className="w-full md:w-1/2 lg:w-1/3 h-1/2 md:h-full">
        <div className="bg-blue-200 h-full">
          {/* Replace this div with your map component */}
          Map
        </div>
      </div>

      {/* Right Side - Search Box, Location Field, and Cards */}
      <div className="w-full md:w-1/2 lg:w-2/3 h-1/2 md:h-full overflow-y-auto p-4">
        {/* Heading */}
        <h1 className="text-2xl font-bold mb-4">Search the Food</h1>

        {/* Search and Location Fields */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search for food..."
            className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            placeholder="Enter location..."
            className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Nearby Locations Text */}
        <p className="text-sm text-gray-600 mb-4 cursor-pointer hover:underline">
          Show nearby locations
        </p>

        {/* Cards */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="font-bold">Food Place {item}</h2>
              <p className="text-sm text-gray-600">123 Main St, City, Country</p>
              <p className="text-sm text-gray-600">Rating: 4.5/5</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFood;