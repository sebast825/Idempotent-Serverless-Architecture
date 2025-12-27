"use server";
import prisma from "@/lib/prisma";
import {  NotificationType } from "@prisma/client";
import { ERRORS_GENERIC } from "../constants/errorGeneric";
import { createClient } from "@/lib/supabase/server";
import {
  NotificationFormat,
  NotifcationWithRelations,
} from "@/lib/notification/types";
import { formatNotifications } from "@/lib/notification/formater";
import { getChallengerIdFromChallenge } from "@/lib/challege/service";

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

