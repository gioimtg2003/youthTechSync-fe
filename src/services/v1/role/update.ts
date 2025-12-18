import { ActionPermission, SYSTEM_RESOURCE } from '@/constants';
import { axiosInstant } from '@/lib/axios';
import { UseMutationOptions } from '@/types/reactQuery';
import { useMutation } from '@tanstack/react-query';
import endpoint from './endpoint';

export interface UpdateRoleRequest {
  id: number;
  name: string;
  description?: string;
  permissions: {
    resource: SYSTEM_RESOURCE;
    actions: {
      action: ActionPermission;
      scope?: number[];
    }[];
  }[];
}
export interface UpdateRoleResponse {}

export const ENDPOINT_UPDATE_ROLE = `${endpoint}`;
const getMutationKey = (params?: Record<string, unknown>) => [
  ENDPOINT_UPDATE_ROLE,
  params,
];

const updateRole = async (data: UpdateRoleRequest) => {
  const { id, ...rest } = data;
  return axiosInstant.patch<UpdateRoleRequest, boolean>(
    `${ENDPOINT_UPDATE_ROLE}/${id}`,
    rest
  );
};

export const useMutationUpdateRole = (
  options: UseMutationOptions<boolean, UpdateRoleRequest>
) =>
  useMutation({
    ...options,
    mutationFn: updateRole,
    mutationKey: getMutationKey({ ...options }),
  });
