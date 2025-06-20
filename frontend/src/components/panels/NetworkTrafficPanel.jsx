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

export default function NetworkTrafficPanel() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const receive = await fetchMetric('rate(node_network_receive_bytes_total[2m])');
      const transmit = await fetchMetric('rate(node_network_transmit_bytes_total[2m])');

      const merged = receive.map((item, idx) => ({
        name: item.metric.device,
        Receive: parseFloat(item.value[1]),
        Transmit: parseFloat(transmit[idx]?.value[1] ?? 0),
      }));

      setData(merged);
    };
    fetchData();
  }, []);

  return (
    <PanelWrapper title="Network Traffic (Bytes/sec)">
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
          <Line type="monotone" dataKey="Receive" stroke="#3b82f6" strokeWidth={2} />
          <Line type="monotone" dataKey="Transmit" stroke="#10b981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </PanelWrapper>
  );
}
