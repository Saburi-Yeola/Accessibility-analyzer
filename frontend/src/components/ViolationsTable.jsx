import { useState } from "react";

function impactBadge(impact) {
  const base =
    "px-3 py-1 rounded-full text-sm font-semibold capitalize";

  const styles = {
    critical: "bg-red-100 text-red-700",
    serious: "bg-orange-100 text-orange-700",
    moderate: "bg-yellow-100 text-yellow-700",
    minor: "bg-gray-100 text-gray-700",
  };

  return (
    <span className={`${base} ${styles[impact] || styles.minor}`}>
      {impact || "unknown"}
    </span>
  );
}

export default function ViolationsTable({ violations }) {
  const [severity, setSeverity] = useState("all");
  const [search, setSearch] = useState("");
  const [expandedRow, setExpandedRow] = useState(null);

  if (!Array.isArray(violations) || violations.length === 0) {
    return (
      <p className="text-center text-gray-600 mt-6">
        No accessibility violations found 🎉
      </p>
    );
  }

  const filteredViolations = violations.filter((v) => {
    const matchesSeverity =
      severity === "all" || v.impact === severity;

    const text = `${v.id} ${v.description}`.toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());

    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden mt-8">
      {/* HEADER + FILTERS */}
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Accessibility Violations
        </h2>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search (image, contrast, label...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-2/3 p-2 border rounded-lg"
          />

          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="w-full sm:w-1/3 p-2 border rounded-lg"
          >
            <option value="all">All Severities</option>
            <option value="critical">Critical</option>
            <option value="serious">Serious</option>
            <option value="moderate">Moderate</option>
            <option value="minor">Minor</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4">Rule</th>
              <th className="p-4">Description</th>
              <th className="p-4">Impact</th>
              <th className="p-4">Elements</th>
              <th className="p-4">Docs</th>
            </tr>
          </thead>

          <tbody>
            {filteredViolations.map((v, index) => {
              const isOpen = expandedRow === index;

              return (
                <>
                  {/* MAIN ROW */}
                  <tr
                    key={v.id || index}
                    className="border-t hover:bg-gray-50 cursor-pointer"
                    onClick={() =>
                      setExpandedRow(isOpen ? null : index)
                    }
                  >
                    <td className="p-4 font-medium">
                      {v.id || "N/A"}
                    </td>

                    <td className="p-4 text-gray-600">
                      {v.description || "No description"}
                    </td>

                    <td className="p-4">
                      {impactBadge(v.impact)}
                    </td>

                    <td className="p-4 text-center">
                      {v.nodes?.length ?? 0}
                    </td>

                    <td className="p-4">
                      {v.helpUrl && (
                        <a
                          href={v.helpUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Docs
                        </a>
                      )}
                    </td>
                  </tr>

                  {/* EXPANDED ROW */}
                  {isOpen && (
                    <tr className="bg-gray-50 border-t">
                      <td colSpan="5" className="p-6">
                        <div className="space-y-3">
                          <p>
                            <span className="font-semibold">
                              Why this matters:
                            </span>{" "}
                            {v.help || "Accessibility issue detected."}
                          </p>

                          {v.nodes?.length > 0 && (
                            <div>
                              <p className="font-semibold mb-1">
                                Affected HTML:
                              </p>
                              <pre className="bg-gray-200 p-3 rounded-lg text-sm overflow-x-auto">
                                {v.nodes[0].html || "N/A"}
                              </pre>
                            </div>
                          )}

                          {v.tags && (
                            <div>
                              <p className="font-semibold mb-1">
                                WCAG Tags:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {v.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredViolations.length === 0 && (
        <p className="text-center text-gray-500 py-6">
          No violations match the selected filters.
        </p>
      )}
    </div>
  );
}
