import { UserPlan } from '@/constants';

export interface IUser {
  id: number;
  name?: string;
  username: string;
  email: string;
  avatar?: string;
  currentTeamId?: number;
  plan?: UserPlan;
  teams?: { id: number; name: string; alias?: string }[];
}
