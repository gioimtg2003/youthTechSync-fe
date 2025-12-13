import { axiosInstant } from '@/lib/axios';
import { UseGetOptions } from '@/types/reactQuery';
import { useQuery } from '@tanstack/react-query';
import { CreateRoleRequest } from './create';
import endpoint from './endpoint';

// TODO: add pagination
export interface GetRoleRequest {}

export type GetRoleResponse = (CreateRoleRequest & { id: number })[];

export const ENDPOINT_GET_ROLE = `${endpoint}`;
const getQueryKey = (params?: Record<string, unknown>) => [
  ENDPOINT_GET_ROLE,
  params,
];

export const getRole = async (params?: GetRoleRequest) => {
  return axiosInstant.get<GetRoleRequest, GetRoleResponse>(
    ENDPOINT_GET_ROLE,
    params
  );
};

export const useQueryGetRole = (
  options?: UseGetOptions<GetRoleResponse, GetRoleRequest>
) =>
  useQuery({
    ...options,
    queryKey: getQueryKey({ ...options?.params }),
    queryFn: () => getRole({ ...options?.params }),
  });
