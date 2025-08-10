import { SiweMessage } from "siwe";

export async function signInWithEthereum(signer, address) {
  try {
    console.log("Starting SIWE sign-in flow");

    // Step 1: Fetch nonce from backend
    const nonceRes = await fetch(`/api/auth/nonce?address=${address}`);
    if (!nonceRes.ok) throw new Error("Failed to fetch nonce");
    const { nonce } = await nonceRes.json();
    console.log("Nonce received:", nonce);

    // Step 2: Construct SIWE message
    const message = new SiweMessage({
      domain: window.location.host,
      address,
      statement: "Sign in with Ethereum to DAppWorld",
      uri: window.location.origin,
      version: "1",
      chainId: await signer.provider.getNetwork().then(n => n.chainId),
      nonce,
    });
    console.log("Prepared SIWE message:", message);

    // Step 3: Sign message
    const signature = await signer.signMessage(message.prepareMessage());
    if (!signature) throw new Error("Failed to sign message");

    // Step 4: Send to backend for verification
    const verifyRes = await fetch(`/api/auth/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        message: message.toMessage(),
        signature,
      }),
    });

    const raw = await verifyRes.text();
    console.log("Raw verify response:", raw);

    if (!verifyRes.ok) {
      console.error("Server returned error:", verifyRes.status);
      return { ok: false, error: `Server error ${verifyRes.status}` };
    }

    try {
      return JSON.parse(raw);
    } catch (err) {
      console.error("Failed to parse JSON:", err);
      return { ok: false, error: "Malformed JSON in response." };
    }

  } catch (err) {
    console.error("SIWE sign-in failed:", err);
    return { ok: false, error: err.message };
  }
}
