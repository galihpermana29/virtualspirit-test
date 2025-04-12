import { z } from "zod";
import { MovieSearchResponseSchema } from "../../movie/models/types";

export const FavoriteResponseSchema = MovieSearchResponseSchema;
export type FavoriteResponse = z.infer<typeof FavoriteResponseSchema>;
