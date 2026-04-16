'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  useSidebar,
} from '@/components/ui/sidebar';
import { useApp } from '@/hooks/use-app';
import { NAV_ITEMS } from '@/lib/constants';
import { SpiderIcon } from './icons/SpiderIcon';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { CreateCapsuleSheet } from './capsules/CreateCapsuleSheet';
import { APP_NAME } from '@/lib/constants';
import { SheetTitle } from '@/components/ui/sheet';

export function AppSidebar() {
  const { activeTab, setActiveTab } = useApp();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { isMobile } = useSidebar();

  const TitleComponent = isMobile ? SheetTitle : 'h1';

  return (
    <>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <SpiderIcon className="h-8 w-8 text-primary" />
            <TitleComponent className="text-xl font-semibold">{APP_NAME}</TitleComponent>
          </div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
                <SidebarMenu>
                    {NAV_ITEMS.map((item) => (
                    <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                        onClick={() => setActiveTab(item.id)}
                        isActive={activeTab === item.id}
                        tooltip={{ children: item.label }}
                        >
                        <item.icon />
                        <span>{item.label}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="p-4">
          <Button
            className="w-full"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Capsule
          </Button>
        </SidebarFooter>
      </Sidebar>
      <CreateCapsuleSheet open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </>
  );
}
