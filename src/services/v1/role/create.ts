import { ActionPermission, SYSTEM_RESOURCE } from '@/constants';
import { axiosInstant } from '@/lib/axios';
import { UseMutationOptions } from '@/types/reactQuery';
import { useMutation } from '@tanstack/react-query';
import endpoint from './endpoint';

export interface CreateRoleRequest {
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
export interface CreateRoleResponse {}

export const ENDPOINT_CREATE_ROLE = `${endpoint}`;
const getMutationKey = (params?: Record<string, unknown>) => [
  ENDPOINT_CREATE_ROLE,
  params,
];

const createRole = async (data: CreateRoleRequest) => {
  return axiosInstant.post<CreateRoleRequest, boolean>(
    ENDPOINT_CREATE_ROLE,
    data
  );
};

export const useMutationCreateRole = (
  options: UseMutationOptions<boolean, CreateRoleRequest>
) =>
  useMutation({
    ...options,
    mutationFn: createRole,
    mutationKey: getMutationKey({ ...options }),
  });
