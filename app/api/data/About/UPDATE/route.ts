// import { NextResponse } from "next/server";
// import { updateDocument } from "../../../../../Utility/updateDataUtility";
// import About from "../../../../../models/About.model";
// import { authGuard } from "../../../../middleware/authGuard";

// export const dynamic = "force-dynamic";

// export const PUT = authGuard(async (req) => {
//   try {
//     const extractData = await req.json();
//     const { _id, ...updateFields } = extractData;

//     const response = await updateDocument(About, _id, updateFields);

//     return NextResponse.json(response);
//   } catch (e) {
//     console.log(e);
//     return NextResponse.json({
//       success: false,
//       message: "Something went wrong! Please try again",
//     });
//   }
// });


import { NextResponse } from "next/server";
import { updateDocument } from "../../../../../Utility/updateDataUtility";
import prisma from "@/config/db";
import { authGuard } from "../../../../middleware/authGuard";

export const dynamic = "force-dynamic";

export const PUT = authGuard(async (req) => {
  try {
    const extractData = await req.json();

    // If your frontend still sends _id, keep this:
    const { _id, ...updateFields } = extractData;

    // Prisma expects `id` in where clause (string)
    const response = await updateDocument(prisma.about, _id, updateFields);

    return NextResponse.json(response, {
      status: response.success ? 200 : 500,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong! Please try again",
      },
      { status: 500 }
    );
  }
});
