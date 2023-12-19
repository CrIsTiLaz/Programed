import NextAuth, { SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { sql } from "@vercel/postgres";

export const authOptions = {
    session: {
      strategy: 'jwt' as SessionStrategy,
    },
    secret: process.env.SECRET,
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            credentials: {
                email: {},
                password: {}
              },
              async authorize(credentials: any, req: any) {
                const response = await sql`
                select * from users where email=${credentials?.email}`;

                const user = response.rows[0];
                const passwordCorect = await compare(credentials?.password || '', user.password)

                console.log({passwordCorect})

                if (passwordCorect){
                  return {
                    id: user.id,
                    email: user.email
                  }
                }
                //console.log({credentials})
                return null;
              }
        }),
    ],
    secret: process.env.SECRET as string
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST}

