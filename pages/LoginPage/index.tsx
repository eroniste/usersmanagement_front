import React, { useEffect, useState } from "react";
import SigninForm from "../../components/SigninForm";
import SignupForm from "../../components/SignupForm";
import LeftOverlayContent from "../../components/LeftOverlayContent";
import RightOverlayContent from "../../components/RightOverlayContent";
import useSWR from "swr";
import axios from "axios";
import Navbar from "@/components/layouts/Navbar";
import httpClientreq from "@/lib/httpClientreq";


function LoginPage() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  let fetcher = (url: string) => httpClientreq(url).then((r) => r.data)
  const { data, error } = useSWR(loggedIn ? '/currentUser' : null ,fetcher);
  
  
 

   

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/signin`, {       method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json(); // Parse the response body as JSON
      const accessToken = data.access_token; // Extract the access token from the response data
      console.log(data)
      if (accessToken) {
        localStorage.setItem("access_token", accessToken); // Store the access token in local storage
        fetcher = (url: string) => httpClientreq(url).then((r) => r.data)
        setLoggedIn(true);
      } else {
        console.error('Access token not found in response');
      }
      } else {
        console.error('Login failed');  
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = () => {
    // Perform logout logic here
    setLoggedIn(false);
  };
  

  if (error) return <div>Error loading user data</div>;
  if (!data && loggedIn) return <div>Loading user data...</div>;
  console.log(data, "hoy")
  
  return (
    <div>
      {loggedIn ? (
        <div>
          <p>Welcome, {data.username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
}

LoginPage.getLayout = function getLayout(page) {
  return (
    <>
    <Navbar></ Navbar>
    <div>{page}</div>
    </>
  )
}

export default LoginPage;

function revalidate() {
  throw new Error("Function not implemented.");
}

function setLoggedIn(arg0: boolean) {
  throw new Error("Function not implemented.");
}

