export default function PanelWrapper({ title, children }) {
  return (
    <div className="bg-deepNavy/90 text-white rounded-xl p-4 shadow border border-white/10 hover:shadow-lg transition-shadow duration-200">
      {title && <h2 className="text-lg font-semibold mb-3 text-white">{title}</h2>}
      {children}
    </div>
  );
}