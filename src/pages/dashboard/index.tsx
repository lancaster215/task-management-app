import React, { useEffect } from 'react';
import Dashboard from "@/components/dashboard";
// import { BASE_URL } from '@/components/constants/baseURL';

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
  avatar?: any
}

export type DashboardProps = {
  task: Task[]
  assignee?: Assignee[]
}

const DashboardPage: React.FC<DashboardProps> = () => {

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await fetch('/api/refresh', { method: 'POST', credentials: 'include' });
        if (res.ok) {
          const { accessToken } = await res.json();
          localStorage.setItem("accessToken", accessToken);
        }
      } catch (e) {
        console.log("No active session");
      }
    };
    restoreSession();
  }, []);

  return (
    <Dashboard />
  )
}

export default DashboardPage