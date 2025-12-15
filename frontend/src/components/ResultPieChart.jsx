import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function ResultPieChart({ violations, passes, incomplete }) {
  const data = [
    { name: "Violations", value: violations, color: "#dc2626" }, // red
    { name: "Passes", value: passes, color: "#16a34a" }, // green
    { name: "Incomplete", value: incomplete, color: "#eab308" }, // yellow
  ];

  // If everything is zero, don't render
  if (data.every(item => item.value === 0)) {
    return null;
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Scan Result Distribution
      </h2>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4 text-sm">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            ></span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
