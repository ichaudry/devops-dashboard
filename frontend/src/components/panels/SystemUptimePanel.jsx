import { useEffect, useState } from 'react';
import { fetchMetric } from '../../api/prometheus';
import PanelWrapper from '../PanelWrapper';

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
    <PanelWrapper title="System Uptime">
      <p className="text-2xl font-bold text-white text-center">
        {uptime ?? 'Loading...'}
      </p>
    </PanelWrapper>
  );
}
