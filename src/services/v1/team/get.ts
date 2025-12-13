import { axiosInstant } from '@/lib/axios';
import { UseGetOptions } from '@/types/reactQuery';
import { useQuery } from '@tanstack/react-query';
import endpoint from './endpoint';

export interface GetTeamResponse {
  id: number;
  name: string;
  alias: string;
  logoUrl: string | null;
  settings: Record<string, unknown> | null;
}

export interface GetTeamRequest {}

export const ENDPOINT_GET_TEAM = `${endpoint}`;

export const getQueryKey = (params?: Record<string, unknown>) => [
  ENDPOINT_GET_TEAM,
  params,
];

const getTeam = async () => {
  return axiosInstant.get<GetTeamRequest, GetTeamResponse[]>(ENDPOINT_GET_TEAM);
};

export const useGetTeam = (
  options: UseGetOptions<GetTeamResponse[], GetTeamRequest>
) =>
  useQuery({
    ...options,
    queryKey: getQueryKey({ ...options?.params }),
    queryFn: getTeam,
  });
