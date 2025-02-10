"use client";

import { useEffect, useState } from "react";

export function use_screen() {
  const [screen, set_screen] = useState<{ width: number, height: number, aspect: number }>();

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    function update_screen() {
      const { innerWidth: width, innerHeight: height } = window;
      set_screen({
        width,
        height,
        aspect: width / height
      });
    }
    
    window.addEventListener("resize", update_screen);
    
    update_screen();

    return () => {
      window.removeEventListener("resize", update_screen);
    }
  }, []);

  return screen;
}