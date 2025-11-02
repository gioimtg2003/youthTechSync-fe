'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCreateTeam } from '@/services/v1/team/create';
import { zodResolver } from '@hookform/resolvers/zod';

import InputForm from '@/components/common/form/input-form';
import { Button } from '@/components/ui/button';
import { getQueryClient } from '@/providers/query.provider';
import { ENDPOINT_GET_TEAM } from '@/services/v1/team/get';
import { DialogProps } from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import CreateTeamSchema, { TCreateTeamSchema } from './zod';

export const FormCreateTeam = (props: DialogProps) => {
  const methods = useForm<TCreateTeamSchema>({
    resolver: zodResolver(CreateTeamSchema),
    mode: 'onSubmit',
    defaultValues: {
      alias: '',
      name: '',
    },
  });
  const { mutate, isPending } = useCreateTeam({
    onSuccess: () => {
      const queryClient = getQueryClient();
      queryClient.invalidateQueries({ queryKey: [ENDPOINT_GET_TEAM] });
      props?.onOpenChange?.(false);
      methods.reset();
    },
  });
  const submitCreateTeam = (data: TCreateTeamSchema) => {
    mutate(data);
  };

  return (
    <Dialog {...props}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create team</DialogTitle>
          <DialogDescription>
            Fill in the information below to create a new team.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4'>
          <InputForm
            control={methods.control}
            name='name'
            label='Team Name'
            placeholder={'example'}
          />
          <InputForm
            control={methods.control}
            name='alias'
            label='Alias'
            placeholder='alias'
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button
            loading={isPending}
            onClick={methods.handleSubmit(submitCreateTeam)}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
