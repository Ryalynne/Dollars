   "use server"
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import DBConnection from "../../server/src/lib/DBConnection";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 hr from now")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}


export async function login(formData: FormData) {

  try {
    const password = formData.get("password");
    const [rows] = await DBConnection.connectDB().query(`SELECT * FROM users WHERE password = ?`, [password]);
    if (Array.isArray(rows) && rows.length > 0) {
       const expires = new Date(Date.now() + 10000 * 1000);
       const session = await encrypt({ rows, expires });
       cookies().set("session", session, { expires, httpOnly: true });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error("Login failed:", error);
    // cookies().set("session", "", { expires: new Date(0) });
  }
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
