import React from "react";
import { FiRefreshCcw, FiBell, FiStar, FiUser } from "react-icons/fi";
import smartLogo from "../../assets/smart-logo.svg";
import { useNavigate } from "react-router-dom";

const MainHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md flex items-center w-full border-b border-gray-200 h-[56px] px-6 md:px-10">

      <div className="flex items-center">
        <img 
          src={smartLogo} 
          alt="Smart Logo" 
          className="h-[36px] cursor-pointer mr-auto"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="flex items-center gap-6 text-gray-600 text-lg ml-auto">
        <FiRefreshCcw className="cursor-pointer hover:text-gray-900 transition w-[20px] h-[20px]" />
        <FiBell className="cursor-pointer hover:text-gray-900 transition w-[20px] h-[20px]" />
        <FiStar className="cursor-pointer hover:text-gray-900 transition w-[20px] h-[20px]" />
        <FiUser className="cursor-pointer hover:text-gray-900 transition w-[24px] h-[24px]" />
      </div>
    </header>
  );
};

export default MainHeader;
