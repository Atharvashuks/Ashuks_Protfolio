"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";

import { TabButton } from "../components";

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

  const handleTabChange = (id: React.SetStateAction<string>) => {
    startTransition(() => {
      setTab(id);
    });
  };

  const skillSection = TAB_DATA.find((t) => t.id === tab) || {
    title: "",
    id: "",
    content: [],
  };
  const numberOfColumns = Math.ceil(skillSection.content.length / 3);

  const gridClasses = `list-disc pl-2 grid grid-cols-${numberOfColumns} gap-4`;

  //  const skillSection = TAB_DATA.find((t) => t.id === tab);

  //  const groupedItems = [];
  //  const itemsPerColumn = 5;

  //  skillSection.content.forEach((item, index) => {
  //    const columnIndex = Math.floor(index / itemsPerColumn);

  //    if (!groupedItems[columnIndex]) {
  //      groupedItems[columnIndex] = [];
  //    }

  //    groupedItems[columnIndex].push(item);
  //  });

  //  const numberOfColumns = groupedItems.length;

  //  const gridClasses = `list-disc pl-2 grid grid-cols-${numberOfColumns} gap-4`;

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
            I am a full stack web developer with a passion for creating
            interactive and responsive web applications. I have experience
            working with JavaScript, React, Redux, Node.js, Express, PostgreSQL,
            Sequelize, HTML, CSS, and Git. I am a quick learner and I am always
            looking to expand my knowledge and skill set. I am a team player and
            I am excited to work with others to create amazing applications.
          </p>
          <div className="flex flex-row justify-start mt-8">
            {TAB_DATA.map((t) => {
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
          <div className="mt-8">
            <ul className={gridClasses}>
              {skillSection.content.map((item, idx) => {
                return <li key={idx}>{item}</li>;
              })}
            </ul>
          </div>

          {/* <div className="mt-8">
            <ul className={gridClasses}>
              {groupedItems.map((items) => {
                {
                  items.map((item) => {
                    console.log(item);
                    return <li>{item}</li>;
                  });
                }
              })}
            </ul>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
