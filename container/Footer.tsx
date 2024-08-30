import React, { useContext } from "react";
import { DataContext } from "../context/Provider";

const Footer = () => {
  const { heroSectionData } = useContext(DataContext);
  return (
    <footer className="footer border z-10 dark:border-t-[#33353F] border-t-[#000068] border-l-transparent border-r-transparent dark:text-white text-[#000042]">
      <div className="container p-12 flex justify-between">
        <span>@ {heroSectionData?.Logo || "Ashuks"}</span>
        <p className="dark:text-slate-600 text-blue-500">
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
