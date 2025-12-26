export const GAME_ERRORS = {
  AUTH_REQUIRED: "You must be logged in to access this game.",
  NOT_FOUND: "The requested game could not be found.",
  FORBIDDEN: "You do not have permission to view this game.",
  EXPIRED: "This challenge has already expired.",
  GENERIC: "An unexpected error occurred. Please try again."
} as const;
