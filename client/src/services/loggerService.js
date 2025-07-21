export const logAction = async ({ address, action, txHash }) => {
    await fetch("http://localhost:4000/api/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, action, txHash }),
    });
  };
  