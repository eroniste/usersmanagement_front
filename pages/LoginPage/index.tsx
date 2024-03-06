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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  let fetcher = (url: string) => httpClientreq(url).then((r) => r.data);
  const { data, error } = useSWR(loggedIn ? "/currentUser" : null, fetcher);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        
      });
      console.log("kiljk",response)
      

      if (response.ok) {
        const data = await response.json(); // Parse the response body as JSON
        const accessToken = data.access_token; // Extract the access token from the response data
        console.log(data);
        if (accessToken) {
          localStorage.setItem("access_token", accessToken); // Store the access token in local storage
          
          setLoggedIn(true);
          window.location.href="/";
        } else {
          console.error("Access token not found in response");
        }
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  

  
  if (!data && loggedIn) return <div>Loading user data...</div>;
  console.log(data, "hoy");

  return (
    <>
      <title>Login Page</title>
      <div className="w-screen h-screen flex justify-center items-center">
        <form
          className="p-10 bg-white rounded-xl drop-shadow-lg space-y-5"
          onSubmit={handleLogin}
        >
          <h1 className="text-center text-3xl">Login Page</h1>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-light" htmlFor="email">
              Email
            </label>
            <input
              className="w-96 px-3 py-2 rounded-md border border-slate-400"
              type="username"
              placeholder="Your username"
              name="username"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-light" htmlFor="password">
              Password
            </label>
            <input
              className="w-96 px-3 py-2 rounded-md border border-slate-400"
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input type="checkbox" name="remember" id="remember" />
            <label className="text-sm font-light" htmlFor="remember">
              Remember me
            </label>
          </div>
          <button
            className="w-full px-10 py-2 bg-blue-600 text-white rounded-md
      hover:bg-blue-500 hover:drop-shadow-md duration-300 ease-in"
            type="submit"
          >
            Sign In
          </button>
          <p className="text-right">
            <a
              className="text-blue-600 text-sm font-light hover:underline"
              href=""
            >
              Forget Password?
            </a>
          </p>
        </form>
      </div>
    </>
  );
}

LoginPage.getLayout = function getLayout(page) {
  return (
    <>
      <Navbar></Navbar>
      <div>{page}</div>
    </>
  );
};

export default LoginPage;

function revalidate() {
  throw new Error("Function not implemented.");
}

function setLoggedIn(arg0: boolean) {
  throw new Error("Function not implemented.");
}
