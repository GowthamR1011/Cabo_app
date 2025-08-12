"use client";
import GameHeader from "@/components/GameHeader/GameHeader";

import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <GameHeader />
      {children}
    </div>
  );
}
