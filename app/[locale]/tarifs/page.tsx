import { redirect } from "next/navigation";

/* Pas de prix sur le site pour l'instant : cette adresse est gardee pour les
   anciens liens, et renvoie a la prise de contact. */
export default async function TarifsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/contact`);
}
