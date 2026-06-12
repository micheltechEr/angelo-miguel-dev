import { useState, useEffect } from "react";

export function useHashVisible(hash: string) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => setVisible(window.location.hash === hash);
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, [hash]);

  const close = () => {
    window.location.hash = "";
    setVisible(false);
  };

  return { visible, close };
}
