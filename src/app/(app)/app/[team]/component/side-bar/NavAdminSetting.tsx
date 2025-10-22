import SettingComponent from '@/components/common/setting';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function NavSettings() {
  // const { isMobile } = useSidebar();

  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel>System</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SettingComponent />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
