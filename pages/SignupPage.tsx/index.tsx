import Navbar from "@/components/layouts/Navbar";
import launch_toast from "@/lib/launch_toast";
import handler from "@/pages/api/hello";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm } from 'react-hook-form';
import httpClientreq from "@/lib/httpClientreq";
import useSWR from "swr";



export default function UsersForm({ usersFromServer }: any) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [image, setImage] = useState<File | null>(null);
  

  const onSubmit = async (formData) => {
    
    try {
      const response = await axios.post("http://localhost:8080/signup", formData);
      window.location.href = "/";
      
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };
  
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
        <h3 className="text-2xl font-bold text-center">Admin registration</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    {...register("firstName", { required: true })}
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
                    {...register("lastName", { required: true })}
                  />
                </label>
              </label>
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="email">
                Email
                <label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    id="email"
                    {...register("email", { required: true })}
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
                    
                    id="username"
                    {...register("username", { required: true })}

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
                    {...register("birthDate", { required: true })}
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
                    
                    id="password"
                    {...register("password", { required: true })}

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