import { z } from "zod";

export const MovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  genre_ids: z.array(z.number()),
});

export type Movie = z.infer<typeof MovieSchema>;

export const MovieSearchResponseSchema = z.object({
  page: z.number(),
  results: z.array(MovieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export type MovieSearchResponse = z.infer<typeof MovieSearchResponseSchema>;

export type MovieListType = "search" | "popular" | "upcoming" | "now playing";

export const ReviewSchema = z.object({
  id: z.string(),
  author: z.string(),
  content: z.string(),
  created_at: z.string(),
  author_details: z.object({
    rating: z.number().nullable(),
    avatar_path: z.string().nullable(),
  }),
});

export type Review = z.infer<typeof ReviewSchema>;

export const ReviewsResponseSchema = z.object({
  results: z.array(ReviewSchema),
});

export type ReviewsResponse = z.infer<typeof ReviewsResponseSchema>;

export const AuthTokenSchema = z.object({
  success: z.boolean(),
  request_token: z.string(),
  expires_at: z.string(),
});
