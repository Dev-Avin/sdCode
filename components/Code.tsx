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
import { EditorView } from "@codemirror/view";

interface CodeEditorProps {
  language: string;
  theme: "light" | "dark";
  onCodeSave: (language: string, code: string) => void;
  initialCode?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  theme,
  onCodeSave,
  initialCode,
}) => {
  const [code, setCode] = useState(
    initialCode || `// Start coding here in ${language}...`
  );
  const [languageExtension, setLanguageExtension] = useState(javascript());

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
        return javascript();
    }
  };

  useEffect(() => {
    setLanguageExtension(getLanguageExtension(language));
    setCode(initialCode || `// Start coding here in ${language}...`);
  }, [language, initialCode]);

  // Handle code changes
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeSave(language, newCode);
  };

  return (
    <CodeMirror
      value={code}
      onChange={handleCodeChange}
      height="100%"
      theme={theme === "dark" ? oneDark : "light"}
      extensions={[
        languageExtension,
        autocompletion(),
        EditorView.lineWrapping,
      ]}
      className="h-full w-full"
    />
  );
};

export default CodeEditor;
