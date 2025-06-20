import { useEffect, useState } from 'react';
import { fetchMetric } from '../../api/prometheus';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function NetworkTrafficPanel() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const receive = await fetchMetric('rate(node_network_receive_bytes_total[2m])');
      const transmit = await fetchMetric('rate(node_network_transmit_bytes_total[2m])');
      const merged = receive.map((item, idx) => ({
        name: item.metric.device,
        Receive: parseFloat(item.value[1]),
        Transmit: parseFloat(transmit[idx]?.value[1] ?? 0)
      }));
      setData(merged);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Network Traffic</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Receive" stroke="#8884d8" />
          <Line type="monotone" dataKey="Transmit" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
