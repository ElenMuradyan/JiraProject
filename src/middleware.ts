import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ROUTE_CONSTANTS } from "./utilis/constants";

export default async function middleware(request: NextRequest){
    const isAuth = (await cookies()).get('isAuth')?.value === 'true';
    const collabs = (await cookies()).get('collaborations')?.value;
    const pathname = request.nextUrl.pathname.split('?')[0];
    const normalizedPath = pathname.replace(/\/$/, '');
    const segments = pathname.split('/').filter(Boolean);

    if (pathname.startsWith('/_next/static/')) {
        return NextResponse.next();
    }

    if(segments[0] === 'Cabinet' && segments[1] === 'Community' && segments[2] && collabs){
        try {
            const collabId = segments[2];
            const parsedCollabs = collabs ? JSON.parse(collabs) : [];
            if (!parsedCollabs.includes(collabId)) {
                return NextResponse.redirect(new URL(`${ROUTE_CONSTANTS.JOINCOMMUNITY}/${collabId}`, request.url));
            }
        } catch (error) {
            console.error("Error parsing collaborations cookie:", error);
        }
    };


    const isCabinetRoute = normalizedPath.startsWith('/Cabinet');
    const authPages = [
        '/sign-in', '/sign-up'
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
