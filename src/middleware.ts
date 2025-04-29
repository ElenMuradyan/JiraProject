import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ROUTE_CONSTANTS } from "./utilis/constants";

export default async function middleware(request: NextRequest){
    const isAuth = (await cookies()).get('isAuth')?.value === 'true';
    const collabs = (await cookies()).get('collaborations')?.value;
    const pathname = request.nextUrl.pathname.toLowerCase().split('?')[0];
    const normalizedPath = pathname.replace(/\/$/, '');

    const segments = pathname.split('/').filter(Boolean);
    if(segments[0] === 'cabinet' && segments[1] === 'community' && segments[2]){
        if(!collabs?.includes(segments[2])){
            return NextResponse.redirect(new URL(`${ROUTE_CONSTANTS.JOINCOMMUNITY}/${segments[2]}`, request.url));
        }
    };

    if (pathname.startsWith('/_next/static/')) {
        return NextResponse.next();
    }

    const isCabinetRoute = normalizedPath.startsWith('/cabinet');
    const authPages = [
        '/sign-in', 'sign-up'
    ];
      
    if (!isAuth && isCabinetRoute) {
        console.log("Unauthenticated user trying to access cabinet → redirecting to login");
        return NextResponse.redirect(new URL(ROUTE_CONSTANTS.LOGIN, request.url));
    }

    if (isAuth && authPages.includes(normalizedPath)) {
        console.log("Authenticated user on public route → redirecting to cabinet");
        return NextResponse.redirect(new URL(ROUTE_CONSTANTS.HOME, request.url));
    }

    return NextResponse.next();
}
