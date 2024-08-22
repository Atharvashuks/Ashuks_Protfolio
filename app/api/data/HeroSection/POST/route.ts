import { NextResponse } from "next/server";
import { saveDataToDB } from "../../../../../Utility/postDataUtility";
import HeroSection from "../../../../../models/HeroSection.model";
import { authGuard } from "../../../../middleware/authGuard";

export const POST = authGuard(async (req) => {
  const extractData = await req.json();
  const response = await saveDataToDB(HeroSection, extractData);

  return NextResponse.json(response);
});
