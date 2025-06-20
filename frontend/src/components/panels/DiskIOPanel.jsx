import { useEffect, useState } from 'react';
import { fetchMetric } from '../../api/prometheus';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DiskIOPanel() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const reads = await fetchMetric('rate(node_disk_read_bytes_total[2m])');
      const writes = await fetchMetric('rate(node_disk_written_bytes_total[2m])');

      const combined = reads.map((item, idx) => ({
        name: item.metric.device || `dev-${idx}`,
        Read: parseFloat(item.value[1]),
        Write: parseFloat(writes[idx]?.value[1] ?? 0),
      }));

      setData(combined);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Disk I/O (Bytes/sec)</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Read" stroke="#8884d8" />
          <Line type="monotone" dataKey="Write" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
