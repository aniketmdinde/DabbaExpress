import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <>
            {/* Navbar */}
            <div className="navbar bg-base-100 w-full px-4 h-20 shadow-xl">
                {/* Drawer Toggle Button (Menu) */}
                <div className="navbar-start">
                    <label htmlFor="drawer-toggle" className="btn btn-ghost btn-circle md:hidden block">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    </label>
                    <Link to={"/dashboard"} className="btn btn-ghost text-xl">
                        TiffinWala
                    </Link>
                </div>

                {/* Right-side actions */}
                <div className="navbar-end flex gap-2">
                    {isSearchOpen && (
                        <input
                            type="text"
                            className="input input-bordered w-48 md:w-64 transition-all duration-300"
                            placeholder="Search..."
                        />
                    )}

                    {/* Search Button */}
                    <button
                        className={`btn btn-ghost btn-circle ${isSearchOpen ? "bg-gray-400" : ""}`}
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>

                    {/* Notification Button */}
                    <button
                        className="btn btn-ghost btn-circle"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
                    <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://placehold.co/40x40" alt="User Avatar" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <Link to="/settings">Settings</Link>
                        </li>
                        <li>
                            <button onClick={() => setIsLoggedIn(false)}>Logout</button>
                        </li>
                    </ul>
                </div>
                </div>
            </div>

            {/* Notification Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-xl font-semibold">Notifications</h2>
                        <p className="text-gray-600 mt-2">You have no new notifications.</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="btn btn-primary"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Drawer Component */}
            <input type="checkbox" id="drawer-toggle" className="drawer-toggle hidden" />
            <div className="drawer-side">
                <label htmlFor="drawer-toggle" className="drawer-overlay"></label>
                <div className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
                    <h2 className="text-lg font-semibold mb-4">Menu</h2>
                    <ul className="space-y-2">
                        <li>
                            <Link to={"/dashboard"} className="btn btn-outline w-full">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to={"/orders"} className="btn btn-outline w-full">
                                Orders
                            </Link>
                        </li>
                        <li>
                            <Link to={"/profile"} className="btn btn-outline w-full">
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link to={"/settings"} className="btn btn-outline w-full">
                                Settings
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;
