export type Route = {
  pathname: string;
  callback: (path?: string) => Promise<void>;
};
