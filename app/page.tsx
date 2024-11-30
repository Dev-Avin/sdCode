"use client";
import React, { useState, useEffect } from "react";
import CodeEditor from "../components/Code";
import Sidebar from "../components/Sidebar";
import OutputPanel from "../components/OutPannel";

const Home = () => {
  const [language, setLanguage] = useState("JavaScript");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Fetch theme from localStorage and apply it to the document
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light"; // Default to light mode
    setTheme(storedTheme as "light" | "dark");
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleLanguageChange = (selectedLanguage: string) => {
    console.log("Selected language:", selectedLanguage);
    setLanguage(selectedLanguage);
  };

  return (
    <div className="h-screen flex bg-gray-100 dark:bg-darkBackground transition-colors duration-300">
      <Sidebar
        selectedLanguage={language}
        setSelectedLanguage={handleLanguageChange}
      />
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-800">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Online Code Editor
          </h1>
          <button
            onClick={toggleTheme}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Toggle Theme
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-grow">
          <CodeEditor language={language} theme={theme} />
          <OutputPanel />
        </div>
      </div>
    </div>
  );
};

export default Home;
