import { notification } from "antd";
import { NotificationType } from "../types";
import { NotificationInstance } from "antd/es/notification/interface"
export const openNotification = (
    type: NotificationType,
    message: string,
    description: string,
    api: NotificationInstance
  ) => {
    api[type]({
      message: message,
      description: description,
    })
  }