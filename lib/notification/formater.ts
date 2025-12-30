import { NotificationType } from "@prisma/client";
import { NotifcationWithRelations, NotificationFormat } from "./types";
import { ROUTES } from "../routes";

export const formatNotifications = (
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
  let notificationResponse: NotificationFormat =
    genericNotificationFormat(notification);
  notificationResponse.title = "Challenge Accepted";
  notificationResponse.message = `${
    notification.actor?.username || "Someone"
  } accepted your challenge!`;
  return notificationResponse;
};

const genericNotificationFormat = (
  notification: NotifcationWithRelations
): NotificationFormat => {
  return {
    title: "",
    message: "",
    type: NotificationType.CHALLENGE_COMPLETED,
    createdAt: notification.createdAt.toLocaleDateString("es-ES", {
      month: "short",
      day: "numeric",
    }) as string,
    id: notification.id,
    readAt: notification.readAt,
  };
};
const formatNotifcationChallengeComplete = (
  notification: NotifcationWithRelations
): NotificationFormat => {
  let notificationResponse: NotificationFormat =
    genericNotificationFormat(notification);
  notificationResponse.title = "Challenge Completed";
  const messageText =
    notification.game?.status === "WON"
      ? `won the game in ${notification.game?.attempts.length} attempts!`
      : " lost the challenge!";
  notificationResponse.message = `${
    notification.actor?.username || "Someone"
  } ${messageText}`;
  notificationResponse.link = ROUTES.reviewGame(notification.gameId!);
  return notificationResponse;
};
