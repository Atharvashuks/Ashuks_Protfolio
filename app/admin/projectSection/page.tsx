"use client";

import React, { useEffect, useState } from "react";
import {
  AdminNavbar,
  AdminSidebar,
  Loader,
  FormControl,
} from "../../../components";
import { ProjectSectionControls } from "../../../dataConfig";
import { getData, updateData } from "../../../apiEndpoint";
import { ProjectSectionProps } from "../../../types";

const page = () => {
  const ProjectCard = ({ name, tag, onClick }) => {
    return (
      <div className="relative bg-white shadow-lg rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-[#1A237E]">{name}</h3>
            <p className="text-[#3949AB]">{tag}</p>
          </div>
          <button
            onClick={onClick}
            className="bg-[#7986CB] text-white px-4 py-2 rounded-lg hover:bg-[#5C6BC0] transition-colors duration-200 ease-in-out"
          >
            Edit
          </button>
        </div>
      </div>
    );
  };

  const defaultProjectData: ProjectSectionProps = {
    id: -1,
    name: "",
    tag: "",
  };

  const [formData, setformData] = useState<ProjectSectionProps[]>([
    defaultProjectData,
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<ProjectSectionProps | null>(
    null
  );
  const [updatedFields, setUpdatedFields] = useState<
    Map<number, Partial<ProjectSectionProps>>
  >(new Map());

  useEffect(() => {
    async function extractData() {
      try {
        const response = await getData("ProjectSection");
        if (response.success) {
          setIsLoading(false);
        }
        setformData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    extractData();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    const updatedDataArray = Array.from(updatedFields.values());
    try {
      const response = await updateData(
        "ProjectSection",
        updatedDataArray[0],
        token
      );
      if (response.success) {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCardClick = (project: ProjectSectionProps) => {
    setSelectedCard(project);
  };

  const handleBackClick = () => {
    setSelectedCard(null);
  };

  const handleFormDataUpdate = (updatedData: ProjectSectionProps) => {
    setformData(
      formData.map((project) =>
        project.id === updatedData.id ? updatedData : project
      )
    );

    setSelectedCard(updatedData);

    setUpdatedFields((prev) => {
      const updated = new Map(prev);
      updated.set(updatedData.id, updatedData);
      return updated;
    });
  };

  if (isLoading) {
    return (
      <div className="content-center flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="flex-1 p-8">
          {selectedCard ? (
            <div className="flex flex-col items-start max-w-3xl mx-auto">
              <div className="bg-white shadow-md rounded-lg p-8 w-full">
                <h2 className="text-2xl font-semibold mb-4">
                  {selectedCard.name}
                </h2>
                <p className="mb-4">{selectedCard.tag}</p>
                <div className="mt-8">
                  <FormControl
                    controls={ProjectSectionControls}
                    formData={selectedCard}
                    setFormData={(updatedData) =>
                      handleFormDataUpdate(updatedData)
                    }
                  />
                </div>
                <div className="mt-6 flex space-x-4">
                  <button
                    className="bg-sky-800 px-4 py-2 rounded-lg hover:bg-sky-900 text-sm md:text-base text-white"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <button
                    className="bg-gray-600 px-4 py-2 rounded-lg hover:bg-gray-700 text-sm md:text-base text-white"
                    onClick={handleBackClick}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {formData.map((item) => (
                <ProjectCard
                  key={item.id}
                  name={item.name}
                  tag={item.tag}
                  onClick={() => handleCardClick(item)}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default page;
