import { useEffect, useState } from 'react';
import { fetchMetric } from '../../api/prometheus';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import PanelWrapper from '../PanelWrapper';

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
    <PanelWrapper title="Filesystem Usage (%)">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis domain={[0, 100]} stroke="#ccc" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Bar dataKey="usage" fill="#f97316" />
        </BarChart>
      </ResponsiveContainer>
    </PanelWrapper>
  );
}
