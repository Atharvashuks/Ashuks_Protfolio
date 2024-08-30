"use client";
import React, { useContext } from "react";
import { AnimatedCounter } from "../components";
import { DataContext } from "../context/Provider";

const achievementsList = [
  {
    prefix: "",
    metric: "Projects",
    value: "15",
    postfix: "+",
  },
  {
    prefix: "",
    metric: "Recommendations",
    value: "10",
    postfix: "+",
  },
  {
    prefix: "",
    metric: "Years",
    value: "2",
  },
];

const AchievementsSection = () => {
  const { achivementSectionData } = useContext(DataContext);

  const dataToMap = achivementSectionData?.map((item) => {
    return {
      prefix: item.prefix || "",
      metrix: item.metrix || "",
      value: item.value || "",
      postfix: item.postfix || "",
    };
  });

  return (
    <div className="py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
      <div className="dark:sm:border-[#33353F] sm:border-[#0044ff] sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-between">
        {dataToMap
          ? dataToMap.map((achievement, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
                >
                  <h2 className="dark:text-white text-[#181869] text-4xl font-bold flex flex-row">
                    {achievement.prefix}
                    <span className="dark:text-white text-[#000014dc] text-4xl font-bold">
                      <AnimatedCounter
                        from={0}
                        to={parseInt(achievement.value)}
                      />
                    </span>
                    {achievement.postfix}
                  </h2>
                  <p className="dark:text-[#ADB7BE] text-[#0077dd] text-base">
                    {achievement.metrix}
                  </p>
                </div>
              );
            })
          : achievementsList.map((achievement, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
                >
                  <h2 className="dark:text-white text-[#181869] text-4xl font-bold flex flex-row">
                    {achievement.prefix}
                    <span className="dark:text-white text-[#000014dc] text-4xl font-bold">
                      <AnimatedCounter
                        from={0}
                        to={parseInt(achievement.value)}
                      />
                    </span>
                    {achievement.postfix}
                  </h2>
                  <p className="dark:text-[#ADB7BE] text-[#0077dd] text-base">
                    {achievement.metric}
                  </p>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default AchievementsSection;
