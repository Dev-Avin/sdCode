import React from "react";
import { FaPython, FaJs, FaPhp, FaRust, FaCuttlefish } from "react-icons/fa"; // Importing icons
import { FaGolang } from "react-icons/fa6";

interface SidebarProps {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
}

const languages = [
  { name: "Python", icon: <FaPython /> },
  { name: "JavaScript", icon: <FaJs /> },
  { name: "Go", icon: <FaGolang /> },
  { name: "PHP", icon: <FaPhp /> },
  { name: "Rust", icon: <FaRust /> },
  { name: "C/C++", icon: <FaCuttlefish /> },
];

const Sidebar: React.FC<SidebarProps> = ({
  selectedLanguage,
  setSelectedLanguage,
}) => (
  <div className="flex sticky w-[3.5rem] gap-[8px] top-0 flex-col items-center bg-gray-200 dark:bg-[#383b40] h-full p-4">
    {languages.map(({ name, icon }) => (
      <button
        key={name}
        onClick={() => setSelectedLanguage(name)}
        className={`flex flex-col items-center justify-center p-3 m-2 aspect-square w-[38px] rounded-[2px] shadow-md border border-[rgba(255, 255, 255, 0.2)] transition-all duration-300 ${
          selectedLanguage === name
            ? "bg-blue-500 text-white scale-105"
            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
        }`}
      >
        <div className="text-[22px] sm:text-[18px] md:text-[22px]">{icon}</div>
      </button>
    ))}
  </div>
);

export default Sidebar;
