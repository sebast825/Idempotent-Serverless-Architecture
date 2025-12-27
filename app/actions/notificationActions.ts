"use server";
import prisma from "@/lib/prisma";
import { NotificationType } from "@prisma/client";
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
        readAt: null,
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
      orderBy: {
        createdAt: "desc",
      },
      take: 20,
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
      : " couldn't win the challenge!";
  return {
    title: "Challenge Finished",
    message: `${notification.actor?.username || "Someone"} ${messageText}`,
    link: `/games/${notification.gameId}`,
    type: NotificationType.CHALLENGE_COMPLETED,
  };
};
