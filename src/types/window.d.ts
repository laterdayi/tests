import type {
  LoadingBarProviderInst,
  DialogProviderInst,
  MessageProviderInst,
  NotificationProviderInst
} from 'naive-ui';

declare global {
  declare interface Window {
    $loadingBar: LoadingBarProviderInst;
    $dialog: DialogProviderInst;
    $message: MessageProviderInst;
    $notification: NotificationProviderInst;
  }
}
