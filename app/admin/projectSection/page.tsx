"use client"

import React from "react";
import { AdminNavbar, AdminSidebar } from "../../../components";
import {   ProjectSectionControls } from "../../../dataConfig";
import FormControl from "../../../components/FormControl";

const page = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="flex-1 p-8">
          <FormControl
            controls={ProjectSectionControls}
            formData={undefined}
            setFormData={undefined}
          />
        </main>
      </div>
    </div>
  );
};

export default page;
