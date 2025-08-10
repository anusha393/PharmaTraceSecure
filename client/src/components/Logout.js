export default function Logout() {
    async function handleLogout() {
      await fetch("http://localhost:3001/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });
      window.location.reload();
    }
  
    return <button onClick={handleLogout}>Logout</button>;
  }
  