'use client';

import { useApp } from '@/hooks/use-app';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';

import { HomeTab } from '@/components/tabs/HomeTab';
import { TimelineTab } from '@/components/tabs/TimelineTab';
import { InsightsTab } from '@/components/tabs/InsightsTab';
import { SettingsTab } from '@/components/tabs/SettingsTab';
import { AnimatePresence, motion } from 'framer-motion';
import { APP_NAME } from '@/lib/constants';
import { SpiderIcon } from './icons/SpiderIcon';
import { AnomaliesTab } from './tabs/AnomaliesTab';

export function MainUI() {
  const { activeTab } = useApp();

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'timeline':
        return <TimelineTab />;
      case 'anomalies':
        return <AnomaliesTab />;
      case 'insights':
        return <InsightsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <HomeTab />;
    }
  };

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <header className="p-4 flex items-center md:hidden sticky top-0 bg-background/90 backdrop-blur-sm z-10 border-b -m-px">
                <SidebarTrigger />
                <div className='flex items-center gap-2 ml-4'>
                    <SpiderIcon className='h-6 w-6 text-primary' />
                    <span className='font-bold text-lg'>{APP_NAME}</span>
                </div>
            </header>
            <AnimatePresence mode="wait">
                <motion.main
                  key={activeTab}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.2 }}
                  className="p-4"
                >
                  {renderTab()}
                </motion.main>
            </AnimatePresence>
        </SidebarInset>
    </SidebarProvider>
  );
}
