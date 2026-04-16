'use client';

import { GitBranch } from "lucide-react";

export function AnomaliesTab() {
  return (
    <div className="space-y-6">
       <header>
        <h1 className="text-3xl font-bold text-foreground">Anomalies</h1>
        <p className="text-muted-foreground">Track and manage multiverse anomalies.</p>
      </header>

      <div className="flex h-96 flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 text-center glass-card">
        <GitBranch className="h-16 w-16 text-muted-foreground" />
        <h3 className="mt-4 text-xl font-semibold">Anomaly Detection System Offline</h3>
        <p className="mt-2 text-muted-foreground">
          This feature is coming soon. You'll be able to track incursions and anomalies across the Spider-Verse here.
        </p>
      </div>
    </div>
  );
}
