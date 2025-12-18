import z from 'zod/v3';

const RoleSchema = z.object({
  name: z
    .string()
    .min(4, 'Role name must be at least 4 characters long')
    .max(50, 'Role name must be at most 50 characters long'),

  description: z
    .string()
    .max(200, 'Role description must be at most 200 characters long')
    .optional(),

  permissions: z.array(
    z.object({
      actions: z.array(
        z
          .object({
            action: z.string({ required_error: 'Action is required' }),
            scope: z
              .union([z.array(z.number()), z.undefined(), z.null()])
              .optional(),
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

export type TRoleSchema = z.infer<typeof RoleSchema>;
export default RoleSchema;
