import { ActionPermission, SYSTEM_RESOURCE } from '@/constants';
import { axiosInstant } from '@/lib/axios';
import { UseGetOptions } from '@/types/reactQuery';
import { useQuery } from '@tanstack/react-query';
import endpoint from './endpoint';

export interface GetPolicyResponse {
  actions: ActionPermission[];
  resource: SYSTEM_RESOURCE[];
}

export interface GetPolicyRequest {}

export const ENDPOINT_GET_POLICY = `${endpoint}`;

export const getQueryKey = (params?: Record<string, unknown>) => [
  ENDPOINT_GET_POLICY,
  params,
];

const getPolicy = async () => {
  return axiosInstant.get<GetPolicyRequest, GetPolicyResponse>(
    ENDPOINT_GET_POLICY
  );
};

export const useGetPolicy = (
  options: UseGetOptions<GetPolicyResponse, GetPolicyRequest>
) =>
  useQuery({
    ...options,
    queryKey: getQueryKey({ ...options }),
    queryFn: getPolicy,
  });
