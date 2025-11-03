"use client";

import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/components/ui/sonner";
import { PreferencesStoreProvider } from "@/stores/preferences/preferences-provider";

export function Providers({
  children,
  themeMode,
  themePreset,
}: {
  children: React.ReactNode;
  themeMode: string;
  themePreset: string;
}) {
  return (
    <PreferencesStoreProvider
      themeMode={themeMode as "light" | "dark"}
      themePreset={themePreset as "tangerine" | "soft-pop" | "default" | "brutalist"}
    >
      <SessionProvider>{children}</SessionProvider>
      <Toaster />
    </PreferencesStoreProvider>
  );
}
