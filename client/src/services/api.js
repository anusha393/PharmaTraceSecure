export async function registerBatch(cid, senderAddress) {
    return fetch("/api/batch/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cid, senderAddress })
    }).then(res => res.json());
  }
  
  export async function transferBatch(batchId, recipient, senderAddress) {
    return fetch("/api/transfer/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ batchId, recipient, senderAddress })
    }).then(res => res.json());
  }
  
  export async function getBatchStatus(batchId) {
    return fetch(`/api/status/${batchId}`).then(res => res.json());
  }
  
  export async function assignRole(address, role) {
    return fetch("/api/admin/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, role })
    }).then(res => res.json());
  }
  