import QuickStats from "@/components/dashboard/QuickStats";
import LeadsPipeline from "@/components/dashboard/LeadsPipeline";
import ProjectsTable from "@/components/dashboard/ProjectsTable";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-zinc-400">
            Vue d'ensemble business en temps réel
          </p>
        </div>

        <QuickStats />

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <LeadsPipeline />
          <ProjectsTable />
        </div>
      </div>
    </div>
  );
}
