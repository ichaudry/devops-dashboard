import { useEffect, useState } from 'react';
import { fetchMetric } from '../../api/prometheus';
import PanelWrapper from '../PanelWrapper';

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
    <PanelWrapper title="CPU Load Averages">
      <div className="flex justify-around text-xl font-medium">
        <div className="text-center">
          <p className="text-gray-400 text-sm">1m</p>
          <p>{load.load1.toFixed(2)}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm">5m</p>
          <p>{load.load5.toFixed(2)}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-sm">15m</p>
          <p>{load.load15.toFixed(2)}</p>
        </div>
      </div>
    </PanelWrapper>
  );
}
