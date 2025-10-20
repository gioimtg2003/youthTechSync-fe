'use client';

import { ChevronsUpDown, Plus } from 'lucide-react';

import { Spinner } from '@/components/common';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useDisclosure } from '@/hooks';
import { useGetTeam } from '@/services/v1/team/get';
import { genKey, isDeepEqualReact } from '@/utils';
import { genBase64Avatar } from '@/utils/image';
import { memo } from 'react';
import { FormCreateTeam } from './FormCreateTeam';

const TeamSwitcher = () => {
  const { data, isLoading } = useGetTeam({
    params: {},
  });
  const { isMobile } = useSidebar();
  const {
    isOpen: isOpenForm,
    open: openForm,
    close: closeForm,
  } = useDisclosure();

  // const [activeTeam, setActiveTeam] = useState([]);

  return (
    <>
      <FormCreateTeam open={isOpenForm} onOpenChange={closeForm} />
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              >
                <Avatar>
                  <AvatarImage
                    src={genBase64Avatar(
                      { name: data?.[0]?.name ?? '', email: '' },
                      { size: 'small' }
                    )}
                    alt={data?.[0]?.name}
                  />
                </Avatar>
                {isLoading ? (
                  <Spinner className='justify-start ml-4' />
                ) : (
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-medium'>
                      {data?.[0]?.name}
                    </span>
                    <span className='truncate text-xs'>{'Pro'}</span>
                  </div>
                )}

                <ChevronsUpDown className='ml-auto' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
              align='start'
              side={isMobile ? 'bottom' : 'right'}
              sideOffset={4}
            >
              <DropdownMenuLabel className='text-muted-foreground text-xs'>
                Teams
              </DropdownMenuLabel>
              {(data ?? [])?.map((team, index) => (
                <DropdownMenuItem
                  key={genKey('team-switcher', team.id)}
                  // onClick={() => setActiveTeam(team)}
                  className='gap-2 p-2 cursor-pointer'
                >
                  <Avatar>
                    <AvatarImage
                      src={genBase64Avatar(
                        { name: team.name, email: '' },
                        { size: 'small' }
                      )}
                      alt={team.name}
                    />
                  </Avatar>
                  {team.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />

              <DropdownMenuItem className='gap-2 p-2' onClick={openForm}>
                <div className='flex size-6 items-center justify-center rounded-md border bg-transparent'>
                  <Plus className='size-4' />
                </div>
                <div className='text-muted-foreground font-medium'>
                  Add team
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
};

TeamSwitcher.displayName = 'TeamSwitcher';
export default memo(TeamSwitcher, isDeepEqualReact);
