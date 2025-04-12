import { z } from "zod";

export const AuthTokenSchema = z.object({
  success: z.boolean(),
  request_token: z.string(),
  expires_at: z.string(),
});

export type AuthToken = z.infer<typeof AuthTokenSchema>;

export const SessionSchema = z.object({
  success: z.boolean(),
  session_id: z.string(),
});

export type Session = z.infer<typeof SessionSchema>;

export const AccountSchema = z.object({
  id: z.number(),
  username: z.string(),
  name: z.string(),
  avatar: z.object({
    gravatar: z.object({
      hash: z.string(),
    }),
  }),
});

export type Account = z.infer<typeof AccountSchema>;
