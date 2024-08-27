import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function authGuard(handler) {
  return async (req, res) => {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;

      return handler(req, res);
    } catch (error) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }
  };
}
