import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credenciales",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-API-Key": process.env.ADMIN_API_KEY!,
              },
              body: JSON.stringify({ email: credentials.email }),
            }
          );
          const data = await res.json();
          if (data.authorized) {
            return {
              id: data.email,
              email: data.email,
              name: data.nombre,
            };
          }
          return null;
        } catch (error) {
          console.error("Error verificando admin:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/verify`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-API-Key": process.env.ADMIN_API_KEY!,
              },
              body: JSON.stringify({ email: user.email }),
            }
          );
          const data = await res.json();
          return data.authorized === true;
        } catch {
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,
  },
};
