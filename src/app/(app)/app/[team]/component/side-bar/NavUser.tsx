'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { UserPlan } from '@/constants';
import { useAppContext } from '@/context/app.context';
import { useDeepCompareEffect } from '@/hooks';
import useAuthStore from '@/store/authStore';
import { isDeepEqualReact } from '@/utils';
import { genBase64Avatar } from '@/utils/image';
import { Skeleton } from 'antd';
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  LogOut,
  Sparkles,
} from 'lucide-react';
import { memo, useState } from 'react';
const NavUser = () => {
  const { isMobile } = useSidebar();
  const { loading } = useAppContext();
  const [thumbUrl, setThumbUrl] = useState<string>();

  const user = useAuthStore((store) => store?.user);

  useDeepCompareEffect(() => {
    if (user?.avatar) {
      setThumbUrl(user.avatar);
    } else {
      const thumb = genBase64Avatar({
        name: (user?.name || user?.username) ?? 'Name',
        email: user?.email ?? 'email',
      });
      setThumbUrl(thumb);
    }
  }, [user?.username, user?.avatar, user?.name, user?.email]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {loading ? (
          <Skeleton.Input active className='h-8 !w-full rounded-lg' />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              >
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage src={thumbUrl} alt={user?.name || 'Avatar'} />
                  <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>
                    {user?.name || user?.username}
                  </span>
                  <span className='truncate text-xs'>{user?.email}</span>
                </div>
                <ChevronsUpDown className='ml-auto size-4' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
              side={isMobile ? 'bottom' : 'right'}
              align='end'
              sideOffset={4}
            >
              <DropdownMenuLabel className='p-0 font-normal font-[--font-geist-sans]'>
                <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                  <Avatar className='h-8 w-8 rounded-lg'>
                    <AvatarImage src={thumbUrl} alt={user?.name || 'Avatar'} />
                    <AvatarFallback className='rounded-lg'>CN</AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-medium'>
                      {user?.name || user?.username}
                    </span>
                    <span className='truncate text-xs'>{user?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              {user?.plan !== UserPlan.UNLIMITED && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem className='cursor-pointer'>
                      <Sparkles />
                      Upgrade to Pro
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className='cursor-pointer'>
                  <BadgeCheck />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer'>
                  <Bell />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='cursor-pointer'>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

NavUser.displayName = 'NavUser';

export default memo(NavUser, isDeepEqualReact);
