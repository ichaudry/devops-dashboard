
// src/pages/Dashboard.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CpuUsagePanel from '../components/panels/CpuUsagePanel';
import MemoryUsagePanel from '../components/panels/MemoryUsagePanel';
import NetworkTrafficPanel from '../components/panels/NetworkTrafficPanel';
import UptimePanel from '../components/panels/UptimePanel';
import DiskIOPanel from '../components/panels/DiskIOPanel';
import FilesystemUsagePanel from '../components/panels/FilesystemUsagePanel';
import CpuLoadPanel from '../components/panels/CpuLoadPanel';
import SystemUptimePanel from '../components/panels/SystemUptimePanel';



export default function Dashboard() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded shadow">
          Logout
        </button>
      </div>

      {/* 🟩 FULL-WIDTH UPTIME PANEL FOR ADMINS */}
      {role === 'admin' && (
        <div className="mb-4">
          <UptimePanel />
        </div>
      )}

      {/* 🟦 GRID OF CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {role === 'admin' && (
          <>
            <CpuLoadPanel />
            <SystemUptimePanel />
            <DiskIOPanel />
            <FilesystemUsagePanel />            
          </>
        )}
        <CpuUsagePanel />
        <MemoryUsagePanel />
        <NetworkTrafficPanel />
      </div>
    </div>
  );
}
