export async function fetchMetric(query) {
  try {
    const res = await fetch(`http://13.51.198.101:9090/api/v1/query?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data?.data?.result ?? [];
  } catch (err) {
    console.error("Error fetching metric:", err);
    return [];
  }
}
