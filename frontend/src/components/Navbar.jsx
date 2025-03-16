import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChefHat, LogOut, User } from 'lucide-react';
import Lottie from "lottie-react";
import animation1 from "./../../public/animations/chef.json";
import logo from "../../public/images/home.png"
import logo1 from "./../../public/images/tiffin.png"
import logo2 from "./../../public/images/provider.png"
import logo3 from "./../../public/images/login.png"

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="bg-orange-50 shadow-md fixed w-full z-50">
      <div className="w-100% mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 w-100%">
          <div className="flex items-center">
            <Link to="/" className="flex  items-center">
            <Lottie animationData={animation1} className="w-32 mx-auto" />
              <span className="ml-2 text-3xl font-bold text-orange-500">HomeTiffin</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-evenly w-7/12 ">
            <div className="flex flex-col items-center">
              <img src={logo} alt="Logo" className="w-8 h-8" />
              <Link to="/" className="text-black font-serif hover:text-orange-500 font-bold">Home</Link>
            </div>
            <div className="flex flex-col items-center">
              <img src={logo1} alt="Logo" className="w-8 h-8" />
              <Link to="/browse" className="text-black font-serif hover:text-orange-500 font-bold">Browse Tiffins</Link>
            </div>
            <div className="flex flex-col items-center">
              <img src={logo2} alt="Logo" className="w-8 h-8" />
              <Link to="/become-provider" className="text-black font-serif hover:text-orange-500 font-bold">Become a Provider</Link>
            </div>
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="flex items-center text-gray-600 hover:text-orange-500">
                  <User className="h-5 w-5 mr-1" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center">
                  <img src={logo3} alt="Logo" className="w-8 h-8" />
                  <Link to="/login" className="text-black hover:text-orange-500 font-serif font-bold">Login</Link>
                </div>
                <Link to="/signup" className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;