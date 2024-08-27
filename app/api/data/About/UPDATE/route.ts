import { NextResponse } from "next/server";
import { updateDocument } from "../../../../../Utility/updateDataUtility";
import About from "../../../../../models/About.model";
import { authGuard } from "../../../../middleware/authGuard";

export const dynamic = "force-dynamic";

export const PUT = authGuard(async (req) => {
  try {
    const extractData = await req.json();
    const { _id, ...updateFields } = extractData;

    // console.log("I am ID", _id);
    // console.log("I am updated data", updateFields);

    const response = await updateDocument(About, _id, updateFields);

    return NextResponse.json(response);
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
});
