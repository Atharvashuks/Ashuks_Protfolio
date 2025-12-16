import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "59c40e9e862e1f4a16938dd4f8669a8e3eff8f01333b1a678c00dc60133019c1";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { username, password } = await req.json();

    const user = {
      username: "admin",
      password: "admin123",
      role: "admin",
    };

    if (username === user.username && password === user.password) {
      const token = jwt.sign(
        { username: user.username, role: user.role },
        SECRET_KEY,
        {
          expiresIn: "24h",
        }
      );

      return NextResponse.json({ token }, { status: 200 });
    }

    return NextResponse.json(
      { message: "Invalid username or password" },
      { status: 401 }
    );
  } catch (error) {
    NextResponse.json({ message: error }, { status: 500 });
  }
}
