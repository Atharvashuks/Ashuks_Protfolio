import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function authGuard(handler: { (req: Request): Promise<NextResponse<{ success: boolean; data: any; message: string; } | { success: boolean; message: string; data?: undefined; }>>; (req: any): Promise<NextResponse<{ success: boolean; message: string; }>>; (req: any): Promise<NextResponse<{ success: boolean; data: any; message: string; } | { success: boolean; message: string; data?: undefined; }>>; (req: any): Promise<NextResponse<{ success: boolean; message: string; }>>; (req: any): Promise<NextResponse<{ success: boolean; data: any; message: string; } | { success: boolean; message: string; data?: undefined; }>>; (req: any): Promise<NextResponse<{ success: boolean; message: string; }>>; (req: any): Promise<NextResponse<{ success: boolean; data: any; message: string; } | { success: boolean; message: string; data?: undefined; }>>; (req: any): Promise<NextResponse<{ success: boolean; message: string; }>>; (arg0: any, arg1: any): any; }) {
  return async (req: { headers: { get: (arg0: string) => string; }; user: any; }, res: any) => {
    const token = req.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "59c40e9e862e1f4a16938dd4f8669a8e3eff8f01333b1a678c00dc60133019c1");
      req.user = decoded;

      return handler(req, res);
    } catch (error) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }
  };
}
