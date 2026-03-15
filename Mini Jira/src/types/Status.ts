export type StatusProps = {
  color: string;
  displayName: string;
};

export type StatusTypes = "backlog" | "inProgress" | "done";
export type Priority = "low" | "medium" | "high";

export type StatusGlobal = Record<StatusTypes, StatusProps>;
