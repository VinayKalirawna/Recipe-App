import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-[#BB3E00] text-white px-4 sm:px-6 py-3 sm:py-4 shadow-md rounded-md mb-6 sm:mb-10">
     <h1 className="text-xl sm:text-2xl font-bold tracking-wide mb-3 sm:mb-0">🍲 Cook Guide Book</h1>
      <div className="flex flex-wrap justify-center sm:justify-end gap-x-4 sm:gap-x-6 gap-y-2 text-base sm:text-lg">
        <NavLink
          to="/"
          className={({ isActive }) =>
          isActive
          ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1": "hover:text-yellow-400 transition-colors duration-200"}
        >
          Home
        </NavLink>
        <NavLink
          to="/recipe"
          className={({ isActive }) =>
          isActive
          ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1": "hover:text-yellow-400 transition-colors duration-200"}
        >
          Recipe
        </NavLink>
        <NavLink
          to='/create'
          className={({ isActive }) =>
          isActive
          ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1": "hover:text-yellow-400 transition-colors duration-200"}
        >
          Create
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
          isActive
          ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1": "hover:text-yellow-400 transition-colors duration-200"}
        >
          About
       </NavLink>
      </div>
    </div>
 )
}
export default Navbar