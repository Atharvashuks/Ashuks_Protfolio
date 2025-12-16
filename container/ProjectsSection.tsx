"use client";
import React, { useState, useRef, useContext } from "react";

import { ProjectCard, ProjectTag } from "../components";
import { motion, useInView } from "framer-motion";
import { DataContext } from "../context/Provider";
import { ProjectDataProps, ProjectSectionProps } from "@/types";

const ProjectSection = [
  {
    id: 1,
    name: "All",
    tag: "All",
  },
  {
    id: 2,
    name: "Web",
    tag: "Web",
  },
  {
    id: 3,
    name: "Mobile",
    tag: "Mobile",
  },
];

const projectsData = [
  {
    id: 1,
    title: "Potography Portfolio Website",
    description: "Project 2 description",
    image: "/images/projects/2.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 2,
    title: "E-commerce Application",
    description: "Project 3 description",
    image: "/images/projects/3.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Food Ordering Application",
    description: "Project 4 description",
    image: "/images/projects/4.png",
    tag: ["All", "Mobile"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "React Firebase Template",
    description: "Authentication and CRUD operations",
    image: "/images/projects/5.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const { projectDataSection, projectSectionData } = useContext(DataContext);


  const dataToMap = projectSectionData?.map((item: ProjectSectionProps) => {
    return {
      id: item.id || "",
      name: item.name || "",
      tag: item.tag || [],
    };
  });

  const handleTagChange = (newTag: string) => {
    setTag(newTag);
  };

  const filteredProjects = (projectDataSection ?? []).filter((project: ProjectDataProps) => {
  const tagValues: string[] = (project.tags ?? []).map((t: any) =>
    typeof t === "string" ? t : t?.value
  ).filter(Boolean);

  const needle = String(tag ?? "").trim().toLowerCase();
  const haystack = tagValues.map(v => String(v).trim().toLowerCase());

  if (needle === "all") return true;

  return haystack.includes(needle);
});

  

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="pt-16 mb-12">
      <h2 className="text-center text-4xl font-bold dark:text-white text-[#000042] mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="dark:text-white text-[#0000dd] flex flex-row justify-center items-center gap-2 py-6">
        {dataToMap?.map((section: ProjectSectionProps) => {
          return (
            <div key={section.id}>
              <ProjectTag
                onClick={handleTagChange}
                name={section.name}
                isSelected={tag === section.name}
              />
            </div>
          );
        })}
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects?.map((project: ProjectDataProps, index: number) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
