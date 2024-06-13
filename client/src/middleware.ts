import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "../../client/src/lib";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  if(!session){
    return NextResponse.redirect(new URL('/', request.url))
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/chat-room',
}