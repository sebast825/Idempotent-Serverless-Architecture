import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNotificationActions,
  handleReadNotifications,
} from "@/app/actions/notificationActions";
import { NotificationFormat } from "@/lib/notification/types";

//isEable avoid the render if the user is not authenticated, this is usefull in navbar component
export const useNotifications = (isEnable : boolean = true) => {
  return useQuery<NotificationFormat[]>({
    queryKey: ["notifications"],
    queryFn: () => getNotificationActions(),
    staleTime: Infinity,
    enabled :isEnable 
  });
};

export const useSetNoticationReadAt = () => {
  const queryclient = useQueryClient();
  return useMutation({
    mutationKey: ["notifications"],
    mutationFn: async (notificationsId : string[]) => {
      await handleReadNotifications(notificationsId);
    },
    onSuccess: () => {
      //this allows to remove the badge red in nav bar
      queryclient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
