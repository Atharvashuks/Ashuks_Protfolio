// import { NextResponse } from "next/server";
// import { fetchDataFromDB } from "../../../../../Utility/fetchDataUtility";
// import HeroSection from "../../../../../models/HeroSection.model";

// export const dynamic = "force-dynamic";

// export const GET = async (req) => {
//   const response = await fetchDataFromDB(HeroSection);

//   return NextResponse.json(response);
// };

import { NextResponse } from "next/server";
import prisma from "../../../../../config/db"; // adjust path if needed
import { fetchDataFromDB } from "../../../../../Utility/fetchDataUtility";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const response = await fetchDataFromDB(prisma.heroSection, {
    include: {
      achievementNumbers: true,
    },
  });

  return NextResponse.json(response);
};
