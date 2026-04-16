'use client';

import { BarChart3 } from "lucide-react";

export function InsightsTab() {
  return (
    <div className="space-y-6">
       <header>
        <h1 className="text-3xl font-bold text-foreground">Insights</h1>
        <p className="text-muted-foreground">Analyze your journey through time.</p>
      </header>

      <div className="flex h-96 flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center glass-card">
        <BarChart3 className="h-16 w-16 text-muted-foreground" />
        <h3 className="mt-4 text-xl font-semibold">Insights Coming Soon</h3>
        <p className="mt-2 text-muted-foreground">
          This section will feature charts and analytics about your capsules and habits.
        </p>
      </div>
    </div>
  );
}
