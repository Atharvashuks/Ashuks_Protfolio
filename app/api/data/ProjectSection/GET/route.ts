import { NextResponse } from "next/server";
import { fetchDataFromDB } from "../../../../../Utility/fetchDataUtility";
import ProjectSection from "../../../../../models/ProjectSection.model";
import { authGuard } from "../../../../middleware/authGuard";

export const dynamic = "force-dynamic";

export const GET = authGuard(async (req) => {
  const response = await fetchDataFromDB(ProjectSection);

  return NextResponse.json(response);
});
