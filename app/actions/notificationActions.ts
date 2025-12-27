"use server";
import { NotificationType } from "@prisma/client";
import { ERRORS_GENERIC } from "../../constants/errorGeneric";
import { createClient } from "@/lib/supabase/server";
import {
  NotificationFormat,
  NotifcationWithRelations,
} from "@/lib/notification/types";
import { formatNotifications } from "@/lib/notification/formater";
import { getChallengerIdFromChallenge } from "@/lib/challege/service";
import {
  createNotficication,
  getNotifications,
  markNotificationsAsRead,
} from "@/lib/notification/service";

export async function getNotificationActions(): Promise<NotificationFormat[]> {
  const { user } = await createClient();
  if (user == null) throw new Error(ERRORS_GENERIC.AUTH_REQUIRED);
  const notifications: NotifcationWithRelations[] = await getNotifications(
    user.id
  );
  return formatNotifications(notifications);
}

export async function handleReadNotifications(
  notificationsId: string[]
): Promise<void> {
  const { user } = await createClient();
  if (user == null) throw new Error(ERRORS_GENERIC.AUTH_REQUIRED);
  await markNotificationsAsRead(notificationsId, user.id);
}

export async function createChallengeAcceptedNotification(
  challengeId: string,
  gameId: string
): Promise<void> {
  const { user } = await createClient();
  const challengerId = await getChallengerIdFromChallenge(challengeId);

  if (!challengerId) throw new Error("Challenge not found");
  await createNotficication(
    challengerId,
    user?.id ?? null,
    challengeId,
    gameId,
    NotificationType.CHALLENGE_ACCEPTED
  );
}
