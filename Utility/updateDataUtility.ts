import { NextResponse } from "next/server";
import connectToDB from "../config/db";

export async function updateDocument(model, id, updateData) {
  try {
    await connectToDB();

    const updatedDocument = await model.findOneAndUpdate(
      { _id: id },
      updateData,
      { new: true }
    );

    if (updatedDocument) {
      return {
        success: true,
        message: "Updated successfully",
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
