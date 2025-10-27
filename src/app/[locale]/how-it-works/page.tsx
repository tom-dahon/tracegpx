import { useTranslations } from "next-intl";

export default function HowItWorksPage() {
  const t = useTranslations("how-it-works");

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 font-sans">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("generate_gpx_title")}</h2>
        <p className="mb-4">{t("generate_gpx_text_1")}</p>
        <p className="mb-4">{t("generate_gpx_text_2")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("import_strava_title")}</h2>
        <p className="mb-4">{t("import_strava_text")}</p>
        <ol className="list-decimal list-inside mb-4">
          <li>{t("import_step_1")}</li>
          <li>{t("import_step_2")}</li>
          <li>{t("import_step_3")}</li>
        </ol>

        <div className="mb-4">
          <video controls className="w-full rounded-md shadow-md">
            <source src="/videos/strava-import-demo.mp4" type="video/mp4" />
            {t("video_unsupported")}
          </video>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("future_features_title")}</h2>
        <p>{t("future_features_text")}</p>
        <ul className="list-disc list-inside">
          <li>{t("feature_altitude")}</li>
          <li>{t("feature_intermediate_pace")}</li>
          <li>{t("feature_splits")}</li>
          <li>{t("feature_dashboard")}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t("why_use_title")}</h2>
        <p>{t("why_use_text")}</p>
      </section>
    </main>
  );
}
