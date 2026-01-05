import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kenshu IA — Agent conversationnel Data Engineering | Kenshu",
  description: "Posez vos questions sur le Data Engineering, Spark, Airflow, DevOps. Agent IA formé sur 7+ ans d'expérience terrain (BNP, Orange, Safran). Réponses contextualisées et techniques.",
  alternates: {
    canonical: "/agent",
  },
};

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
