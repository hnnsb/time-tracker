import GoogleProvider from "next-auth/providers/google";
import {NextAuthOptions} from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.googleClientId,
            clientSecret: process.env.googleClientSecret,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
}