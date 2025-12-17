import { useState } from "react";
import { Sparkles, Loader2, Copy } from "lucide-react";

export default function FixSuggestionPanel({ violation }) {
  const [loading, setLoading] = useState(false);
  const [fix, setFix] = useState(null);

  const handleGetFix = async () => {
    setLoading(true);
    setFix(null);

    // TEMP mock — backend AI will replace this
    setTimeout(() => {
      setFix({
        explanation:
          "Images without alt text cannot be read by screen readers.",
        solution:
          '<img src="logo.png" alt="Company logo describing the image" />',
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="mt-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-5">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
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

      {/* BODY */}
      {!fix && !loading && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Click <strong>Get AI Fix</strong> to receive an AI-generated fix
          suggestion for this issue.
        </p>
      )}

      {fix && (
        <div className="space-y-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Why this matters:</strong> {fix.explanation}
          </p>

          <div className="relative">
            <pre className="bg-gray-200 dark:bg-gray-800 p-3 rounded-lg text-sm overflow-x-auto">
              {fix.solution}
            </pre>

            <button
              onClick={() => navigator.clipboard.writeText(fix.solution)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            ⚠ AI-generated suggestion — review before applying.
          </p>
        </div>
      )}
    </div>
  );
}
