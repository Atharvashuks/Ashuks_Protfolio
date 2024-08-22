// pages/api/admin.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export async function POST(req) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "No token provided" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    if (decoded.role !== "admin") {
      return NextResponse.json({ message: "Access denied" }, { status: 403 });
    }

    return NextResponse.json({ message: "Welcome, Admin!" }, { status: 200 });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ message: "Invalid token" }, { status: 403 });
  }
}
