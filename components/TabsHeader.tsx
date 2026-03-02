"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icons";

export default function TabsHeader() {
  const pathname = usePathname();
  const onSuggestions = pathname === "/";
  const onSaved = pathname.startsWith("/saved");

  return (
    <header className="px-6 pt-6 pb-4">
      <div className="flex items-center justify-between">
        {/* Left: Logo (temporary text version) */}
        <div className="leading-[0.9] font-black text-3xl tracking-tight">
          <div>ECH</div>
          <div>OW</div>
        </div>

        {/* Center: Tabs pill */}
        <div className="bg-black/5 backdrop-blur-sm rounded-full p-1 flex items-center gap-2">
          <Link
            href="/"
            className={[
              "h-12 w-20 rounded-full flex items-center justify-center transition",
              onSuggestions
                ? "bg-white shadow-sm"
                : "opacity-60 hover:opacity-80",
            ].join(" ")}
          >
            <Icon name="sparkles" />
          </Link>

          <Link
            href="/saved"
            className={[
              "h-12 w-20 rounded-full flex items-center justify-center transition",
              onSaved
                ? "bg-white shadow-sm"
                : "opacity-60 hover:opacity-80",
            ].join(" ")}
          >
            <Icon name="bookmark" />
          </Link>
        </div>

        {/* Right: More button */}
        <button
          type="button"
          className="h-14 w-14 rounded-full bg-black/5 backdrop-blur-sm flex items-center justify-center transition active:scale-[0.98]"
        >
          <Icon name="more" />
        </button>
      </div>
    </header>
  );
}