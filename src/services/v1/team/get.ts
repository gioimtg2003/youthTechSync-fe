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

const ENDPOINT = `${endpoint}/`;

export const getQueryKey = (params?: Record<string, unknown>) => [
  ENDPOINT,
  params,
];

const getTeam = async () => {
  return axiosInstant.get<GetTeamRequest, GetTeamResponse[]>(ENDPOINT);
};

export const useGetTeam = (
  options: UseGetOptions<GetTeamResponse[], GetTeamRequest>
) =>
  useQuery({
    ...options,
    queryKey: getQueryKey({ ...options }),
    queryFn: getTeam,
  });
