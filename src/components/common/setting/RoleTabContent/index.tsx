import { Button } from '@/components/ui/button';
import { useDisclosure } from '@/hooks';
import { isDeepEqualReact } from '@/utils';
import { Plus } from 'lucide-react';
import { memo } from 'react';
import FormActionRole from './FormActionRole';

const RoleTabContent = () => {
  const { isOpen, open, onChange } = useDisclosure();

  return (
    <>
      <FormActionRole open={isOpen} onChange={onChange} />
      <div className='w-full flex justify-between items-center mb-4'>
        <h2 className='text-lg font-medium font-sfpro'>Roles Management</h2>
        <Button
          variant='default'
          size='sm'
          childrenClassName='flex items-center gap-2'
          onClick={open}
        >
          <Plus /> <span>Add Role</span>
        </Button>
      </div>
    </>
  );
};

RoleTabContent.displayName = 'RoleTabContent';
export default memo(RoleTabContent, isDeepEqualReact);
