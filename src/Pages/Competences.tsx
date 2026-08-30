import { useContent } from "../i18n";

// Thin version — the full portefeuille de compétences (6 blocs RNCP, preuves,
// notes réflexives, progression S4→S6) is built in a later stage.
export default function Competences() {
  const copy = useContent("competences");
  return (
    <div className="bg-gray-800 text-white min-h-screen">
      <h1 className="text-4xl font-bold text-center pt-10 mb-6 text-white">{copy.title}</h1>
      <p className="text-center text-gray-300 mb-8 max-w-3xl mx-auto px-4">{copy.intro}</p>
    </div>
  );
}
