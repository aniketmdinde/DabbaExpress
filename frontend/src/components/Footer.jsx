import React from "react";

const Footer = () => {
  return (
    <>
      <div className="border-t border-gray-300"></div> {/* Divider */}
      <footer className="bg-gray-100 text-gray-800 px-6 py-10">
        <div className="container mx-auto flex flex-col md:flex-row md:justify-between">
          {/* Logo & Info */}
          <aside className="flex flex-col items-center md:items-start text-center md:text-left mb-6 md:mb-0">
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="fill-current text-blue-600 mb-2"
            >
              <path d="M22.672 15.226l-2.432.811..." />
            </svg>
            <p className="text-sm">
              ACME Industries Ltd.
              <br />
              Providing reliable tech since 1992
            </p>
          </aside>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm text-center md:text-left">
            {/* Services */}
            <nav>
              <h6 className="text-lg font-semibold mb-2">Services</h6>
              <a className="block hover:underline" href="#">User Login</a>
              <a className="block hover:underline" href="#">User Signup</a>
              <a className="block hover:underline" href="#">Provider Login</a>
              <a className="block hover:underline" href="#">Provider Signup</a>
            </nav>

            {/* Company */}
            <nav>
              <h6 className="text-lg font-semibold mb-2">Company</h6>
              <a className="block hover:underline" href="#">About Us</a>
              <a className="block hover:underline" href="#">Contact</a>
            </nav>

            {/* Legal */}
            <nav>
              <h6 className="text-lg font-semibold mb-2">Legal</h6>
              <a className="block hover:underline" href="#">Terms of Use</a>
              <a className="block hover:underline" href="#">Privacy Policy</a>
            </nav>
          </div>
        </div>

        {/* Bottom Right Section */}
        <div className="fixed bottom-5 right-5">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md">
            Contact Support
          </button>
        </div>
      </footer>
    </>
  );
};

export default Footer;
