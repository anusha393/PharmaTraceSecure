import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("http://localhost:3001/api/auth/me", {
        credentials: "include"
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }

      setLoading(false);
    }

    fetchUser();
  }, []);

  return { user, loading };
}
