import { QueryClient } from "@tanstack/query-core";
import { cache } from "react";
// configure for acccess in all components
const getQueryClient = cache(() => new QueryClient());
export default getQueryClient;