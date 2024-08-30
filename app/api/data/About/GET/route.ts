import { NextResponse } from "next/server";
import { fetchDataFromDB } from "../../../../../Utility/fetchDataUtility";
import About from "../../../../../models/About.model";

export const dynamic = "force-dynamic";

export const GET = async (req) => {
  const response = await fetchDataFromDB(About);

  return NextResponse.json(response);
};
