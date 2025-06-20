import { useEffect, useState } from 'react';
import { fetchMetric } from '../../api/prometheus';

export default function CpuLoadPanel() {
  const [load, setLoad] = useState({ load1: 0, load5: 0, load15: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const load1 = await fetchMetric('node_load1');
      const load5 = await fetchMetric('node_load5');
      const load15 = await fetchMetric('node_load15');

      setLoad({
        load1: parseFloat(load1[0]?.value[1] ?? 0),
        load5: parseFloat(load5[0]?.value[1] ?? 0),
        load15: parseFloat(load15[0]?.value[1] ?? 0),
      });
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-4 text-center">
      <h2 className="text-lg font-semibold mb-4">CPU Load Averages</h2>
      <div className="flex justify-around text-xl font-medium">
        <div>
          <p className="text-gray-600">1m</p>
          <p>{load.load1.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-600">5m</p>
          <p>{load.load5.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-gray-600">15m</p>
          <p>{load.load15.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
