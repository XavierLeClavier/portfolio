import { useContent } from "../i18n";

export default function Bilan() {
  const c = useContent("bilan");
  return (
    <div className="bg-gray-900 text-white min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-400 mb-4">{c.title}</h1>
        <p className="text-gray-300 mb-10">{c.intro}</p>

        <div className="space-y-10">
          {c.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-2xl font-bold mb-3">
                <span className="border-b-2 border-purple-500 pb-1">{section.title}</span>
              </h2>
              <div className="space-y-3 text-gray-100">
                {section.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="border-l-4 border-purple-500 bg-gray-800/60 p-6 rounded-r">
            <h2 className="text-2xl font-bold mb-3 text-purple-300">{c.devenu.title}</h2>
            <p className="text-gray-100">{c.devenu.body}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-3">
              <span className="border-b-2 border-purple-500 pb-1">{c.projetPostBut.title}</span>
            </h2>
            <p className="text-gray-100">{c.projetPostBut.body}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
