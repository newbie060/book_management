import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#000032e6] to-[#ffffff33]">
      <div className="relative h-screen flex flex-col items-center justify-center">
      <h1 className="text-[50px] font-serif">Welcome To CSIT VAULT</h1>
      <p className="text-[25px]">Your one-stop eLibrary for CSIT resources</p>
      <div className="flex flex-row mt-[20px]">
        <a href="/signup" className="px-3 py-2 text-[20px] bg-[#376369] text-white rounded-lg hover:bg-[#835f5f] focus:outline-none">SignUp</a>
        <a href="/login" className="px-4 py-2 text-[20px] bg-[#376369] text-white rounded-lg shadow-md hover:bg-[#835f5f] ml-[40px]">LogIn</a>
      </div>
      </div>
    </div>
  );
};

export default HomePage;
