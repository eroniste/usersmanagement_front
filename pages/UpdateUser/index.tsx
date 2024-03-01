import axios from "axios";
import UsersForm from "../addUser";
import React, { ChangeEvent, useEffect, useState } from "react";
import useSWR from "swr";
import httpClientreq from "@/lib/httpClientreq";
import router, { Router, useRouter } from "next/router";
import Navbar from "@/components/layouts/Navbar";
interface UserData {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  password: string;
  image: string;
  username: string;
  // Add more properties as needed
}
const fetcher = (url: string) => httpClientreq(url).then((r) => r.data);
function UpdateUser() {
  const router = useRouter();
  const userId = router.query.userId;

  const { data, isLoading, error } = useSWR<UserData>(
    `/users/${userId}`,
    fetcher
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    password: "",
    username: "",
    image: "",
  });
  useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  console.log("hi mouu", data);

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (!data) {
    return console.log("Error loading");
  }

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    console.log("holi", data);

    try {
      const response = await axios.put(
        `http://localhost:8080/users/${userId}`,
        formData
      );

      window.location.href="/";

      console.log("Form submitted successfully", response.data);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };
  
  const handleChange = (e: { target: { id: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
        <img
          src={data.image}
          alt="User Image"
          className="w-32 h-32 mx-auto mt-4"
        />

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
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;

UpdateUser.getLayout = function getLayout(page) {
  return (
    <>
      <Navbar></Navbar>
      <div>
        <h1>Add a New User</h1>
      </div>
      <div>{page}</div>
    </>
  );
};
