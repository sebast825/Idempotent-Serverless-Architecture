import { Attempt } from "@prisma/client";

export function ifAttemptNotExistThrow(attempts: Attempt[], attemptKey: string) {
  //validate attemps is not  processed for idempotency
  const attemptAlreadyProcesed = attempts.some(
    (e) => e.submissionId == attemptKey
  );

  if (attemptAlreadyProcesed) throw new Error("Attempt already exist");
}
