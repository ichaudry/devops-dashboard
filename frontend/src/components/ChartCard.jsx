// src/components/ChartCard.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ChartCard({ title, data, color }) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2 text-charcoal">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="mode" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(data[0] || {})
            .filter((key) => key !== "mode")
            .map((cpuKey, index) => (
              <Bar
                key={cpuKey}
                dataKey={cpuKey}
                fill={color || "#1D3B7C"}
                stackId="cpu"
              />
            ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
