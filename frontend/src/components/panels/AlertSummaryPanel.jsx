import { useState, useEffect } from 'react';
import PanelWrapper from '../PanelWrapper';
import Modal from '../common/Modal';

export default function AlertSummaryPanel() {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showAllModal, setShowAllModal] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      setFetching(true);
      try {
        const res = await fetch('http://localhost:9090/api/v1/alerts');
        const json = await res.json();

        const active = json.data.alerts
          .filter(a => a.state === 'firing')
          .map(a => {
            const labels = a.labels || {};
            const desc = a.annotations?.description || '';
            return {
              title: `⚠️ ${labels.alertname} — Severity: ${labels.severity || 'n/a'} — Source: ${labels.instance || 'n/a'}`,
              details: desc
            };
          });

        setAlerts(active);
      } catch (err) {
        console.error('Failed to fetch alerts:', err);
        setAlerts([]);
      }
      setFetching(false);
    };

    fetchAlerts();
  }, []);

  return (
    <PanelWrapper title="Live Alerts">
      {fetching ? (
        <p className="text-sm text-gray-400">Fetching live alerts...</p>
      ) : alerts.length === 0 ? (
        <p className="text-sm text-emerald-400">✅ No active alerts right now.</p>
      ) : (
        <>
          {/* 🔁 Carousel */}
          <div className="overflow-x-auto whitespace-nowrap flex space-x-3 py-2">
            {alerts.map((a, i) => (
              <button
                key={i}
                onClick={() => setSelectedAlert(a)}
                className="inline-block bg-white/5 border border-white/10 rounded px-4 py-2 text-sm text-white min-w-[250px] max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap hover:bg-white/10 transition-all"
                title="Click to view details"
              >
                {a.title}
              </button>
            ))}
          </div>

          {/* 🔘 View All Button */}
          <div className="mt-3 text-right">
            <button
              onClick={() => setShowAllModal(true)}
              className="text-blue-400 text-sm underline hover:text-blue-300"
            >
              View All
            </button>
          </div>

          {/* 📦 Reusable Modals */}
          <Modal
            show={!!selectedAlert}
            onClose={() => setSelectedAlert(null)}
            title={selectedAlert?.title}
          >
            <p className="text-sm text-gray-300 whitespace-pre-wrap">
              {selectedAlert?.details}
            </p>
          </Modal>

          <Modal
            show={showAllModal}
            onClose={() => setShowAllModal(false)}
            title="All Active Alerts"
          >
            <ul className="space-y-4">
              {alerts.map((a, i) => (
                <li key={i} className="bg-white/5 p-3 rounded border border-white/10">
                  <div className="font-medium mb-1">{a.title}</div>
                  <p className="text-sm text-gray-300 whitespace-pre-wrap">{a.details}</p>
                </li>
              ))}
            </ul>
          </Modal>
        </>
      )}
    </PanelWrapper>
  );
}
