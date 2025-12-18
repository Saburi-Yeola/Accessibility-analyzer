import { useState } from "react";
import { motion } from "framer-motion";

import Header from "../components/Header";
import ScanForm from "../components/ScanForm";
import SummaryCards from "../components/SummaryCards";
import SeverityChart from "../components/SeverityChart";
import ResultPieChart from "../components/ResultPieChart";
import ViolationsTable from "../components/ViolationsTable";
import ExportReportBar from "../components/ExportReportBar";
import ChartCard from "../components/ChartCard";


export default function Analyze() {

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = async () => {
    if (!url) return;

    setLoading(true);
    setResults(null);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Backend scan failed");
      }

      const data = await response.json();

      setResults({
        violations: Array.isArray(data.data?.violations)
          ? data.data.violations
          : [],
        passes: Array.isArray(data.data?.passes)
          ? data.data.passes
          : [],
        incomplete: Array.isArray(data.data?.incomplete)
          ? data.data.incomplete
          : [],
      });
    } catch (err) {
      console.error(err);
      setError("Scan failed. Please check the URL or backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 pt-24">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* HEADER */}
        <Header />

        {/* SCAN FORM */}
        <section className="bg-white rounded-2xl shadow-soft p-8">
          <ScanForm
            url={url}
            setUrl={setUrl}
            loading={loading}
            onScan={handleScan}
            error={error}
          />
        </section>

        {/* RESULTS */}
        {results && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            {/* SUMMARY */}
            <SummaryCards
              violations={results.violations.length}
              passes={results.passes.length}
              incomplete={results.incomplete.length}
            />
            {/*EXPORT REPORT BAR */}
            <ExportReportBar />
            {/* CHARTS */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <ChartCard>
              <SeverityChart violations={results.violations} />
              </ChartCard> 
              <ChartCard title="Scan Result Distribution">
              <ResultPieChart
                violations={results.violations.length}
                passes={results.passes.length}
                incomplete={results.incomplete.length}
              />
              </ChartCard>
            </section>

            {/* TABLE */}
            <section className="bg-white rounded-2xl shadow-soft p-6">
              <ViolationsTable violations={results.violations} />
            </section>
          </motion.div>
        )}
      </div>
    </div>
  );
}
