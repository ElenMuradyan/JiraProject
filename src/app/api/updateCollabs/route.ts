import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST (request: Request) {
    const { collaborations } = await request.json();
    try{ 
    (await cookies()).set(
            'collaborations', JSON.stringify(collaborations), {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 60*60*24,
                path: '/'
            }
        );
    return NextResponse.json({ message: 'Updated' });
    }catch{
        return NextResponse.json({ error: 'Error' });
    }
}