import Link from "next/link";
import PageContainer from "@/components/PageContainer";

export default function NotFound() {
  return (
    <PageContainer>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="glass-panel max-w-lg p-12">
          <div className="mb-6 text-8xl font-bold">
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              404
            </span>
          </div>
          
          <h1 className="mb-4 text-3xl font-bold text-white">
            Page introuvable
          </h1>
          
          <p className="mb-8 text-lg text-zinc-400">
            La page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200"
            >
              ← Retour à l&apos;accueil
            </Link>
            
            <Link
              href="/projets"
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3 font-medium text-white transition hover:bg-white/10"
            >
              Voir les projets
            </Link>
          </div>

          <div className="mt-8 text-sm text-zinc-500">
            <p>Besoin d&apos;aide ? <Link href="/contact" className="text-emerald-400 hover:text-emerald-300 transition">Contactez-moi</Link></p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
