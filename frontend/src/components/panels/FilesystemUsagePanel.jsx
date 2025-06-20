import { useEffect, useState } from 'react';
import { fetchMetric } from '../../api/prometheus';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function FilesystemUsagePanel() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchMetric(
        '100 * (node_filesystem_size_bytes - node_filesystem_free_bytes) / node_filesystem_size_bytes'
      );

      const formatted = result.map((item, idx) => ({
        name: item.metric.mountpoint || `fs-${idx}`,
        usage: parseFloat(item.value[1]),
      }));

      setData(formatted);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Filesystem Usage (%)</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="usage" fill="#ff8c00" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
