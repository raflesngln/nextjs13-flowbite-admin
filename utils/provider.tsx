"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { ReactQueryStreamedHydration } from "@tanstack/react-query";


export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient());

  return (
        <QueryClientProvider client={client}>
            {/* <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration> */}
          {children}
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
        </QueryClientProvider>
  );
}