import { NextResponse } from "next/server";
import { fetchDataFromDB } from "../../../../../Utility/fetchDataUtility";
import HeroSection from "../../../../../models/HeroSection.model";
import { authGuard } from "../../../../middleware/authGuard";

export const dynamic = "force-dynamic";

export const GET = authGuard(async (req) => {
  const response = await fetchDataFromDB(HeroSection);

  return NextResponse.json(response);
});
