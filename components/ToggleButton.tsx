import React, { useState, useEffect } from "react";
import Image from "next/image";
import SunSvg from "../public/sun.svg";
import MoonSvg from "../public/moon.svg";

const ToggleButton = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const currentTheme =
      document.documentElement.getAttribute("class") || "dark";
    setIsDarkMode(currentTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    document.documentElement.setAttribute("class", newTheme);
    setIsDarkMode(!isDarkMode);

    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-0.5 items-center rounded-full ${
        isDarkMode ? "bg-white" : "bg-[#0044ff]"
      }`}
    >
      {isDarkMode ? (
        <Image
          src={SunSvg}
          alt="Sun Icon"
          className="object-contain h-12 w-12 text-white border-gray-600"
        />
      ) : (
        <Image
          src={MoonSvg}
          alt="Moon Icon"
          className="object-contain h-12 w-12  text-gray-900 border-gray-400"
        />
      )}
    </button>
  );
};

export default ToggleButton;
