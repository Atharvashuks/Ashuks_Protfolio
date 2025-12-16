"use client";

import React, { useEffect, useState } from "react";
import { AdminNavbar, AdminSidebar, Loader } from "../../../components";
import { AboutControls, TabDataControls } from "../../../dataConfig";
import FormControl from "../../../components/FormControl";
import { getData, updateData } from "../../../apiEndpoint";
import { AboutDataProps, TabDataProps } from "../../../types";

const page = () => {
  const defaultTabData: TabDataProps = {
    title: "",
    id: "",
    content: [""],
  };

  const defaultAboutData: AboutDataProps = {
    aboutme: "",
    tabData: [defaultTabData],
    letsConnect: "",
  };
  const [formData, setformData] = useState<AboutDataProps>(defaultAboutData);
  const [tabDataSchema, setTabDataSchema] = useState<TabDataProps[]>([
    defaultTabData,
  ]);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  async function extractData() {
    try {
      const response = await getData("About");

      if (response?.success) {
        const about = response.data[0];

        const normalizedTabData = (about.tabData ?? []).map((t: any) => ({
          title: t.title ?? "",
          id: t.legacyId ?? t.id,
          content: (t.contents ?? []).map((c: any) => c.value),
          prismaId: t.id,
        }));

        setformData({
          aboutme: about.aboutme ?? "",
          letsConnect: about.letsConnect ?? "",
          tabData: normalizedTabData,
        });

        setTabDataSchema(normalizedTabData);
        setIsLoading(false);
      }
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
        tabData: tabDataSchema,
      };

      const response = await updateData("About", mergedData, token);
      if (response.success) {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormDataChange = (id: string, newData: any) => {
    setTabDataSchema((prevData) =>
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
            controls={AboutControls}
            formData={formData}
            setFormData={setformData}
          />
          {tabDataSchema.map((item, idx) => {
            return (
              <FormControl
                key={idx}
                controls={TabDataControls}
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
