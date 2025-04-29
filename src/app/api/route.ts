import { cookies } from "next/headers";

export async function GET() {
    const isAuth = (await cookies()).get('isAuth');
    const uid = (await cookies()).get('uid');

    const isAuthenticated = isAuth?.value === 'true';

    return new Response(JSON.stringify({ isAuth: isAuthenticated, uid }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    }
)
}