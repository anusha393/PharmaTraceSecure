import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading session...</p>;
  if (!user) return <p>🚫 Access denied. Please sign in.</p>;

  return children;
}
