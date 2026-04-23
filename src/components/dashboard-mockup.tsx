"use client";
const stats = [
  { label: "New Leads", value: "2,847", change: "+12.5%" },
  { label: "Meetings Booked", value: "156", change: "+8.3%" },
  { label: "Response Rate", value: "34.2%", change: "+5.1%" },
];
const leads = [
  { name: "Fatima Al-Sayed", company: "Gulf Ventures", country: "UAE", score: 94 },
  { name: "Wei Chen", company: "SG Capital", country: "Singapore", score: 91 },
  { name: "Priya Sharma", company: "TechBridge", country: "India", score: 87 },
  { name: "Omar Hassan", company: "Nile Digital", country: "Egypt", score: 83 },
];
export default function DashboardMockup() {
  return (
    <div className="h-full rounded-xl bg-navy-900 border border-navy-800 shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-navy-800">
        <span className="size-3 rounded-full bg-[var(--color-status-error)]" />
        <span className="size-3 rounded-full bg-[var(--color-status-warning)]" />
        <span className="size-3 rounded-full bg-[var(--color-status-success)]" />
        <span className="ml-3 text-sm font-medium text-slate-400">DoSales Dashboard</span>
      </div>
      <div className="p-5 space-y-5 flex-1 flex flex-col">
                <div className="grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-lg bg-navy-950/60 border border-navy-800/60 p-3 sm:p-4">
              <p className="text-xs text-slate-500 uppercase tracking-wider">{s.label}</p>
              <p className="mt-1 font-mono text-xl sm:text-2xl font-semibold text-white">{s.value}</p>
              <p className="mt-1 font-mono text-sm text-brand-400">{s.change}</p>
            </div>
          ))}
        </div>
                <div className="rounded-lg border border-navy-800/60 overflow-hidden flex-1 overflow-x-auto">
          <table className="w-full min-w-[400px] text-sm">
            <thead>
              <tr className="bg-navy-950/40 text-left text-xs uppercase tracking-wider text-slate-500">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Company</th>
                <th className="px-4 py-2">Country</th>
                <th className="px-4 py-2 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800/40">
              {leads.map((l) => (
                <tr key={l.name} className="text-slate-300">
                  <td className="px-4 py-2.5 font-medium text-white">{l.name}</td>
                  <td className="px-4 py-2.5">{l.company}</td>
                  <td className="px-4 py-2.5">{l.country}</td>
                  <td className="px-4 py-2.5 text-right">
                    <span className="inline-flex items-center rounded-full bg-brand-500/10 px-2 py-0.5 font-mono text-xs font-semibold text-brand-400">
                      {l.score}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
