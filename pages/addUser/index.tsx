import Navbar from "@/components/layouts/Navbar";
import launch_toast from "@/lib/launch_toast";
import handler from "@/pages/api/hello";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";


export default function UsersForm({ usersFromServer }: any) {
  const [image, setImage] = useState<File | null>(null);
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: "",
    username: "",
    image,
  });
   function  Toastr() {
    useEffect(() => {
      const toast = document.getElementById('toast');      
      setTimeout(() => {
        toast.remove;
        // Add your redirection logic here
      }, 5000);
    }, []); // Empty dependency array to ensure useEffect runs only once
  
    return null; // Return null because this component doesn't render anything
  }
  

  const handleChange = (e: { target: { id: any; value: any } }) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();    
    try {
      
      const response = await axios.post(
        "http://localhost:8080/users",
        formData
      );

      window.location.href="/";

      
      console.log("Form submitted successfully", response.data);
    } catch (error) {
      
      console.error("Error submitting form", error);
    }
    
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
        <h3 className="text-2xl font-bold text-center">Join us</h3>
        <form action="">
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="Name">
                firstName
                <label>
                  <input
                    type="text"
                    placeholder="firstName"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    id="firstName"
                    onChange={handleChange}
                    value={formData.firstName}
                  />
                </label>
              </label>
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="email">
                lastName
                <label>
                  <input
                    type="text"
                    placeholder="lastName"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    id="lastName"
                    onChange={handleChange}
                    value={formData.lastName}
                  />
                </label>
              </label>
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="email">
                Email
                <label>
                  <input
                    type="text"
                    placeholder="Email"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    id="email"
                    onChange={handleChange}
                    value={formData.email}
                  />
                </label>
              </label>
            </div>
            <div className="mt-4">
              <label className="block">
                username
                <label>
                  <input
                    type="text"
                    placeholder="username"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    onChange={handleChange}
                    id="username"
                    value={formData.username}
                  />
                </label>
              </label>
            </div>
            <div className="mt-4">
              <label className="block">
                birthdate
                <label>
                  <input
                    type="date"
                    id="birthDate"
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    value={formData.birthDate}
                  />
                </label>
              </label>
            </div>
            <div className="mt-4">
              <label className="block">
                Password
                <label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    onChange={handleChange}
                    id="password"
                    value={formData.password}
                  />
                </label>
              </label>
            </div>
            <div className="mt-4">
              <label className="block">
                Your image
                <label>
                  <input
                    type="file"
                    name="image"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </label>
              </label>
            </div>

            <div className="flex">
              <button
                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  handleSubmit(e)
                }
              >
                Create Account
              </button>
            </div>
          </div>
        </form>
        <ToastContainer  />
      </div>
    </div>
  );
}

UsersForm.getLayout = function getLayout(page) {
    return (
      <>
      <Navbar></ Navbar>
      
      <div>{page}</div>
      </>
    )
  }