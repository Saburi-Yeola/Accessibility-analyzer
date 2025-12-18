import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

/**
 * Muted, professional palette
 * Matches SeverityChart tones
 */
const COLORS = {
  violations: "#b91c1c",   // muted red
  passes: "#15803d",       // muted green
  incomplete: "#ca8a04",   // muted yellow
};

export default function ResultPieChart({ violations, passes, incomplete }) {
  const data = [
    { name: "Violations", value: violations, color: COLORS.violations },
    { name: "Passes", value: passes, color: COLORS.passes },
    { name: "Incomplete", value: incomplete, color: COLORS.incomplete },
  ];

  // If everything is zero, show empty state
  if (data.every(item => item.value === 0)) {
    return (
      <div className="h-[260px] flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
        No scan results available
      </div>
    );
  }

  return (
    <div className="w-full h-[260px] flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={95}
            paddingAngle={3}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "none",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* LEGEND */}
      <div className="mt-4 flex gap-6 text-sm">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-gray-700 dark:text-gray-300">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
