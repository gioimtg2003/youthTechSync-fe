import { axiosInstant } from '@/lib/axios';
import { UseMutationOptions } from '@/types/reactQuery';
import { useMutation } from '@tanstack/react-query';
import endpoint from './endpoint';

export interface DeleteRoleRequest {
  roleId: number;
}
export interface DeleteRoleResponse {}

export const ENDPOINT_DELETE_ROLE = `${endpoint}`;
const getMutationKey = (params?: Record<string, unknown>) => [
  ENDPOINT_DELETE_ROLE,
  params,
];

const deleteRole = async ({ roleId }: DeleteRoleRequest) => {
  return axiosInstant.delete<null, boolean>(
    `${ENDPOINT_DELETE_ROLE}/${roleId}`
  );
};

export const useMutationDeleteRole = (
  options: UseMutationOptions<boolean, DeleteRoleRequest>
) => {
  return useMutation({
    ...options,
    mutationFn: deleteRole,
    mutationKey: getMutationKey({ ...options }),
  });
};
