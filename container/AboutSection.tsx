"use client";
import React, { useTransition, useState, useContext } from "react";
import Image from "next/image";

import { TabButton } from "../components";
import { DataContext } from "../context/Provider";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: ["Node.js", "Express", " PostgreSQL", " Sequelize", " JavaScript"],
  },
  {
    title: "Education",
    id: "education",
    content: [
      " Fullstack Academy of Code",
      " University of California, Santa Cruz",
    ],
  },
  {
    title: "Certifications",
    id: "certifications",
    content: ["AWS Cloud Practitioner", " Google Professional Cloud Developer"],
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const { aboutSectionData } = useContext(DataContext);

  const TAB_DATA_TO_MAP = aboutSectionData?.tabData || TAB_DATA;

  const dataToMap = TAB_DATA_TO_MAP?.map((item) => {
    return {
      id: item.id || "",
      title: item.title || "",
      content: item.content || [],
    };
  });

  const handleTabChange = (id: React.SetStateAction<string>) => {
    startTransition(() => {
      setTab(id);
    });
  };

  const skillSection = dataToMap?.find((t) => t.id === tab) || {
    title: "",
    id: "",
    content: [],
  };

  return (
    <section className="text-white dark:bg-[#121212] bg-[#000042]" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image
          src="/images/about-image.jpg"
          width={500}
          height={500}
          alt={"hero image"}
        />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
            {aboutSectionData?.aboutme ||
              "I am a full stack web developer with a passion for creating interactive and responsive web applications. I have experience working with JavaScript, React, Redux, Node.js, Express, PostgreSQL, Sequelize, HTML, CSS, and Git. I am a quick learner and I am always looking to expand my knowledge and skill set. I am a team player and I am excited to work with others to create amazing applications."}
          </p>
          <div className="flex flex-row justify-start mt-8">
            {dataToMap?.map((t) => {
              return (
                <div key={t.id}>
                  <TabButton
                    selectTab={() => handleTabChange(t.id)}
                    active={tab === t.id}
                  >
                    {" "}
                    {t.title}{" "}
                  </TabButton>
                </div>
              );
            })}
          </div>
          {skillSection.title === "Skills" ? (
            <div className="mt-8">
              <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 list-disc">
                {skillSection.content.map((item, idx) => (
                  <li key={idx} className="col-span-1">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="mt-8">
              <ul className="list-disc pl-2 grid gap-4">
                {skillSection.content.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
