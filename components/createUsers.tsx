import axios from "axios";
import React, { useState } from "react";




export function createUsers({ usersFromServer }: any) {
    
  
  return (
    <form className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
            First Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder="Jane"
            name="firstName"
            required
          />
          <p className="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
            Last Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-last-name"
            type="text"
            placeholder="Doe"
            name="lastName"
            required
          />
          <p className="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-birthdate">
            Birthdate
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-birthdate"
            type="text"
            placeholder="YYYY-MM-DD"
            name="birthdate"
            required
          />
          <p className="text-red-500 text-xs italic">Please fill out this field.</p>
          <div>
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-birthdate"> Image </label>
          <input type="file" name="image" accept="image"/>
          <button type="submit">Upload</button>
          </div>
        </div>
        
      </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
        Create User
      </button>
    </form>
  );
};
