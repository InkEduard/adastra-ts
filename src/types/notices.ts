export enum NoticeType {
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
}

export type Notice = {
  id: number;
  type: NoticeType;
  message: string;
};
