import React from "react";

const OutputPanel: React.FC = () => (
  <div className="flex-grow  h-[100vh] bg-gray-100 dark:bg-gray-900 p-4">
    <h2 className="text-lg font-bold dark:text-white ">Output</h2>
    <div className="mt-2 text-gray-700 dark:text-gray-300">
      <p>Run your code to see the output here.</p>
    </div>
  </div>
);

export default OutputPanel;
