import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = url;
  
  const excluded_paths = [
    '/_next',
    '/_vercel',
    '/api',
    '/favicon.ico'
  ];
  
  if (excluded_paths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (!pathname.startsWith("/am") && !pathname.startsWith("/ru")) {
    url.pathname = `/am${pathname}`;
    const res = NextResponse.redirect(url)
    res.cookies.set("lang", "am");
    return res;
  }

  const res = NextResponse.next();
  res.cookies.set("lang", pathname.slice(1, 3));
  return res;
}