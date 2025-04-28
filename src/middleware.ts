import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ROUTE_CONSTANTS } from "./utilis/constants";

export default async function middleware(request: NextRequest){
    const isAuth = (await cookies()).get('isAuth')?.value === 'true';
    const pathname = request.nextUrl.pathname.toLowerCase().split('?')[0];
    const normalizedPath = pathname.toLowerCase().replace(/\/$/, '');

    if(pathname.startsWith('/_next/static/')){
        return NextResponse.next();
    }
    const isCabinetRoute = normalizedPath.startsWith('/cabinet');

    const authProtectedUrls = [ ROUTE_CONSTANTS.REGISTER, ROUTE_CONSTANTS.LOGIN];

    if(!isAuth && isCabinetRoute){
        return NextResponse.redirect(new URL(ROUTE_CONSTANTS.LOGIN, request.url));
    };

    if(isAuth && authProtectedUrls.includes(request.nextUrl.pathname)){
        return NextResponse.redirect(new URL(ROUTE_CONSTANTS.CABINET, request.url));
    };

    return NextResponse.next();
}