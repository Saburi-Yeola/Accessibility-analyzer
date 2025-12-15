import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function SeverityChart({ violations }) {
  if (!Array.isArray(violations) || violations.length === 0) {
    return null;
  }

  const data = [
    {
      name: "Critical",
      count: violations.filter(v => v.impact === "critical").length,
      color: "#dc2626", // red
    },
    {
      name: "Serious",
      count: violations.filter(v => v.impact === "serious").length,
      color: "#f97316", // orange
    },
    {
      name: "Moderate",
      count: violations.filter(v => v.impact === "moderate").length,
      color: "#eab308", // yellow
    },
    {
      name: "Minor",
      count: violations.filter(v => v.impact === "minor").length,
      color: "#3b82f6", // blue
    },
  ];

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Violations by Severity
      </h2>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
