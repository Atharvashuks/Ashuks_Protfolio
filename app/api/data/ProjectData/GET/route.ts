import { NextResponse } from "next/server";
import { fetchDataFromDB } from "../../../../../Utility/fetchDataUtility";
import ProjectData from "../../../../../models/ProjectsData.model";
import { authGuard } from "../../../../middleware/authGuard";

export const dynamic = "force-dynamic";

export const GET = authGuard(async (req) => {
  const response = await fetchDataFromDB(ProjectData);

  return NextResponse.json(response);
});
