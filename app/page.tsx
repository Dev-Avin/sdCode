"use client";
import React, { useState, useEffect } from "react";
import ReactSplit from "react-split";
import CodeEditor from "../components/Code";
import Sidebar from "../components/Sidebar";
import OutputPanel from "../components/OutPannel";
import { FaSun, FaMoon } from "react-icons/fa"; // Import sun and moon icons

const Home = () => {
  const [language, setLanguage] = useState("JavaScript");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [codes, setCodes] = useState<{ [key: string]: string }>({});

  // Fetch theme and codes from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme as "light" | "dark");
    document.documentElement.classList.toggle("dark", storedTheme === "dark");

    const savedCodes: { [key: string]: string } = {};
    ["JavaScript", "Python", "Go", "PHP", "Rust", "C++"].forEach((lang) => {
      const savedCode = localStorage.getItem(`code-${lang}`);
      if (savedCode) {
        savedCodes[lang] = savedCode;
      }
    });
    setCodes(savedCodes);
  }, []);

  // Toggle theme and save it in localStorage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Handle language change
  const handleLanguageChange = (selectedLanguage: string) => {
    console.log("Selected language:", selectedLanguage);
    setLanguage(selectedLanguage);
  };

  // Handle saving code for a specific language
  const handleCodeSave = (lang: string, code: string) => {
    localStorage.setItem(`code-${lang}`, code);
    setCodes((prev) => ({ ...prev, [lang]: code }));
  };

  const langAttributes: { [key: string]: string } = {
    JavaScript: "js",
    Python: "py",
    Go: "go",
    PHP: "php",
    Rust: "rs",
    "C/C++": "cpp",
  };

  return (
    <div className="h-screen flex bg-gray-100 dark:bg-darkBackground transition-colors duration-300">
      {/* Sidebar for selecting languages */}
      <Sidebar
        selectedLanguage={language}
        setSelectedLanguage={handleLanguageChange}
      />
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <div className="flex justify-between items-center h-[48px]  pr-4 bg-gray-200 dark:bg-gray-800">
          <h1 className="text-xl font-bold pl-4  pr-4 pt-auto pb-auto h-[48px] flex justify-center items-center text-center text-gray-800  dark:text-gray-200 dark:bg-[#282c34]">
            <p>{`main.${langAttributes[language]}`}</p>
          </h1>
          <button
            onClick={toggleTheme}
            className={`flex flex-col items-center justify-center p-auto aspect-square w-[32px] rounded-[2px] shadow-md border border-[rgba(255, 255, 255, 0.2)] transition-all duration-300 ${
              theme === "dark"
                ? "bg-blue-500 text-white scale-105"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
            }`}
          >
            {theme === "dark" ? (
              <FaMoon className="text-[16px]" />
            ) : (
              <FaSun className="text-[16px]" />
            )}
          </button>
        </div>

        <ReactSplit
          className="flex flex-grow bg-gray-700 dark:bg-gray-400 rounded-sm "
          sizes={[80, 20]}
          minSize={600}
          gutterSize={4}
        >
          <div className="h-full bg-gray-50 dark:bg-gray-900">
            <CodeEditor
              language={language}
              theme={theme}
              initialCode={codes[language]}
              onCodeSave={handleCodeSave}
            />
          </div>

          <div className="h-full bg-gray-50 dark:bg-gray-900">
            <OutputPanel />
          </div>
        </ReactSplit>
      </div>
    </div>
  );
};

export default Home;
