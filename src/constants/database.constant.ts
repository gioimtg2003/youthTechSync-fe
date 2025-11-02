import { Eye, Lock, Plus, SquarePen, Trash } from 'lucide-react';

export enum UserPlan {
  FREE = 1,
  PREMIUM = 2,
  UNLIMITED = 3,
}

export enum ActionPermission {
  create = 'create',
  read = 'read',
  update = 'update',
  delete = 'delete',
  manage = 'manage',
}

export enum SYSTEM_RESOURCE {
  all = 'all',
  'user-team' = 'user-team',
  role = 'role',
  user = 'user',
  team = 'team',
  post = 'post',
  resource = 'resource',
  policy = 'policy',
  settings = 'settings',
  permission = 'permission',
  audit = 'audit',
}

export const SYSTEM_RESOURCE_LABEL_MAPPING = {
  [SYSTEM_RESOURCE.all]: 'All',
  [SYSTEM_RESOURCE['user-team']]: 'User - Team',
  [SYSTEM_RESOURCE.role]: 'Role',
  [SYSTEM_RESOURCE.user]: 'User',
  [SYSTEM_RESOURCE.team]: 'Team',
  [SYSTEM_RESOURCE.post]: 'Post',
  [SYSTEM_RESOURCE.resource]: 'Resource',
  [SYSTEM_RESOURCE.policy]: 'Policy',
  [SYSTEM_RESOURCE.settings]: 'Settings',
  [SYSTEM_RESOURCE.permission]: 'Permission',
  [SYSTEM_RESOURCE.audit]: 'Audit',
};

export const ACTION_PERMISSION_LABEL_MAPPING = {
  [ActionPermission.create]: 'Create',
  [ActionPermission.read]: 'Read',
  [ActionPermission.update]: 'Update',
  [ActionPermission.delete]: 'Delete',
  [ActionPermission.manage]: 'All Action',
};

export const ACTION_PERMISSION_ICON_MAPPING = {
  [ActionPermission.create]: Plus,
  [ActionPermission.read]: Eye,
  [ActionPermission.update]: SquarePen,
  [ActionPermission.delete]: Trash,
  [ActionPermission.manage]: Lock,
};
