import { NextResponse } from "next/server";
import { updateDocument } from "../../../../../Utility/updateDataUtility";
import ProjectSection from "../../../../../models/ProjectSection.model";
import { authGuard } from "../../../../middleware/authGuard";

export const dynamic = "force-dynamic";

export const PUT = authGuard(async (req) => {
  try {
    const extractData = await req.json();
    const { _id, ...updateFields } = extractData;

    const response = await updateDocument(ProjectSection, _id, updateFields);

    return NextResponse.json(response);
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
});
