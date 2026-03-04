"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

interface AdminHeaderProps {
  session: Session;
}

export function AdminHeader({ session }: AdminHeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const name = session.user?.name ?? "";
  const email = session.user?.email ?? "";
  const image = session.user?.image;
  // Iniciales como fallback si no hay foto
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "A";

  return (
    <header className="bg-[#1a1a1a] border-b border-[#2a2a2a] px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-stretch justify-between" style={{ height: '60px' }}>

        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/cabecera-admin.svg"
          alt="Congreso CCE Argentina 2026 — Expansión Sobrenatural"
          style={{ height: '100%', width: 'auto' }}
        />

        {/* Avatar con dropdown (desktop y mobile) */}
        <div className="flex items-center" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-dorado transition-all focus:outline-none"
            aria-label="Menú de usuario"
          >
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <span className="w-full h-full flex items-center justify-center bg-dorado text-black text-sm font-bold">
                {initials}
              </span>
            )}
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-4 sm:right-6 top-[68px] w-56 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-[#2a2a2a]">
                {name && <p className="text-white text-sm font-medium truncate">{name}</p>}
                <p className="text-[#999999] text-xs truncate">{email}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="w-full text-left px-4 py-3 text-sm text-[#CCCCCC] hover:bg-[#2a2a2a] hover:text-white transition-colors"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
