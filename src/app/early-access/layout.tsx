import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Early Access — Soyez les premiers informés | Kenshu",
  description: "Inscrivez-vous pour être notifié du lancement de Budget AI, AI Act Auditor et nos prochains produits. Accès anticipé et avantages exclusifs.",
  alternates: {
    canonical: "/early-access",
  },
  openGraph: {
    title: "Early Access — Nouveaux produits à venir",
    description: "Inscrivez-vous pour être notifié du lancement de nos produits IA.",
    url: "https://kenshu.dev/early-access",
  },
};

export default function EarlyAccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
