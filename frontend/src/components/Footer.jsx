import React from 'react';
import { ChefHat, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-orange-50 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-orange-500 text-xl font-bold">HomeTiffin</span>
            </div>
            <p className="text-gray-400">Connecting food lovers with home chefs for authentic, homemade meals.</p>
          </div>
          
          <div>
            <h3 className="text-lg text-orange-500 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-orange-500">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500">Browse Tiffins</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500">Become a Provider</a></li>
              <li><a href="#" className="text-gray-400 hover:text-orange-500">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg text-orange-500 font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>support@hometiffin.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Mon - Sat: 9:00 AM - 8:00 PM</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg text-orange-500 font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} HomeTiffin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;