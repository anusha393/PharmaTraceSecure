const NONCE_TTL_MS = 5 * 60 * 1000; // Nonce valid for 5 minutes
const store = {};

function setNonce(address) {
  const nonce = Math.random().toString(36).substring(2, 12);
  store[address] = {
    nonce,
    timestamp: Date.now(),
  };
  return nonce;
}

function getNonce(address) {
  return store[address];
}

function validateNonce(address, incomingNonce) {
  const entry = store[address];
  if (!entry) return false;
  const isExpired = Date.now() - entry.timestamp > NONCE_TTL_MS;
  const isValid = entry.nonce === incomingNonce && !isExpired;
  return isValid;
}

function clearNonce(address) {
  delete store[address];
}

module.exports = {
  setNonce,
  getNonce,
  validateNonce,
  clearNonce,
};
