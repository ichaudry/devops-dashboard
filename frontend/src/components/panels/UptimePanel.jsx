import { useEffect, useState } from 'react';
import { fetchMetric } from '../../api/prometheus';

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
    <div className="bg-white shadow rounded-lg p-4 text-center">
      <h2 className="text-lg font-semibold mb-2">Service Uptime</h2>
      <p className={`text-xl font-bold ${up ? 'text-green-600' : 'text-red-600'}`}>
        {up === null ? 'Checking...' : up ? 'All Services Online' : 'Some Services Down'}
      </p>
    </div>
  );
}