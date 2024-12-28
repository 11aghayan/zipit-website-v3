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

  const is_cart_empty = Object.keys(JSON.parse(req.cookies.get("cart")?.value ?? "{}")).length < 1;
  
  if (pathname.endsWith("checkout") && is_cart_empty) {
    url.pathname = pathname.slice(0, 3);
    const res = NextResponse.redirect(url);
    res.cookies.set("lang", pathname.slice(1, 3));
    return res;
  }
  
  const res = NextResponse.next();
  res.cookies.set("lang", pathname.slice(1, 3));

  return res;
}