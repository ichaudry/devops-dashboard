import { useEffect, useState } from 'react';
import { fetchMetric } from '../../api/prometheus';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PanelWrapper from '../PanelWrapper';

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
    <PanelWrapper title="CPU Usage per Core">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </PanelWrapper>
  );
}
