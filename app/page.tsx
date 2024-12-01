"use client";
import React, { useState, useEffect } from "react";
import ReactSplit from "react-split";
import CodeEditor from "../components/Code";
import Sidebar from "../components/Sidebar";
import OutputPanel from "../components/OutPannel";
import { FaSun, FaMoon } from "react-icons/fa";
import "./globals.css";

interface ResponsiveLayoutProps {
  language: string;
  theme: "light" | "dark";
  codes: { [key: string]: string };
  handleCodeSave: (lang: string, code: string) => void;
}

const ResponsiveLayout = ({
  language,
  theme,
  codes,
  handleCodeSave,
}: ResponsiveLayoutProps) => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen width on mount and update state
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    // Mobile layout
    return (
      <div className="flex flex-col h-[100vh] min-h-[700px] overflow-scroll bg-gray-700 dark:bg-gray-400 lgHide">
        <div className="h-[50%] bg-gray-50 dark:bg-gray-900">
          <CodeEditor
            language={language}
            theme={theme}
            initialCode={codes[language]}
            onCodeSave={handleCodeSave}
          />
        </div>

        <div className="h-[50%] bg-gray-50 dark:bg-gray-900">
          <OutputPanel />
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <ReactSplit
      className="flex flex-col smHide min-h-[700px] overflow-scroll md:flex-row flex-grow bg-gray-700 dark:bg-gray-400 rounded-sm"
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
  );
};

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
    <div className="h-screen flex bg-gray-100 overflow-hidden dark:bg-darkBackground transition-colors duration-300">
      {/* Sidebar for selecting languages */}
      <Sidebar
        selectedLanguage={language}
        setSelectedLanguage={handleLanguageChange}
      />
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <div className="flex justify-between items-center h-[48px] pr-4 bg-gray-200 dark:bg-gray-800">
          <h1 className="text-xl font-bold pl-4 pr-4 pt-auto pb-auto h-[48px] flex justify-center items-center text-center text-gray-800 dark:text-gray-200 dark:bg-[#282c34]">
            <p>{`main.${langAttributes[language]}`}</p>
          </h1>
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`flex flex-col items-center justify-center p-auto aspect-square w-[32px] h-[32px] rounded-[2px] shadow-md border border-[rgba(255, 255, 255, 0.2)] transition-all duration-300 ${
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
            {/* Run Button */}
            <button
              onClick={() => console.log("Running...")}
              className="px-4 py-2 bg-blue-500 h-[32px] flex justify-center items-center text-white rounded-md shadow-md hover:bg-blue-600 transition-all duration-300"
            >
              <p> Run</p>
            </button>
          </div>
        </div>

        {/* Responsive Layout */}
        <ResponsiveLayout
          language={language}
          theme={theme}
          codes={codes}
          handleCodeSave={handleCodeSave}
        />
      </div>
    </div>
  );
};

export default Home;
