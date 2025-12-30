export const ROUTES = {
  game: (id: string) => `/games/${id}`,
  reviewGame: (id: string) => `/games/${id}/review`,
  not_found: () => "/404",
};
