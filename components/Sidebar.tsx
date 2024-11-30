import React from "react";

interface SidebarProps {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
}

const languages = ["Python", "JavaScript", "Go", "PHP", "Rust", "C/C++"];

const Sidebar: React.FC<SidebarProps> = ({
  selectedLanguage,
  setSelectedLanguage,
}) => (
  <div className="flex sticky top-0 flex-col items-center bg-gray-200 dark:bg-gray-800 h-full p-4">
    {languages.map((lang) => (
      <button
        key={lang}
        onClick={() => setSelectedLanguage(lang)}
        className={`p-2 m-2 w-full text-center rounded-md ${
          selectedLanguage === lang
            ? "bg-blue-500 text-white"
            : "bg-gray-100 dark:bg-gray-700"
        }`}
      >
        {lang}
      </button>
    ))}
  </div>
);

export default Sidebar;
