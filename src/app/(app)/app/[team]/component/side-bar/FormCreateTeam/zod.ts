import * as z from 'zod';

const CreateTeamSchema = z.object({
  alias: z.string().refine(
    (val) => {
      const usernameRegex = /^[a-zA-Z0-9_-]{4,20}$/;
      return usernameRegex.test(val);
    },
    {
      message: 'Username incorrect format',
    }
  ),
  name: z
    .string({
      error: 'Team name is required',
    })
    .min(2, 'Team name must be at least 2 characters long')
    .max(50, 'Team name must be at most 50 characters long'),
});

export type TCreateTeamSchema = z.infer<typeof CreateTeamSchema>;
export default CreateTeamSchema;
