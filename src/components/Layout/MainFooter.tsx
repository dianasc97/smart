import React from "react";
import { FaTwitter, FaInstagram, FaFacebookF, FaLinkedin } from "react-icons/fa";

const MainFooter: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 h-[40px] px-8 py-2 flex justify-between items-center w-full">
      <div className="flex gap-4">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="w-[24px] h-[24px] hover:text-blue-400 transition" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="w-[24px] h-[24px] hover:text-pink-400 transition" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="w-[24px] h-[24px] hover:text-blue-600 transition" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="w-[24px] h-[24px] hover:text-blue-700 transition" />
        </a>
      </div>

      <div className="text-sm">
        Powered by Smart
      </div>
    </footer>
  );
};

export default MainFooter;
