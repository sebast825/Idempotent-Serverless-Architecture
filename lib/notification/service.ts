import { NotificationType } from "@prisma/client";
import prisma from "../prisma";
import { NotifcationWithRelations } from "./types";

export const getNotifications = async (
  userId: string
): Promise<NotifcationWithRelations[]> => {
  const notifications: NotifcationWithRelations[] =
    await prisma.notification.findMany({
      where: {
        recipientId: userId,
      },
      include: {
        actor: {
          select: {
            username: true,
          },
        },
        game: {
          select: {
            status: true,
            attempts: true,
          },
        },
      },
      orderBy: [
        { readAt: { sort: "desc", nulls: "first" } },
        { createdAt: "desc" },
      ],
      take: 10,
    });
  return notifications;
};

export async function markNotificationsAsRead(
  notificationsId: string[],
  userId: string
): Promise<void> {
  await prisma.notification.updateMany({
    where: {
      id: { in: notificationsId },
      recipientId: userId,
      readAt: null,
    },
    data: {
      readAt: new Date(),
    },
  });
}

export async function createNotficication(
  recipientId: string,
  actorId: string | null,
  challengeId: string,
  gameId: string,
  type: NotificationType
): Promise<void> {
  await prisma.notification.create({
    data: {
      recipientId: recipientId,
      actorId: actorId,
      type: type,
      challengeId: challengeId,
      gameId: gameId,
    },
  });
}
