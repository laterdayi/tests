import type { DialogOptions, MessageOptions, NotificationOptions } from 'naive-ui';

// -------------------------------------------------------------------------------------------- > dialog
export const $dialog = {
  warning: ({ ...params }: DialogOptions) =>
    window.$dialog.warning({ title: i18nt('tips'), ...defaultParams, ...params }),
  info: ({ ...params }: DialogOptions) => window.$dialog.info({ ...defaultParams, ...params }),
  success: ({ ...params }: DialogOptions) => window.$dialog.success({ ...defaultParams, ...params }),
  error: ({ ...params }: DialogOptions) => window.$dialog.error({ ...defaultParams, ...params }),
  destroyAll: window.$dialog?.destroyAll,
  create: ({ ...params }) => window.$dialog.create({ ...defaultParams, ...params })
};

const defaultParams: DialogOptions = {
  autoFocus: false,
  positiveText: i18nt('confirm'),
  negativeText: i18nt('cancel')
};

// -------------------------------------------------------------------------------------------- > message

type ContentType = string | (() => VNodeChild);

export const $message = {
  warning: (content: ContentType, options?: MessageOptions) =>
    window.$message.warning(content, { duration: MESSAGE_DURATION, ...options }),
  info: (content: ContentType, options?: MessageOptions) =>
    window.$message.info(content, { duration: MESSAGE_DURATION, ...options }),
  success: (content: ContentType, options?: MessageOptions) =>
    window.$message.success(content, { duration: MESSAGE_DURATION, ...options }),
  error: (content: ContentType, options?: MessageOptions) =>
    window.$message.error(content, { duration: MESSAGE_DURATION, ...options }),
  create: (content: ContentType, options?: MessageOptions) =>
    window.$message.create(content, { duration: MESSAGE_DURATION, ...options }),
  loading: (content: ContentType, options?: MessageOptions) =>
    window.$message.loading(content, { duration: MESSAGE_DURATION, ...options }),
  destroyAll: window.$message?.destroyAll
};

// -------------------------------------------------------------------------------------------- > notification

export const $notification = {
  warning: ({ ...params }: NotificationOptions) =>
    window.$notification.warning({ duration: NOTIFICATION_DURATION, ...params }),
  info: ({ ...params }: NotificationOptions) =>
    window.$notification.info({ duration: NOTIFICATION_DURATION, ...params }),
  success: ({ ...params }: NotificationOptions) =>
    window.$notification.success({ duration: NOTIFICATION_DURATION, ...params }),
  error: ({ ...params }: NotificationOptions) =>
    window.$notification.error({ duration: NOTIFICATION_DURATION, ...params }),
  destroyAll: window.$notification?.destroyAll,
  create: ({ ...params }) => window.$notification.create({ duration: NOTIFICATION_DURATION, ...params })
};

// -------------------------------------------------------------------------------------------- > loading-bar
export const $loadingBar = {
  start: () => window.$loadingBar.start(),
  finish: () => window.$loadingBar.finish(),
  error: () => window.$loadingBar.error()
};
