import type { NextAuthConfig } from 'next-auth';
import type { KyselyAuth, Database } from "@auth/kysely-adapter";
import { KyselyAdapter } from "@auth/kysely-adapter";
import { db } from './database/kysely';


declare module "next-auth" {
    export interface Session {
        user?: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
            id?: string | null;
        };
    }
}


export const authConfig = {
    providers: [],
    session: {
        strategy: "jwt",
    },
    adapter: KyselyAdapter(db as unknown as KyselyAuth<Database>),
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
        session: ({ session, token }) => {
            if (session.user) {
                session.user.id = token.uid as string;
            }

            return session;
        },
        jwt: ({ user, token }) => {

            if (user) token.uid = user.id;

            return token;
        },
    },
} satisfies NextAuthConfig;