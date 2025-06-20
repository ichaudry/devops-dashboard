const PROMETHEUS_URL = import.meta.env.VITE_PROMETHEUS_URL;

export async function fetchMetric(query) {
  try {
    const res = await fetch(`${PROMETHEUS_URL}/api/v1/query?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data?.data?.result ?? [];
  } catch (err) {
    console.error("Error fetching metric:", err);
    return [];
  }
}
