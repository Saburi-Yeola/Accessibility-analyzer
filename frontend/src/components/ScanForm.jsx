import { motion } from "framer-motion";

export default function ScanForm({
  url,
  setUrl,
  loading,
  onScan,
  error,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Website URL
      </label>

      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   transition"
      />

      {/* ORIGINAL RUN SCAN BUTTON (UNCHANGED) */}
      <button
        onClick={onScan}
        disabled={!url || loading}
        className={`w-full mt-6 py-3 rounded-xl text-white font-semibold transition
          ${
            !url || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }
        `}
      >
        {loading ? "Scanning..." : "Run Accessibility Scan"}
      </button>

      {/* ERROR MESSAGE */}
      {error && (
        <p className="mt-4 text-sm text-red-600 text-center">
          {error}
        </p>
      )}
    </motion.div>
  );
}
