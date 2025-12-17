import { Clock, ExternalLink } from "lucide-react";

const mockScans = [
  {
    id: 1,
    url: "https://example.com",
    date: "21 Mar 2025",
    score: 92,
    status: "Excellent",
  },
  {
    id: 2,
    url: "https://govsite.in",
    date: "19 Mar 2025",
    score: 68,
    status: "Needs Improvement",
  },
  {
    id: 3,
    url: "https://portfolio.dev",
    date: "15 Mar 2025",
    score: 54,
    status: "Poor",
  },
];

const getBadgeStyle = (score) => {
  if (score >= 85) return "bg-green-100 text-green-700";
  if (score >= 65) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};

export default function ScanHistory() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-8">
          <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Scan History
          </h2>
        </div>

        {/* TABLE */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="p-4">Website</th>
                <th className="p-4">Scan Date</th>
                <th className="p-4">Score</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {mockScans.map((scan) => (
                <tr
                  key={scan.id}
                  className="border-t hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <td className="p-4 font-medium text-blue-600 dark:text-blue-400">
                    {scan.url}
                  </td>

                  <td className="p-4 text-gray-600 dark:text-gray-300">
                    {scan.date}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getBadgeStyle(
                        scan.score
                      )}`}
                    >
                      {scan.score}
                    </span>
                  </td>

                  <td className="p-4 text-gray-700 dark:text-gray-200">
                    {scan.status}
                  </td>

                  <td className="p-4 text-right">
                    <button className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm">
                      View details
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOT NOTE */}
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Showing mock scan history — backend integration coming soon.
        </p>
      </div>
    </div>
  );
}
