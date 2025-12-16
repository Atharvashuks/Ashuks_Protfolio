// import { NextResponse } from "next/server";
// import { fetchDataFromDB } from "../../../../../Utility/fetchDataUtility";
// import ProjectSection from "../../../../../models/ProjectSection.model";
// import { authGuard } from "../../../../middleware/authGuard";

// export const dynamic = "force-dynamic";

// export const GET = async (req) => {
//   const response = await fetchDataFromDB(ProjectSection);

//   return NextResponse.json(response);
// };

import { NextResponse } from "next/server";
import prisma from "../../../../../config/db"; // adjust path if needed
import { fetchDataFromDB } from "../../../../../Utility/fetchDataUtility";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const response = await fetchDataFromDB(prisma.projectSection);

  return NextResponse.json(response);
};
