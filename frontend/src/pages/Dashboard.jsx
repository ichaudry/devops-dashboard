import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMetric } from "../api/prometheus";
import ChartCard from "../components/ChartCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const [cpuData, setCpuData] = useState([]);

  const handleLogout = () => {
    navigate("/");
  };

  // Transform Prometheus data for Recharts
  const transformCpuData = (raw) => {
    const grouped = {};

    raw.forEach((item) => {
      const mode = item.metric.mode;
      const cpu = `CPU ${item.metric.cpu}`;
      const value = parseFloat(item.value[1]);

      if (!grouped[mode]) {
        grouped[mode] = { mode };
      }
      grouped[mode][cpu] = value;
    });

    return Object.values(grouped);
  };

  useEffect(() => {
    const loadCpuStats = async () => {
      const result = await fetchMetric("rate(node_cpu_seconds_total[1m])");
      const processed = transformCpuData(result);
      setCpuData(processed);
    };

    loadCpuStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F7FA] text-[#2A2A2A] px-6 py-6 font-['IBM Plex Sans']">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-[#1D3B7C] font-inter">
          DevOps Monitoring Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-[#F68B1E] hover:bg-orange-500 text-white px-4 py-2 rounded shadow font-inter"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard
          title="CPU Usage by Mode"
          data={cpuData}
          color="#1D3B7C"
        />
      </div>
    </div>
  );
}
