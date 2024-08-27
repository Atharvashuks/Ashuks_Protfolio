import { NextResponse } from "next/server";
import { saveDataToDB } from "../../../../../Utility/postDataUtility";
import ProjectData from "../../../../../models/ProjectsData.model";
import { authGuard } from "../../../../middleware/authGuard";

export const POST = authGuard(async (req) => {
  const extractData = await req.json();
  const response = await saveDataToDB(ProjectData, extractData);

  return NextResponse.json(response);
});
