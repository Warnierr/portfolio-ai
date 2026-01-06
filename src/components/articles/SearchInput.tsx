"use client";

import { useState } from "react";

type SearchInputProps = {
  onSearchChange: (search: string) => void;
  placeholder?: string;
};

export default function SearchInput({
  onSearchChange,
  placeholder = "Rechercher un article...",
}: SearchInputProps) {
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearchChange(value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 pl-11 text-white placeholder-zinc-500 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
      />
      <svg
        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}
