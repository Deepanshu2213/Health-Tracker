import { z } from 'zod';
export const LoginForm = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(7, 'Password needs to be more than 7 characters')
      .regex(/[A-Z]/, 'Must include an uppercase letter')
      .regex(/[a-z]/, 'Must include an lowercase letter')
      .regex(/[0-9]/, 'Must include a number')
      .max(20, 'Password must be less than 20 characters'),
    name: z.string().optional(),
  })
  .strict();

// const Comment = z.object({
//   text: z.string(),
//   user: z.array(LoginForm),
// });
// export type CommentType = z.infer<typeof Comment>;
export type LoginFormType = z.infer<typeof LoginForm>;
