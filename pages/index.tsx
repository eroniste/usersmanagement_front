import axios from "axios";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";

import Navbar from "../components/layouts/Navbar";
import { useRouter } from "next/router";
import { Button } from "../components/ui/button";
import { Loader } from '@mantine/core';
import httpClientreq from "@/lib/httpClientreq";

const PAGE_SIZE = 3; // Set your desired page size

export default function Home({ usersFromServer }: any) {
  const Router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const fetcher = (url: string) => httpClientreq(url).then((r) => r.data)
  const { data, isLoading, error } = useSWR(
    `/users?page=${currentPage}&limit=${pageSize}&searchTerm=${searchTerm}`, fetcher
  );
  const updateUser = async (userId: string)=>{
    try{
      const response = await axios.put(`http://localhost:8080/users/${userId}`);
      return true;
    }catch (error) {
      // If an error occurs during deletion, log the error and return false
      console.error('Error deleting user:', error);
      return false;
  }};
  
  const deleteUser = async (userId: string) => {
    try {
      // Make a DELETE request to the API endpoint
      const response = await axios.delete(`http://localhost:8080/users/${userId}`);
  
      // If the deletion is successful, log the response and return true
      console.log(response.data);
      return true;
    } catch (error) {
      // If an error occurs during deletion, log the error and return false
      console.error('Error deleting user:', error);
      return false;
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset current page when search term changes
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(1); // Reset current page when page size changes
  };
  if (isLoading) {
    return (
      <Loader color="blue" />
    );
  }
  console.log(data);
  return (
    <>
      <div className="w-full h-screen flex  items-center flex-col">
        
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div>
              <h2 className="text-2xl font-semibold leading-tight">Users</h2>
            </div>
            <div className="w-full my-2 flex justify-between">
              <div className="flex flex-row mb-1 sm:mb-0">
                <div>
                <div className="relative">
                  <select
                    className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                  >
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="8">8</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <Search
                searchTerm={searchTerm || ""}
                handleSearch={handleSearch}
              />
              </div>
              
            <div><button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-80 text-white text-sm font-medium rounded-md m-2" onClick={() => Router.push('/addUser')}>Add User</button></div>
            </div>
            
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        email
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Username
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        First name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Last name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        options
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.results.map((invoice) => (
                      <tr>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                className="w-full h-full rounded-full"
                                src={invoice.image}
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {invoice.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-blue-900 leading-tight">
                            <span
                              aria-hidden=""
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            />
                            <span className="relative">{invoice.username}</span>
                          </span>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {invoice.firstName}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {invoice.lastName}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div className="flex flex-col">
                            <button className="px-6 py-2 text-white bg-indigo-600 rounded-full" type="button" onClick={() => Router.push(`/UpdateUser?userId=${invoice._id}`)}>Update</button>
                            <br />
                            <button className="px-6 py-2 text-white bg-green-600 rounded-full" type="button" onClick={() => deleteUser(invoice._id)}>delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                  <span className="text-xs xs:text-sm text-gray-900">
                    Showing {currentPage} of {data?.totalPage}
                  </span>
                  <div className="inline-flex mt-2 xs:mt-0">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={data?.totalPage || 0}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex space-x-2">
      <Button
        className={`px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium rounded-full`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <Button
        className={`px-4 py-2 border border-gray-300 bg-white text-black`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {currentPage}
      </Button>

      <Button
        className={`px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-full`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
};
const Search = ({ searchTerm, handleSearch }) => {
return (
  <div className="block relative">
    <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
        <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
      </svg>
    </span>
    <input
      placeholder="Search"
      className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
      onChange={handleSearch}
      value={searchTerm}
    />
  </div>
)};



Home.getLayout = function getLayout(page) {
  return (
    <>
    <Navbar></ Navbar>
    <div>{page}</div>
    </>
  )
}
