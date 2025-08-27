"use client";

import { Toaster } from "@/components/ui/sonner";
import { useScreenSize } from "@/hooks/useScreenSize";


export function ResponsiveToaster() {
  const isSmallScreen = useScreenSize(768);

  return (
    <Toaster position={isSmallScreen ? "top-right" : "bottom-right"} richColors/>
  );
}