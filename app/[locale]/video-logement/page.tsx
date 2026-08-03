// Page d'envoi commercial : on l'ouvre devant un gérant ou on lui envoie le
// lien après un appel. Volontairement NON indexée — elle n'a pas vocation à
// capter du trafic, et un référencement la ferait apparaître hors contexte,
// sans l'appel qui la précède.
import type { Metadata } from "next";
import LogementPage from "../../../components/logement/LogementPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === "fr";
  return {
    title: isFr
      ? "Vidéo de présentation de logement — NBHC"
      : "Property presentation video — NBHC",
    description: isFr
      ? "Vos photos de logement transformées en vidéo de présentation."
      : "Your property photos turned into a presentation video.",
    robots: { index: false, follow: false },
  };
}

export default function VideoLogement() {
  return <LogementPage />;
}
