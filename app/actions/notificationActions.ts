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
        { readAt: { sort: "desc", nulls: "first" } },
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
      case NotificationType.CHALLENGE_ACCEPTED:
        formatedNotifications.push(formatNotifcationChallengeAccepted(element));

      default:
        break;
    }
  });
  return formatedNotifications;
};
const formatNotifcationChallengeAccepted = (
  notification: NotifcationWithRelations
): NotificationFormat => {
  return {
    title: "Challenge Accepted",
    message: `${
      notification.actor?.username || "Someone"
    } accepted your challenge!`,
    createdAt: notification.createdAt.toLocaleDateString("es-ES", {
      month: "short",
      day: "numeric",
    }) as string,
    type: NotificationType.CHALLENGE_ACCEPTED,
    id: notification.id,
    readAt: notification.readAt,
  };
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
    createdAt: notification.createdAt.toLocaleDateString("es-ES", {
      month: "short",
      day: "numeric",
    }) as string,
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

export async function createChallengeAcceptedNotification(
  challengeId: string,
  gameId: string
): Promise<void> {
  const { user } = await createClient();
  if (user == null) throw new Error(ERRORS_GENERIC.AUTH_REQUIRED);
  const challengerId = await getChallengerIdFromChallenge(challengeId);

  if (!challengerId) throw new Error("Challenge not found");
  await prisma.notification.create({
    data: {
      recipientId: challengerId,
      actorId: user.id,
      type: NotificationType.CHALLENGE_ACCEPTED,
      challengeId: challengeId,
      gameId: gameId,
    },
  });
}

async function getChallengerIdFromChallenge(
  challengeId: string
): Promise<string> {
  const rsta = await prisma.challenge.findUnique({
    where: {
      id: challengeId,
    },
    select: {
      challengerId: true,
    },
  });
  if (!rsta) {
    throw new Error("Challenge not found");
  }
  return rsta?.challengerId;
}
