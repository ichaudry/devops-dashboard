import { useEffect, useState } from 'react';
import { fetchMetric } from '../../api/prometheus';
import PanelWrapper from '../PanelWrapper';

export default function UptimePanel() {
  const [up, setUp] = useState(null);

  useEffect(() => {
    const checkUptime = async () => {
      const res = await fetchMetric('up');
      if (res.length > 0) {
        setUp(res.every(d => d.value[1] === '1'));
      }
    };
    checkUptime();
  }, []);

  return (
    <PanelWrapper title="Service Uptime">
      <p
        className={`text-xl font-bold text-center ${
          up === null
            ? 'text-gray-400'
            : up
            ? 'text-emerald-400'
            : 'text-red-500'
        }`}
      >
        {up === null
          ? 'Checking...'
          : up
          ? 'All Services Online'
          : 'Some Services Down'}
      </p>
    </PanelWrapper>
  );
}
