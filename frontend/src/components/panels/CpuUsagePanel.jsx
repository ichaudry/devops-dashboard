import { useEffect, useState } from 'react';
import { fetchMetric } from '../../api/prometheus';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CpuUsagePanel() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchMetric('rate(node_cpu_seconds_total{mode!="idle"}[2m])');
      const formatted = res.map(item => ({
        name: item.metric.cpu || 'core',
        value: parseFloat(item.value[1])
      }));
      setData(formatted);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">CPU Usage per Core</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
