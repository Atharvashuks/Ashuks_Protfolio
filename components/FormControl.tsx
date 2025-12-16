"use client";

import React from "react";
import InputForm from "./InputForm";

const FormControl = ({ controls, formData, setFormData }) => {
  return controls.map((item) => {
    const rawValue = formData?.[item.name];

    const value =
      Array.isArray(rawValue) ? rawValue.join("\n") : (rawValue ?? "");

    return (
      <InputForm
        key={item.name}
        label={item.label}
        placeholder={
          Array.isArray(rawValue)
            ? "Enter one item per line"
            : item.placeholder
        }
        type={item.type}
        value={value}
        onChange={(e) => {
          const next =
            Array.isArray(rawValue)
              ? e.target.value
                  .split("\n")
                  .map((s) => s.trim())
                  .filter(Boolean)
              : e.target.value;

          setFormData({ ...formData, [item.name]: next });
        }}
      />
    );
  });
};

export default FormControl;
