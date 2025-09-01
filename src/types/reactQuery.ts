import {
  DefaultError,
  InfiniteData,
  MutationOptions,
  QueryKey,
  UseInfiniteQueryOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

export interface IResponseData<Data> {
  code: number;
  message: string;
  data: Data;
  timestamp: string;
}
export type QueryError =
  | AxiosError<unknown, any>
  | {
      name?: 'AxiosError';
      message: string;
    };
export interface UseGetOptions<IResponse, IRequest>
  extends Partial<
    UseQueryOptions<IResponse, DefaultError, IResponse, QueryKey>
  > {
  params: IRequest;
}

export interface UseMutationOptions<TResponse, TRequest>
  extends MutationOptions<TResponse, QueryError, TRequest> {}

export interface UseInfinityGetOptions<IResponse, IRequest>
  extends Partial<
    UseInfiniteQueryOptions<
      IResponse,
      QueryError,
      InfiniteData<IResponse>,
      QueryKey
    >
  > {
  params: IRequest;
}
