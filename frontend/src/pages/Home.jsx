import { motion } from "framer-motion";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // 🔹 Get Started handler (auth-aware)
  const handleGetStarted = () => {
    if (user) {
      navigate("/analyze");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-white to-white">
      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-center px-6 pt-32 pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-900 max-w-4xl leading-tight"
        >
          Analyze & Improve Website
          <span className="block text-blue-600">
            Accessibility in Seconds
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 text-lg md:text-xl text-gray-600 max-w-2xl"
        >
          Detect accessibility issues, understand their impact, and get
          actionable fixes to make your website inclusive for everyone.
        </motion.p>

        {/* CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 flex gap-6"
        >
          {/* GET STARTED */}
          <button
            onClick={handleGetStarted}
            className="px-8 py-4 rounded-2xl bg-blue-600 text-white text-lg font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl transition"
          >
            Get Started
          </button>

          {/* VIEW DEMO (INTENTIONALLY INACTIVE FOR NOW) */}
          <button
            disabled
            className="px-8 py-4 rounded-2xl bg-white text-gray-400 text-lg font-semibold border border-gray-300 cursor-not-allowed"
          >
            View Demo
          </button>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative bg-white py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/40 to-transparent pointer-events-none" />

        <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard
            title="Accessibility Score"
            description="Get a clear accessibility score (0–100) based on WCAG severity."
          />
          <FeatureCard
            title="Fix Suggestions"
            description="Understand exactly how to fix each accessibility issue."
          />
          <FeatureCard
            title="Professional Reports"
            description="Export scan results as professional audit reports."
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 text-center bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
          How It Works
        </h2>

        <div className="mt-14 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-lg text-gray-600">
          <div className="bg-white p-6 rounded-2xl shadow-soft">
            🔗 Enter website URL
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-soft">
            ⚙️ Run accessibility scan
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-soft">
            📊 Review results & fixes
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
