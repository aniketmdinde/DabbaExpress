import React from 'react';
import { Search } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen">
      <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"
      }}>
        <span className="w-full h-full absolute opacity-60 bg-black"></span>
      </div>
      
      <div className="container relative mx-auto">
        <div className="items-center flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
            <div className="animate-fade-in">
              <h1 className="text-white font-semibold text-5xl mb-8 animate-slide-up">
                Homemade Tiffin Service
              </h1>
              <p className="mt-4 text-lg text-gray-200 animate-fade-in-delay">
                Connect with local home chefs for authentic, homemade meals delivered to your doorstep.
                Experience the taste of home, wherever you are.
              </p>
              
              <div className="mt-12 relative">
                <div className="flex items-center bg-white rounded-lg shadow-xl p-2">
                  <Search className="h-6 w-6 text-gray-400 ml-2" />
                  <input
                    type="text"
                    placeholder="Search for tiffin providers in your area..."
                    className="w-full px-4 py-2 rounded-lg focus:outline-none"
                  />
                  <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-all transform hover:scale-105">
                    Search
                  </button>
                </div>
              </div>

              <div className="mt-8 flex justify-center space-x-4">
                <button className="bg-orange-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-orange-600 transition-all transform hover:scale-105">
                  Order Now
                </button>
                <button className="bg-transparent border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white hover:text-orange-500 transition-all transform hover:scale-105">
                  Become a Provider
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;