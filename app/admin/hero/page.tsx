"use client";

import React, { useEffect, useState } from "react";
import { AdminNavbar, AdminSidebar, Loader } from "../../../components";
import { AchivementsControls, HeroSectionControld } from "../../../dataConfig";
import FormControl from "../../../components/FormControl";
import { getData, updateData } from "../../../apiEndpoint";

const InitialFormData = {
  Logo: String,
  header: [],
  summary: String,
  achivementNumbers: [],
};

const InitialAchivementData = {
  id: Number,
  prefix: String,
  metrix: String,
  value: String,
  postfix: String,
};

const page = () => {
  const [formData, setformData] = useState(InitialFormData);
  const [achivementData, setAchivementData] = useState([InitialAchivementData]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function extractData() {
      try {
        const response = await getData("HeroSection");
        if (response.success) {
          setIsLoading(false);
        }
        setformData(response.data[0]);
        setAchivementData(response.data[0].achivementNumbers);
      } catch (error) {
        console.log(error);
      }
    }

    extractData();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const mergedData = {
        ...formData,
        achivementNumbers: achivementData,
      };

      const response = await updateData("HeroSection", mergedData, token);
      if (response.success) {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormDataChange = (id: NumberConstructor, newData: any) => {
    setAchivementData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, ...newData } : item))
    );
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
          <FormControl
            controls={HeroSectionControld}
            formData={formData}
            setFormData={setformData}
          />
          {achivementData.map((item, idx) => {
            return (
              <FormControl
                key={idx}
                controls={AchivementsControls}
                formData={item}
                setFormData={(newData: any) =>
                  handleFormDataChange(item.id, newData)
                }
              />
            );
          })}
          <button
            className="bg-sky-800 px-4 py-2 rounded-lg hover:bg-sky-900 text-sm md:text-base"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </main>
      </div>
    </div>
  );
};

export default page;
