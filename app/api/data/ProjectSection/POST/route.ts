import { NextResponse } from "next/server";
import { saveDataToDB } from "../../../../../Utility/postDataUtility";
import ProjectSection from "../../../../../models/ProjectSection.model";
import { authGuard } from "../../../../middleware/authGuard";

export const POST = authGuard(async (req) => {
  const extractData = await req.json();
  const response = await saveDataToDB(ProjectSection, extractData);

  return NextResponse.json(response);
});
