"use client";
import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { go } from "@codemirror/lang-go";
import { php } from "@codemirror/lang-php";
import { rust } from "@codemirror/lang-rust";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import { autocompletion } from "@codemirror/autocomplete";

interface CodeEditorProps {
  language: string;
  theme: "light" | "dark";
}

const CodeEditor: React.FC<CodeEditorProps> = ({ language, theme }) => {
  const [value, setValue] = useState(`// Start coding here in ${language}...`);
  const [languageExtension, setLanguageExtension] = useState(javascript());
  const [reload, setReload] = useState(false);
  // Function to get the appropriate language extension
  const getLanguageExtension = (lang: string) => {
    switch (lang) {
      case "Python":
        return python();
      case "JavaScript":
        return javascript();
      case "Go":
        return go();
      case "PHP":
        return php();
      case "Rust":
        return rust();
      case "C++":
        return cpp();
      default:
        return javascript(); // Fallback to JavaScript
    }
  };

  // Update the language extension when the language prop changes
  useEffect(() => {
    setReload(true);
    setLanguageExtension(getLanguageExtension(language));
    setValue(`// Start coding here in ${language}...`); // Reset code when language changes
    setReload(false);
  }, [language]);

  return (
    !reload && (
      <CodeMirror
        value={value}
        onChange={(newValue) => setValue(newValue)}
        height="100%"
        theme={theme === "dark" ? oneDark : "light"}
        extensions={[
          languageExtension,
          autocompletion(), // Enable autocomplete
        ]}
        className="h-full w-full"
      />
    )
  );
};

export default CodeEditor;
