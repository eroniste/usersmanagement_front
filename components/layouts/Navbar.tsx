import { useState } from "react";
import { FaUsersGear } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import React from "react";
import Router from "next/router";



const Navbar: React.FC<any> = ({  }) => {
  return (
    <nav className={`bg-white shadow-md border-gray-200 w-full z-20 realtiv  flex`}>
      <div className="flex items-center justify-between p-4 w-full">
        <a href="http://localhost:3000" className="flex items-center space-x-3 rtl:space-x-reverse w-[20%]">
          <h1 className={cn("text-xl font-semibold drop-shadow-md flex justify-center items-center")}>
            <FaUsersGear className="w-8 h-8 text-blue-500 mr-5" />
            User Management
          </h1>
        </a>
        <div> 
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-80 text-white text-sm font-medium rounded-md m-2" onClick={() => Router.push('/LoginPage')}>
            Signup
          </button> 
          <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-80 text-white text-sm font-medium rounded-md" onClick={() => Router.push('/LoginPage')}>
            Signin
          </button>
        </div>
      </div>
          
    </nav>
  );
};

export default Navbar;
