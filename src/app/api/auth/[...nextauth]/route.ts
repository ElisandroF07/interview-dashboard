import api from "@/services/api";
import CredentialsProvider from "next-auth/providers/credentials";
import { setCookie } from 'nookies';
import NextAuth, { NextAuthOptions, Session, User} from "next-auth";

const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                taxNumber: { label: "taxNumber", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {
                console.log(credentials)
                try {
                    const res = await api.post('/auth/login', {
                        taxNumber: credentials?.taxNumber,
                        password: credentials?.password
                    });


                    if (res.status === 200) {
                        const token = res.data.data.token as string;
                        setCookie(null, 'authToken', token, {
                            maxAge: 12 * 60 * 60, // 12 horas
                            path: '/',
                          });

                          const user:User = {
                            name: token, 
                            id: '',
                        };
                        return user;
                    }

                    return null;
                } catch (error) {
                    console.error(`Erro durante a autenticaçãoÇ ${error}`);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/login'
    }
}

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
