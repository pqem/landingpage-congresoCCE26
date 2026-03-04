import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // CredentialsProvider eliminado: el endpoint /api/admin/verify no validaba
    // la contraseña — cualquier email admin podía entrar sin password.
    // Solo Google OAuth garantiza autenticación real.
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") return false;
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
        const data = await res.json() as { authorized: boolean; rol?: string };
        if (!data.authorized) return false;
        // Guardar rol en el objeto user para que jwt() lo capture
        (user as unknown as Record<string, unknown>).rol = data.rol ?? "observador";
        return true;
      } catch {
        return false;
      }
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
        session.user.rol = (token.rol as "editor" | "observador") ?? "observador";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.rol = (user as unknown as Record<string, unknown>).rol as "editor" | "observador" ?? "observador";
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
