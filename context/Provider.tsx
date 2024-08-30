import React, { createContext, useState, useEffect } from "react";
import { getData } from "../apiEndpoint";
import {
  AboutDataProps,
  AchivementDataProps,
  DataContextProp,
  HeroSectionDataProps,
  ProjectDataProps,
  ProjectSectionProps,
} from "../types";
import { Loader } from "../components";

export const DataContext = createContext<DataContextProp>({
  aboutSectionData: null,
  heroSectionData: null,
  projectDataSection: null,
  projectSectionData: null,
  achivementSectionData: null,
  isLoading: true,
  error: null,
});

const Provider = ({ children }) => {
  const [aboutSectionData, setaboutSectionData] =
    useState<AboutDataProps | null>(null);

  const [heroSectionData, setHeroSectionData] =
    useState<HeroSectionDataProps | null>(null);

  const [projectDataSection, setProjectDataSection] =
    useState<ProjectDataProps | null>(null);

  const [projectSectionData, setProjectSectionData] =
    useState<ProjectSectionProps | null>(null);

  const [achivementSectionData, setAchivementSectionData] =
    useState<AchivementDataProps | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function extractData() {
      try {
        setIsLoading(true);
        const [
          abtResponse,
          heroResponse,
          projectDataResponse,
          projectSectionResponse,
        ] = await Promise.all([
          getData("About"),
          getData("HeroSection"),
          getData("ProjectData"),
          getData("ProjectSection"),
        ]);

        setHeroSectionData(heroResponse.data[0]);
        setAchivementSectionData(heroResponse.data[0].achivementNumbers);
        setaboutSectionData(abtResponse.data[0]);
        setProjectDataSection(projectDataResponse.data);
        setProjectSectionData(projectSectionResponse.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    extractData();
  }, []);

  if (isLoading) {
    return (
      <div className="content-center flex items-center justify-center min-h-screen dark:bg-[#121212] bg-[#fff]">
        <Loader />
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <DataContext.Provider
      value={{
        aboutSectionData,
        heroSectionData,
        projectDataSection,
        projectSectionData,
        achivementSectionData,
        isLoading,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default Provider;
