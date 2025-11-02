import z from 'zod/v3';

const RoleSchema = z.object({
  name: z
    .string()
    .min(4, 'Role name must be at least 4 characters long')
    .max(50, 'Role name must be at most 50 characters long'),

  permissions: z.array(
    z.object({
      actions: z.array(
        z
          .object({
            action: z.string({ required_error: 'Action is required' }),
            scope: z.string().optional(),
          })
          .optional()
      ),
      resource: z.string(),
      permissionActions: z
        .array(z.string())
        .nonempty('At least one action must be selected')
        .optional(),
    })
  ),
  resources: z
    .array(z.string())
    .nonempty('At least one resource must be selected'),
});

const ActionsSchema = z.array(
  z.object({
    action: z.string(),
    resource: z.string(),
    scope: z.string().optional(),
  })
);

export type TActionsSchema = z.infer<typeof ActionsSchema>;
export { ActionsSchema };

export type TRoleSchema = z.infer<typeof RoleSchema>;
export default RoleSchema;
