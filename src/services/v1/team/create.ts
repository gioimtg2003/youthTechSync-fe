import { axiosInstant } from '@/lib/axios';
import { UseMutationOptions } from '@/types/reactQuery';
import { useMutation } from '@tanstack/react-query';
import endpoint from './endpoint';

export interface CreateTeamRequest {
  name: string;
  alias: string;
}

const CREATE_TEAM_API_URL = `${endpoint}/`;
const getMutationKey = (params?: Record<string, unknown>) => [
  CREATE_TEAM_API_URL,
  params,
];

const createTeam = async (params: CreateTeamRequest) => {
  return axiosInstant.post<CreateTeamRequest, boolean>(
    CREATE_TEAM_API_URL,
    params
  );
};

export const useCreateTeam = (
  options: UseMutationOptions<boolean, CreateTeamRequest>
) =>
  useMutation({
    ...options,
    mutationFn: createTeam,
    mutationKey: getMutationKey({ ...options }),
  });
