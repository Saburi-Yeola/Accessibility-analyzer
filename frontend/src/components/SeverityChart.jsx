import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = {
  critical: "#b91c1c",   // muted red
  serious: "#c2410c",    // muted orange
  moderate: "#ca8a04",   // muted yellow
  minor: "#2563eb",      // muted blue
};

export default function SeverityChart({ violations }) {
  if (!Array.isArray(violations) || violations.length === 0) {
    return (
      <div className="h-[260px] flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        No violation data available
      </div>
    );
  }

  const data = [
    {
      name: "Critical",
      count: violations.filter(v => v.impact === "critical").length,
      color: COLORS.critical,
    },
    {
      name: "Serious",
      count: violations.filter(v => v.impact === "serious").length,
      color: COLORS.serious,
    },
    {
      name: "Moderate",
      count: violations.filter(v => v.impact === "moderate").length,
      color: COLORS.moderate,
    },
    {
      name: "Minor",
      count: violations.filter(v => v.impact === "minor").length,
      color: COLORS.minor,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          tick={{ fill: "#6b7280", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fill: "#6b7280", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: "rgba(0,0,0,0.04)" }}
          contentStyle={{
            borderRadius: 8,
            border: "none",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          }}
        />
        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
