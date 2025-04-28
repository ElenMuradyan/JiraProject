export async function getIsAuth() {
    const res = await fetch('/api', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const { isAuth } = await res.json();

    return isAuth;
}