// import { NextResponse } from "next/server";
// import { saveDataToDB } from "../../../../../Utility/postDataUtility";
// import About from "../../../../../models/About.model";
// import { authGuard } from "../../../../middleware/authGuard";

// export const POST = authGuard(async (req) => {
//   const extractData = await req.json();
//   const response = await saveDataToDB(About, extractData);

//   return NextResponse.json(response);
// });


import { NextResponse } from "next/server";
import { saveDataToDB } from "../../../../../Utility/postDataUtility";
import prisma from "@/config/db";
import { authGuard } from "../../../../middleware/authGuard";

export const POST = authGuard(async (req) => {
  const extractData = await req.json();

  const response = await saveDataToDB(prisma.about, {
    data: extractData,
  });

  return NextResponse.json(response, {
    status: response.success ? 201 : 500,
  });
});
