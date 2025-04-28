import { cookies } from "next/headers";

export async function GET() {
    const isAuth = (await cookies()).get('isAuth');

    const isAuthenticated = isAuth?.value === 'true';

    return new Response(JSON.stringify({ isAuth: isAuthenticated }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    }
)
}