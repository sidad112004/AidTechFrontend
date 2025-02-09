import React, { useState } from 'react';
import { FaBars, FaHome, FaTasks, FaHistory, FaEnvelope, FaCoins } from 'react-icons/fa';

function Navbar() {
  // Using useState for dynamic coin count
  const [coins, setCoins] = useState(120);

  return (
    <nav className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50">
      {/* Left: App Name */}
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">MyApp</a>
      </div>

      {/* Center: Menu */}
      <div className="navbar-center">
        {/* Desktop Menu */}
        <ul className="menu menu-horizontal p-0 hidden lg:flex">
          <li>
            <a>
              <FaHome className="inline mr-1" />
              Home
            </a>
          </li>
          <li>
            <a>
              <FaTasks className="inline mr-1" />
              Active request
            </a>
          </li>
          <li>
            <a>
              <FaHistory className="inline mr-1" />
              Past request
            </a>
          </li>
          <li>
            <a>
              <FaEnvelope className="inline mr-1" />
              Contact
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger Menu */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <FaBars className="text-xl" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>
                <FaHome className="inline mr-1" />
                Home
              </a>
            </li>
            <li>
              <a>
                <FaTasks className="inline mr-1" />
                Active request
              </a>
            </li>
            <li>
              <a>
                <FaHistory className="inline mr-1" />
                Past request
              </a>
            </li>
            <li>
              <a>
                <FaEnvelope className="inline mr-1" />
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Right: Coins and Profile */}
      <div className="navbar-end flex items-center gap-4">
        {/* Coins Indicator with coin symbol and value side by side */}
        <div className="tooltip tooltip-bottom" data-tip="Coins">
          <div className="flex items-center gap-1">
            <FaCoins className="text-xl" />
            <span className="text-lg font-medium">{coins}</span>
          </div>
        </div>

        {/* Profile Dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://placeimg.com/80/80/people" alt="Profile" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
