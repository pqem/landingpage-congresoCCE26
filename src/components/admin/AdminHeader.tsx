"use client";

import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import type { Stats } from "./types";

interface AdminHeaderProps {
  session: Session;
  stats: Stats | null;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export function AdminHeader({ session, stats, mobileMenuOpen, setMobileMenuOpen }: AdminHeaderProps) {
  return (
    <header className="bg-[#1a1a1a] border-b border-[#2a2a2a] px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Logo_cce_color_svg.svg" alt="CCE" style={{ height: '48px', width: 'auto' }} />
          <div className="hidden sm:block">
            <h1 className="text-lg sm:text-xl font-bold">Congreso CCE 2026</h1>
            <p className="text-dorado text-xs">Expansión Sobrenatural</p>
          </div>
          {stats && (
            <span className="ml-2 bg-dorado/15 text-dorado text-xs font-semibold px-2.5 py-1 rounded-full">
              {stats.total_personas} personas
            </span>
          )}
        </div>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-[#999999] text-sm truncate max-w-[200px]">{session.user?.email}</span>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="text-sm border border-[#2a2a2a] bg-transparent hover:bg-[#2a2a2a] text-[#CCCCCC] px-4 py-2 rounded-lg transition-colors"
          >
            Salir
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden p-2 text-[#CCCCCC] hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-3 pt-3 border-t border-[#2a2a2a] space-y-3">
          <p className="text-[#999999] text-sm truncate">{session.user?.email}</p>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full text-left text-sm text-[#CCCCCC] hover:text-white"
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </header>
  );
}
