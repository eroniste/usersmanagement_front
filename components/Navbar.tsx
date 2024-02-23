

import { useState } from "react";
import { Poppins } from "next/font/google";
import { FaUsersGear } from "react-icons/fa6";

import { cn } from "@/lib/utils";



const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
interface NavbarProps {
  darkMode?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode = false }) => {
  return (
    
    <nav
      className={`bg-white shadow-md border-gray-200 w-full z-20 realtiv ${
        darkMode ? "dark:bg-gray-900" : ""
      } flex` }
    >
      <div className="flex  items-center justify-between  p-4 w-full">
      
        <a
          href="http://localhost:3000"
          className="flex items-center space-x-3 rtl:space-x-reverse w-[20%]"
        >
          <h1
            className={cn(
              "text-xl font-semibold drop-shadow-md flex justify-center items-center",
              font.className
            )}
          >
            <FaUsersGear className="w-8 h-8 text-blue-500 mr-5" />
             User Management
          </h1>
        </a>
<div > 
      <button class="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-80 text-white text-sm font-medium rounded-md m-2">
	Signup
  </button>
  <button class="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-80 text-white text-sm font-medium rounded-md ">
	Signin
  </button>
  
  </div>
       
        
      </div>
    </nav>
  );
};

export default Navbar;
