import { useQuery } from "@tanstack/react-query";
import { getNotificationActions } from "@/app/actions/notificationActions";

export const useNotifications =  () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotificationActions(),
    staleTime: Infinity,
  });
};
