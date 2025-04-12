import { z } from "zod";
import { MovieSearchResponseSchema } from "../../movie/models/types";

export const WatchlistResponseSchema = MovieSearchResponseSchema;
export type WatchlistResponse = z.infer<typeof WatchlistResponseSchema>;
