import { NotificationType, Prisma } from "@prisma/client";


export type NotifcationWithRelations = Prisma.NotificationGetPayload<{
  include: {
    actor: {
      select: {
        username: true;
      };
    };
    game: {
      select: {
        status: true;
        attempts: true;
      };
    };
  };
}>;
export interface NotificationFormat {
  id: string;
  title: string;
  message: string;
  link?: string;
  createdAt: string;
  type: NotificationType;
  readAt: Date | null;
}

