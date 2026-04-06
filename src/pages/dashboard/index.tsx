import React from 'react';
import Dashboard from "@/components/dashboard";
import { Bytes } from '@/generated/prisma/runtime/library';

export type Task = {
  id?: number,
  name?: string,
  time?: string,
  title: string,
  description: string,
  status: "TODO" | "IN_PROGRESS" | "DONE";
  priority: "LOW" | "MEDIUM" | "HIGH";
  dueDate: string,
  tags: "FEATURE" | "BUG" | "ENHANCEMENT";
  createdAt?: string,
  action?: (string | number),
  assigneeId?: string,
}

export type Assignee = {
  id: string,
  name: string,
  avatar?: Bytes
}

export type DashboardProps = {
  task: Task[]
  assignee?: Assignee[]
}

const DashboardPage: React.FC<DashboardProps> = () => {
  return (
    <Dashboard />
  )
}

export default DashboardPage