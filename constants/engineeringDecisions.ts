interface EngineeringDecisionsProps {
  title: string;
  description: string;
}
export const engineeringDecisions: EngineeringDecisionsProps[] = [
  {
    title: "Server-Authoritative Architecture",
    description:
      "The backend acts as the single source of truth. The frontend is limited to expressing intent and rendering state, without executing domain logic or controlling transitions. All validations, permissions, and persistent state changes occur exclusively on the server.",
  },
  {
    title: "Idempotency by Design",
    description:
      "Critical operations use idempotency keys persisted in the database and backed by uniqueness constraints. This guarantees exactly-once semantics in the presence of network retries, double submissions, or concurrent executions.",
  },
  {
    title: "Consistency and Concurrency",
    description:
      "Sensitive mutations are executed within atomic transactions combined with state validations. This prevents race conditions and ensures that domain transitions follow a valid flow even under simultaneous events.",
  },
  {
    title: "Domain-Oriented Validation",
    description:
      "The system validates actions, not just data. Business rules such as preventing attempts on finished games or actions outside authorized roles are explicitly defined and enforced on the server.",
  },
  {
    title: "Serverless by Design",
    description:
      "Architecture based on stateless functions that scale automatically. Actions are organized by functional responsibility, prioritizing operational simplicity without compromising the domain model.",
  },
  {
    title: "Real-Time Integrated into the Model",
    description:
      "User challenges are modeled as related entities through unique identifiers. Real-time synchronization maintains consistency between linked games as part of the domain, not as a visual feature.",
  },
  {
    title: "Sensitive Data Protection",
    description:
      "Access to critical information is restricted by domain roles and state. Sensitive data is only exposed when explicitly allowed by the model, reinforcing a zero-trust approach toward the client.",
  },
  {
    title: "Transactional Consistency",
    description:
      "Las operaciones compuestas se ejecutan dentro de transacciones atómicas. Esto asegura consistencia entre múltiples escrituras y previene race conditions en escenarios de alta concurrencia.",
  },
  {
    title: "Cryptographically Secure Randomness",
    description:
      "Secret codes are generated using cryptographically secure sources of entropy, avoiding predictable patterns and ensuring fairness even against technically advanced users.",
  },
  {
    title: "Traceability and Auditability",
    description:
      "All games, attempts, and state transitions are persisted as a historical source of truth. This allows full reconstruction of execution flows and post-mortem analysis without relying on additional tooling.",
  },
] as const;
