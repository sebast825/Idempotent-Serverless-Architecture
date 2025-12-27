"use server";
import prisma from "@/lib/prisma";
import { Notification, NotificationType } from "@prisma/client";
import { ERRORS_GENERIC } from "../constants/errorGeneric";
import { createClient } from "@/lib/supabase/server";
import {
  NotificationFormat,
  NotifcationWithRelations,
} from "@/lib/notification/types";

export async function getNotificationActions(): Promise<NotificationFormat[]> {
  const { user } = await createClient();
  if (user == null) throw new Error(ERRORS_GENERIC.AUTH_REQUIRED);
  const notifications: NotifcationWithRelations[] = await getRawNotifications(
    user.id
  );
  return formatNotifications(notifications);
}

const getRawNotifications = async (
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
        { readAt: { sort: "asc", nulls: "first" } },
        { createdAt: "desc" },
      ],
      take: 10,
    });
  return notifications;
};
const formatNotifications = (
  notifications: NotifcationWithRelations[]
): NotificationFormat[] => {
  const formatedNotifications: NotificationFormat[] = [];
  notifications.forEach((element) => {
    switch (element.type) {
      case NotificationType.CHALLENGE_COMPLETED:
        formatedNotifications.push(formatNotifcationChallengeComplete(element));
        break;
      default:
        break;
    }
  });
  return formatedNotifications;
};

const formatNotifcationChallengeComplete = (
  notification: NotifcationWithRelations
): NotificationFormat => {
  const messageText =
    notification.game?.status === "WON"
      ? `won the game in ${notification.game?.attempts.length} attempts!`
      : " lost the challenge!";
  return {
    title: "Challenge Completed",
    message: `${notification.actor?.username || "Someone"} ${messageText}`,
    link: `/games/${notification.gameId}/review`,
    type: NotificationType.CHALLENGE_COMPLETED,
    createdAt: notification.createdAt.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }) as string,
    id: notification.id,
    readAt: notification.readAt,
  };
};

export async function markNotificationsAsRead(
  notificationsId: string[]
): Promise<void> {
  const { user } = await createClient();
  if (user == null) throw new Error(ERRORS_GENERIC.AUTH_REQUIRED);
  await prisma.notification.updateMany({
    where: {
      id: { in: notificationsId },
      recipientId: user.id,
      readAt: null,
    },
    data: {
      readAt: new Date(),
    },
  });
}
