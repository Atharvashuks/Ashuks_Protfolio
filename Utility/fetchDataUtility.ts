// import { NextResponse } from "next/server";
// import connectToDB from "../config/db";

// export async function fetchDataFromDB(model) {
//   try {
//     await connectToDB();

//     const data = await model.find({});

//     if (data) {
//       return {
//         success: true,
//         data,
//       };
//     } else {
//       return {
//         success: false,
//         message: "Something went wrong! Please try again",
//       };
//     }
//   } catch (e) {
//     console.log(e);
//     return {
//       success: false,
//       message: "Something went wrong! Please try again",
//     };
//   }
// }


type FindManyDelegate = {
  findMany: (args?: any) => Promise<any>;
};

export async function fetchDataFromDB(delegate: FindManyDelegate, args?: any) {
  try {
    const data = await delegate.findMany(args);
    return { success: true, data };
  } catch (e) {
    console.error(e);
    return { success: false, message: "Something went wrong! Please try again" };
  }
}
