import { NextResponse } from "next/server";
import connectToDB from "../config/db";

export async function saveDataToDB(model, data) {
  try {
    await connectToDB();
    const savedData = await model.create(data);

    if (savedData) {
      return {
        success: true,
        message: "Data saved successfully",
      };
    } else {
      return {
        success: false,
        message: "Something went wrong! Please try again",
      };
    }
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "Something went wrong! Please try again",
    };
  }
}
