'use client';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Download, Trash2 } from 'lucide-react';

export function SettingsTab() {
  const { toast } = useToast();
  
  const handleExport = () => {
    // This needs to be adapted to fetch from Firestore and create a JSON file.
    // For now, it's a placeholder.
    toast({ variant: 'destructive', title: 'Export Not Implemented', description: 'This feature needs to be connected to Firestore.' });
  };
  
  const handleResetApp = () => {
    // This should be a more destructive operation that clears Firestore data.
    // For now, it's a placeholder.
    toast({ variant: 'destructive', title: 'Reset Not Implemented', description: 'This feature needs to be connected to Firestore.' });
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your application data.</p>
      </header>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Export your data or reset the application.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Button onClick={handleExport} variant="outline" className="w-full justify-start gap-2">
                <Download className="h-4 w-4" /> Export Data
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-full justify-start gap-2">
                    <Trash2 className="h-4 w-4" /> Reset Application
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete all your capsules and reset all settings. This is not yet implemented.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={handleResetApp}>Yes, reset everything</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        </CardContent>
      </Card>

    </div>
  );
}
