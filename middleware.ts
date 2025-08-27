import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';
import { apiAuthPrefix, AUTH_ROUTES, PRIVATE_ROUTES } from './routes';



export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const sessionCookie = await getSessionCookie(req); // ensure async

    // 1. Autoriser les routes API
    if (pathname.startsWith(apiAuthPrefix)) {
        return NextResponse.next();
    }

    // 2. Si connecté et tente d'accéder à une route d'auth → rediriger
    if (AUTH_ROUTES.includes(pathname) && sessionCookie) {
        return NextResponse.redirect(new URL('/upload', req.url));
    }

    // 3. Vérification des routes privées
    const isPrivateRoute = PRIVATE_ROUTES.some((route) =>
        pathname.startsWith(route) // accepte /upload et sous-routes
    );

    if (!sessionCookie && isPrivateRoute) {
        return NextResponse.redirect(new URL('/sign-in', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
