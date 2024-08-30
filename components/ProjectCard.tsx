import React from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl }) => {
  return (
    <div>
      <div className="relative group">
        <img
          crossOrigin="anonymous"
          src={imgUrl}
          className="h-52 md:h-72 rounded-t-xl"
          style={{
            backgroundSize: "cover",
          }}
        />
        <div className="items-center justify-center absolute top-0 left-0 w-full h-full dark:bg-[#181818] bg-[#55a7eec9] bg-opacity-0 group-hover:bg-opacity-80 hidden group-hover:flex transition-all duration-500">
          <Link
            href={gitUrl}
            target="_blank"
            className="h-14 w-14 mr-2 border-2 relative rounded-full dark:border-[#ADB7BE] border-[#000042] dark:hover:border-white hover:border-[#0000aa] group/link"
          >
            <CodeBracketIcon className="h-10 w-10 dark:text-[#ADB7BE] text-[#000042] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer dark:group-hover/link:text-white group-hover/link:text-[#0000aa]" />
          </Link>
          <Link
            href={previewUrl}
            target="_blank"
            className="h-14 w-14 mr-2 border-2 relative rounded-full dark:border-[#ADB7BE] border-[#000042] dark:hover:border-white hover:border-[#0000aa] group/link"
          >
            <EyeIcon className="h-10 w-10 dark:text-[#ADB7BE] text-[#000042] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer dark:group-hover/link:text-white group-hover/link:text-[#0000aa]" />
          </Link>
        </div>

        <div className="md:hidden absolute bottom-2 right-2 flex space-x-2">
          <Link
            href={gitUrl}
            className="h-14 w-14 mr-2 border-2 relative rounded-full dark:border-[#ADB7BE] border-[#000042] dark:hover:border-white hover:border-[#0000aa] group/link"
          >
            <CodeBracketIcon className="h-10 w-10 dark:text-[#ADB7BE] text-[#000042] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer dark:group-hover/link:text-white group-hover/link:text-[#0000aa]" />
          </Link>
          <Link
            href={previewUrl}
            className="h-14 w-14 mr-2 border-2 relative rounded-full dark:border-[#ADB7BE] border-[#000042] dark:hover:border-white hover:border-[#0000aa] group/link"
          >
            <EyeIcon className="h-10 w-10 dark:text-[#ADB7BE] text-[#000042] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  cursor-pointer dark:group-hover/link:text-white group-hover/link:text-[#0000aa]" />
          </Link>
        </div>
      </div>

      <div className="text-white  rounded-b-xl mt-3 dark:bg-[#181818] bg-[#000042] py-6 px-4">
        <h5 className="text-xl font-semibold mb-2">{title}</h5>
        <p className="text-[#ADB7BE]">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
