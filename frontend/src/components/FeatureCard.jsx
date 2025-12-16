export default function FeatureCard({ title, description }) {
  return (
    <div className="rounded-2xl p-6 shadow-soft bg-gray-50 hover:shadow-md transition">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">
        {title}
      </h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
}
