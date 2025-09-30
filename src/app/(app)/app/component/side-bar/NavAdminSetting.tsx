'use client';

import { Ellipsis, SlidersVertical, Users } from 'lucide-react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { CORE_ROUTES_SETTING_METADATA, RoutesMap } from '@/constants';
import Link from 'next/link';
import React from 'react';

const mappingIcon = {
  [RoutesMap.CORE_ROUTES_SETTING.GENERAL]: SlidersVertical,
  [RoutesMap.CORE_ROUTES_SETTING.OTHER]: Ellipsis,
  [RoutesMap.CORE_ROUTES_SETTING.USER]: Users,
};

export function NavSettings() {
  // const { isMobile } = useSidebar();

  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel>System</SidebarGroupLabel>
      <SidebarMenu>
        {CORE_ROUTES_SETTING_METADATA?.map((item) => (
          <SidebarMenuItem key={item.value}>
            <SidebarMenuButton asChild>
              <Link href={item.href} className='flex items-center gap-2'>
                {React.createElement(mappingIcon[item.href])}
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
