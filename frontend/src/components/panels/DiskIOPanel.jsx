import { useEffect, useState } from 'react';
import { fetchMetric } from '../../api/prometheus';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import PanelWrapper from '../PanelWrapper';

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
    <PanelWrapper title="Disk I/O (Bytes/sec)">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend wrapperStyle={{ color: '#fff' }} />
          <Line type="monotone" dataKey="Read" stroke="#3b82f6" strokeWidth={2} />
          <Line type="monotone" dataKey="Write" stroke="#f97316" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </PanelWrapper>
  );
}
