import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavSettings } from './NavAdminSetting';
import NavUser from './NavUser';
import TeamSwitcher from './TeamSwitcher';

export default function AppSideBar() {
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavSettings />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
