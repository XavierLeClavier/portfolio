import { LOCALES, useContent, useTranslation, type Locale } from "../i18n";

const FLAGS: Record<Locale, string> = { fr: "🇫🇷", en: "🇦🇺" };

export default function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation();
  const { language } = useContent("common");

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <span className="text-xs uppercase tracking-wide text-gray-500">{language.label}</span>
      <div className="flex gap-1">
        {LOCALES.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-label={language[l]}
            aria-pressed={locale === l}
            title={language[l]}
            className={`text-lg leading-none rounded px-1.5 py-1 transition-all ${
              locale === l
                ? "bg-purple-600/40 ring-1 ring-purple-400"
                : "opacity-50 hover:opacity-100"
            }`}
          >
            {FLAGS[l]}
          </button>
        ))}
      </div>
    </div>
  );
}
