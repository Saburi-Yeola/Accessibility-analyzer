import { motion } from "framer-motion";

export default function ChartCard({ title, subtitle, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -3 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft p-6"
    >
      {/* HEADER */}
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {title}
        </h3>

        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {/* CHART CONTENT */}
      <div className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}

