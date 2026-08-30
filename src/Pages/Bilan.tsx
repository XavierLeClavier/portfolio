import { useContent } from "../i18n";

// Thin version — the full bilan (technique / professionnel / humain,
// projet post-BUT) is built in a later stage.
export default function Bilan() {
  const copy = useContent("bilan");
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <h1 className="text-4xl font-bold text-center pt-12 mb-6 text-purple-400">{copy.title}</h1>
      <p className="text-center text-gray-300 mb-8 max-w-3xl mx-auto px-4">{copy.intro}</p>
    </div>
  );
}
