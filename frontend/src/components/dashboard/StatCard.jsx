export default function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-col justify-between hover:shadow-md transition">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">{label}</h3>
        <span className="text-gray-600">{icon}</span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
