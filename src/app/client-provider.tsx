"use client";

import { NextUIProvider } from "@nextui-org/react";
import React from "react";

const ClientProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default ClientProvider;
