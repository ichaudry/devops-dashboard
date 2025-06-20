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
import logo from '../assets/icon.png';

export default function Dashboard() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white font-inter">
      {/* 🔷 Top Bar */}
      <header className="sticky top-0 z-50 bg-white/5 backdrop-blur-md shadow-md border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={logo} alt="InfraSight Logo" className="h-8" />
          <h1 className="text-xl font-bold tracking-wide">InfraSight</h1>
          <span className="text-sm text-gray-400 border-l border-gray-600 pl-3 capitalize">
            {role}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
        >
          Logout
        </button>
      </header>

      {/* 🟩 Uptime Panel */}
      {role === 'admin' && (
        <div className="px-4 mt-4">
          <UptimePanel />
        </div>
      )}

      {/* 🟦 Metrics Grid */}
      <main className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      </main>
    </div>
  );
}
