import { StatusTypes, Priority } from "./Status";

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
