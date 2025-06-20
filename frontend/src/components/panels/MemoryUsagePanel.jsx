import { useEffect, useState } from 'react';
import { fetchMetric } from '../../api/prometheus';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

export default function MemoryUsagePanel() {
  const [memoryUsed, setMemoryUsed] = useState(0);

  useEffect(() => {
    const getMemoryUsage = async () => {
      const res = await fetchMetric('((node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes) * 100');
      if (res.length > 0) {
        setMemoryUsed(parseFloat(res[0].value[1]));
      }
    };
    getMemoryUsage();
  }, []);

  const data = [{ name: 'Memory', uv: memoryUsed, fill: '#82ca9d' }];

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Memory Usage</h2>
      <ResponsiveContainer width="100%" height={250}>
        <RadialBarChart innerRadius="70%" outerRadius="100%" data={data} startAngle={180} endAngle={0}>
          <RadialBar minAngle={15} background clockWise dataKey="uv" />
        </RadialBarChart>
      </ResponsiveContainer>
      <p className="text-center mt-2 font-medium">{memoryUsed.toFixed(2)}%</p>
    </div>
  );
}
