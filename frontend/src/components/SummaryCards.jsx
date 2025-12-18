import { AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import ChartCard from "./ChartCard";

export default function SummaryCards({ violations, passes, incomplete }) {
  const cards = [
    {
      title: "Violations",
      value: violations,
      icon: AlertTriangle,
      accent: "text-red-600 dark:text-red-400",
      hint: "Issues that require fixes",
    },
    {
      title: "Passes",
      value: passes,
      icon: CheckCircle,
      accent: "text-green-600 dark:text-green-400",
      hint: "Checks that passed successfully",
    },
    {
      title: "Incomplete",
      value: incomplete,
      icon: HelpCircle,
      accent: "text-yellow-600 dark:text-yellow-400",
      hint: "Manual review required",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.12, duration: 0.45, ease: "easeOut" }}
          whileHover={{ y: -4 }}
        >
          <ChartCard
            title={card.title}
            subtitle={card.hint}
          >
            <div className="relative flex items-center justify-between">
              {/* VALUE */}
              <div>
                <p className={`text-4xl font-bold ${card.accent}`}>
                  {card.value}
                </p>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Total {card.title.toLowerCase()}
                </p>
              </div>

              {/* ICON */}
              <div className="opacity-20">
                <card.icon className="w-12 h-12" />
              </div>
            </div>
          </ChartCard>
        </motion.div>
      ))}
    </div>
  );
}
