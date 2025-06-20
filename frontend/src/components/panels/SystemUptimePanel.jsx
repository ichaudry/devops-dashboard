import { useEffect, useState } from 'react';
import { fetchMetric } from '../../api/prometheus';

function formatDuration(seconds) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return `${d}d ${h}h ${m}m`;
}

export default function SystemUptimePanel() {
  const [uptime, setUptime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const now = await fetchMetric('node_time_seconds');
      const boot = await fetchMetric('node_boot_time_seconds');

      if (now.length > 0 && boot.length > 0) {
        const seconds = parseFloat(now[0].value[1]) - parseFloat(boot[0].value[1]);
        setUptime(formatDuration(seconds));
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-4 text-center">
      <h2 className="text-lg font-semibold mb-2">System Uptime</h2>
      <p className="text-xl font-bold text-blue-700">{uptime ?? 'Loading...'}</p>
    </div>
  );
}
