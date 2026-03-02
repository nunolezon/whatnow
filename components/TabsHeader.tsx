"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabsHeader() {
  const pathname = usePathname();
  const onSuggestions = pathname === "/";
  const onSaved = pathname.startsWith("/saved");

  return (
    <header className="p-6 pb-2">
      <div className="inline-flex rounded-2xl border p-1">
        <Link
          href="/"
          className={[
            "px-4 py-2 rounded-xl text-sm",
            onSuggestions ? "bg-black text-white" : "text-gray-600",
          ].join(" ")}
        >
          Suggestions
        </Link>

        <Link
          href="/saved"
          className={[
            "px-4 py-2 rounded-xl text-sm",
            onSaved ? "bg-black text-white" : "text-gray-600",
          ].join(" ")}
        >
          Saved
        </Link>
      </div>
    </header>
  );
}