import { StatusTypes, Priority } from "./status";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: StatusTypes;
  priority: Priority;
  assignee: string;
  tags: Array<string>;
  createdAt: string;
  updatedAt: string;
};
