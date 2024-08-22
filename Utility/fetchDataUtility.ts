import { NextResponse } from "next/server";
import connectToDB from "../config/db";

export async function fetchDataFromDB(model) {
  try {
    await connectToDB();

    const data = await model.find({});

    if (data) {
      return {
        success: true,
        data,
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
