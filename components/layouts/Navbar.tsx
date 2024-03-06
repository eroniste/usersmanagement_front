import { useEffect, useState } from "react";
import { FaUsersGear } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import React from "react";
import Router, { useRouter } from "next/router";
import httpClientreq from "@/lib/httpClientreq";
import useSWR from "swr";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"





const Navbar: React.FC<any> = ({  }) => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loggOut, setLoggOut] = useState<boolean>(true);

  const fetcher = (url: string) => httpClientreq(url).then((r) => r.data);
  const { data, isLoading, error } = useSWR(
    `/currentUser`,
    fetcher
  );
  
  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('access_token');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [loggOut]); 

  const handleSignout = () => {
    localStorage.removeItem('access_token');
    setLoggOut(!loggOut)
    router.push('/');
    
    
  };
  
  
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
          {loggedIn ? (
            <div className="flex flex-row">
              <DropdownMenu>
  <DropdownMenuTrigger>{data && <img src={data.image} className="w-12 h-12 mx-2 overflow-hidden rounded-full"/>}</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem><button onClick={() => router.push('/Userspage')}>My users</button></DropdownMenuItem>
    
    <DropdownMenuItem><button onClick={handleSignout}>Signout</button></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

            
            
<span> username </span>

            </div>
          ) : (
            <>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-80 text-white text-sm font-medium rounded-md m-2" onClick={() => router.push('/SignupPage')}>
                Signup
              </button> 
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-80 text-white text-sm font-medium rounded-md" onClick={() => router.push('/LoginPage')}>
                Signin
              </button>
            </>
          )}
        </div>
      </div>
          
    </nav>
  );
};

export default Navbar;
