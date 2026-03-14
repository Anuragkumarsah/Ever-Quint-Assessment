type StatusProps = {
  color: string;
  displayName: string;
};

type StatusTypes = "backlog" | "inProgress" | "done";
type Priority = "low" | "medium" | "high";

export type StatusGlobal = Record<StatusTypes, StatusProps>;

export type Task = {
  id: number;
  title: string;
  description: string;
  status: StatusTypes;
  priority: Priority;
  assignee: string;
  tags: Array<string>;
  createdAt: Date;
  updatedAt: Date;
};
