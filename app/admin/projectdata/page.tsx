"use client";

import React, { useEffect, useState } from "react";
import {
  AdminNavbar,
  AdminSidebar,
  Loader,
  FormControl,
} from "../../../components";
import { ProjectDataControls } from "../../../dataConfig";
import { getData, updateData } from "../../../apiEndpoint";
interface FormDataProp {
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string[];
  gitUrl: string;
  previewUrl: string;
}

const page = () => {
  const ProjectCard = ({ imageUrl, title, description, onClick }) => {
    return (
      <div className="max-w-sm mx-auto">
        <div className="rounded-xl mt-3 bg-[#F0F4F8] py-8 px-4 h-60 flex flex-col justify-between">
          <div>
            <img
              crossOrigin="anonymous"
              src={imageUrl}
              alt={title}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h5 className="text-xl font-semibold mb-2 text-[#1A237E]">
              {title}
            </h5>
            <p className="text-[#3949AB]">{description}</p>
          </div>
          <hr className="my-4 border-[#BBDEFB]" />
          <div className="flex justify-end">
            <button
              className="bg-[#7986CB] px-3 py-1.5 rounded-md shadow-sm hover:bg-[#5C6BC0] transition-colors duration-200 ease-in-out text-sm md:text-base text-[#1A237E] font-medium"
              onClick={onClick}
            >
              Edit Project Details
            </button>
          </div>
        </div>
      </div>
    );
  };

  const defaultProjectData: FormDataProp = {
    id: -1,
    title: "",
    description: "",
    image: "",
    tag: [""],
    gitUrl: "",
    previewUrl: "",
  };

  const [formData, setformData] = useState<FormDataProp[]>([
    defaultProjectData,
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<FormDataProp | null>(null);
  const [updatedFields, setUpdatedFields] = useState<
    Map<number, Partial<FormDataProp>>
  >(new Map());

  useEffect(() => {
    async function extractData() {
      const token = localStorage.getItem("token");
      try {
        const response = await getData("ProjectData", token);
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
        "ProjectData",
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

  const handleCardClick = (project: FormDataProp) => {
    setSelectedCard(project);
  };

  const handleBackClick = () => {
    setSelectedCard(null);
  };

  const handleFormDataUpdate = (updatedData: FormDataProp) => {
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
                  {selectedCard.title}
                </h2>
                <p className="mb-4">{selectedCard.description}</p>
                <div className="mt-8">
                  <FormControl
                    controls={ProjectDataControls}
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
              {formData.map((project) => (
                <ProjectCard
                  imageUrl={project.image}
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  onClick={() => handleCardClick(project)}
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
