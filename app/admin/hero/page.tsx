"use client"

import React, { useState } from "react";
import { AdminNavbar, AdminSidebar } from "../../../components";
import { AchivementsControls, HeroSectionControld } from "../../../dataConfig";
import FormControl from "../../../components/FormControl";

const page = () => {
  const [formData, setformData] = useState()
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
           <FormControl
            controls={AchivementsControls}
            formData={formData}
            setFormData={setformData}
          />
        </main>
      </div>
    </div>
  );
};

export default page;
