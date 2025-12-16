import React from "react";

const ProjectTag = ({ name, onClick, isSelected }:any) => {
  const buttonStyles = isSelected
    ? "dark:text-white text-[#000042] dark:border-primary-500 border-[#000042] dark:border-white"
    : "dark:text-[#ADB7BE] text-[##0000aa] border-slate-600 dark:hover:border-white hover:border-[#0000dd]";
  return (
    <button
      className={`${buttonStyles} rounded-full border-2 px-6 py-3 text-xl cursor-pointer`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

export default ProjectTag;
