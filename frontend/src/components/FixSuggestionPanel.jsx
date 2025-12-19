import { useState } from "react";
import { Sparkles, Loader2, Copy } from "lucide-react";

export default function FixSuggestionPanel({ violation, isVisible }) {
  const [loading, setLoading] = useState(false);
  const [fix, setFix] = useState(null);

  if (!isVisible) return null;

  const getMockFix = () => {
    switch (violation.id) {
      case "image-alt":
        return `
<img src="logo.png" alt="Company logo describing the image" />
`;
      case "color-contrast":
        return `
/* Increase contrast */
color: #000000;
background-color: #FFFFFF;
`;
      case "landmark-one-main":
        return `
<main>
  <!-- Main page content -->
</main>
`;
      case "list":
        return `
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
`;
      default:
        return `
Refer to WCAG 2.1 guidelines to fix this issue.
`;
    }
  };

  const handleGetFix = () => {
    setLoading(true);
    setFix(null);

    setTimeout(() => {
      setFix(getMockFix());
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="mt-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h4 className="font-semibold text-gray-800 dark:text-gray-100">
            AI Fix Suggestion
          </h4>
        </div>

        <button
          onClick={handleGetFix}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition
            ${
              loading
                ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Analyzing
            </span>
          ) : (
            "Get AI Fix"
          )}
        </button>
      </div>

      {/* BEFORE / AFTER */}
      {fix && (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            {/* BEFORE */}
            <div>
              <p className="text-xs font-semibold mb-2 text-gray-500 uppercase">
                Before
              </p>
              <pre className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl text-sm overflow-x-auto border border-red-200 dark:border-red-700">
                {violation.nodes?.[0]?.html || "HTML snippet not available"}
              </pre>
            </div>

            {/* AFTER */}
            <div>
              <p className="text-xs font-semibold mb-2 text-gray-500 uppercase">
                After (Suggested)
              </p>
              <div className="relative">
                <pre className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-sm overflow-x-auto border border-green-200 dark:border-green-700">
                  {fix}
                </pre>

                <button
                  onClick={() => navigator.clipboard.writeText(fix)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 dark:text-gray-400"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            ⚠ AI-generated suggestion — review before applying.
          </p>
        </>
      )}
    </div>
  );
}
