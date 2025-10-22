import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Settings } from 'lucide-react';

export default function SettingComponent() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuButton
          asChild
          className='cursor-pointer '
          tooltip={'Manager your account and settings'}
        >
          <div className='flex items-center gap-2'>
            <Settings color='#86837e' className='!size-[22px]' />
            <span>Settings</span>
          </div>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent
        className='max-h-[715px] max-w-[calc(100vw-100px)] sm:max-w-[calc(100vw-100px)] h-[calc(-100px+100vh)] w-[1150px] overflow-hidden'
        title=''
      >
        <DialogTitle hidden>xxxx</DialogTitle>
        <Sidebar className='h-full min-w-[240px]'>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className='text-gray-600'>Permission</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton className='font-normal text-[#2c2c2b] font-sfpro'>
                    <div className='flex items-center gap-2'>
                      <Settings color='#86837e' className='!size-[20px]' />
                      <span>Roles</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </DialogContent>
    </Dialog>
  );
}
