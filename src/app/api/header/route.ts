import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {    
    try{
        (await cookies()).set(
            'isAuth', 'false', {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 60*60*24,
                path: '/'
            }
        );

        (await cookies()).set(
            'uid', '', {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 60*60*24,
                path: '/'
            }
        );

        return NextResponse.json({ message: 'UnAuthenticated' });
    } catch {
        return NextResponse.json({ error: 'Authorized' }, { status: 401 });
    }
}