import { config } from "./config";

export async function fetchWithToken(endpoint: string, options: RequestInit = {}) {
  const token = process.env.API_TOKEN; // server-only

  const res = await fetch(`${config.baseUri}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    //console.error("Fetch failed:", res.status)
    throw new Error(`Fetch failed: ${res.status}`);
  }

  return res.json();
}
