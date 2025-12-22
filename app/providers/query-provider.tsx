"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, ReactNode } from "react";

export default function QueryProvider({ children }: { children: ReactNode }) {
  // Creamos el QueryClient dentro de un estado para evitar que se 
  // recree en cada renderizado del componente cliente.
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minuto de caché por defecto
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}