"use client";

import React from "react";
import InputForm from "./InputForm";

const FormControl = ({ controls, formData, setFormData }) => {
  return controls.map((item) => (
    <InputForm
      label={item.label}
      placeholder={item.placeholder}
      type={item.type}
      //   value={formData[item.name]}
      //   onChange={(e) => {
      //     setFormData({ ...formData, [item.name]: e.target.value });
      //   }}
      value=""
      onChange={() => {}}
    />
  ));
};

export default FormControl;
