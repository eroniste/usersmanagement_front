import handler from "@/pages/api/hello";
import axios from "axios";
import React, { useState } from "react";



export function UsersForm({ usersFromServer }: any) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [formData, setformData] =useState({
    firstName,
    lastName,
    birthDate,
    email,
    password,
    username: "",
    image
  })// Store selected image file
  
  const handleChange = (e: { target: { id: any; value: any; }; }) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  

  // Handle form submission
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // Create form data object to send to the server
    
    
    
    console.log("holi",formData)

    try {
      // Make POST request to server to submit form data
      const response = await axios.post("http://localhost:8080/users", formData);

      // Handle response if needed
      console.log("Form submitted successfully", response.data);
    } catch (error) {
      // Handle error if request fails
      console.error("Error submitting form", error);
    }
  };
    return(<div className="flex items-center justify-center min-h-screen bg-gray-100">
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
                  placeholder="Name"
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
                  placeholder="Email"
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
                  placeholder="Password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                  onChange={handleChange}
                  id= "username"
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
                  id= "password"
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
            <button className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmit(e)}>
              Create Account
            </button>
          </div>
          <div className="mt-6 text-grey-dark">
            Already have an account?
            <a className="text-blue-600 hover:underline" href="#">
              Log in
            </a>
          </div>
        </div>
      </form>
    </div>
  </div>
  )
}