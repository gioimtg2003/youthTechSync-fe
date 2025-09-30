import { axiosInstant } from '@/lib/axios';
import { IUser } from '@/types';
import { UseGetOptions } from '@/types/reactQuery';
import { useQuery } from '@tanstack/react-query';
import endpoint from './endpoint';

export interface IUserMeResponse extends IUser {}

export interface IUserMeRequest {}

const USER_ME_API_URL = `${endpoint}/me`;

export const getQueryKey = (params?: Record<string, unknown>) => [
  USER_ME_API_URL,
  params,
];

const getMe = async () => {
  return axiosInstant.get<IUserMeRequest, IUserMeResponse>(USER_ME_API_URL);
};

export const useGetMe = (
  options: UseGetOptions<IUserMeResponse, IUserMeRequest>
) =>
  useQuery({
    ...options,
    queryKey: getQueryKey({ ...options }),
    queryFn: getMe,
  });
