import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    // connect to MongoDB
    await connectDB();

    // find user in database
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    // success → return user info (without password)
    return NextResponse.json({
      message: "Login successful",
      user: { username: user.username, role: user.role },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
