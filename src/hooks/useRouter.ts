import { useState, useEffect, useCallback } from "react";

export function useRouter() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocation = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handleLocation);
    window.addEventListener("locationchange", handleLocation);
    return () => {
      window.removeEventListener("popstate", handleLocation);
      window.removeEventListener("locationchange", handleLocation);
    };
  }, []);

  const navigate = useCallback((path: string) => {
    window.history.pushState(null, "", path);
    window.dispatchEvent(new Event("locationchange"));
  }, []);

  return { pathname, navigate };
}
