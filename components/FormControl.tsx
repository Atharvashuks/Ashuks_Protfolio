"use client";

import React from "react";
import InputForm from "./InputForm";

const FormControl = ({ controls, formData, setFormData }) => {
  return controls.map(
    (item: {
      name: any;
      label: string;
      placeholder: string;
      type: "text" | "textarea";
    }) => (
      <InputForm
        label={item.label}
        placeholder={item.placeholder}
        type={item.type}
          value={formData[item.name] || " "}
          onChange={(e) => {
            setFormData({ ...formData, [item.name]: e.target.value });
          }}
      />
    )
  );
};

export default FormControl;
