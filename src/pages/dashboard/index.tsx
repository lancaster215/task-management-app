import React from 'react';
import Dashboard from "@/components";
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

const Home: React.FC<DashboardProps> = () => {
  return (
    <Dashboard />
  )
}

// export const getServerSideProps = async () => {
//   try {
//     const [assigneeRes, taskRes] = await Promise.all([
//       fetch(`${BASE_URL}/api/users`),
//       fetch(`${BASE_URL}/api/task`)
//     ]);

//     if (!assigneeRes.ok || !taskRes.ok) {
//       throw new Error('Failed to fetch API data');
//     }

//     const [assignee, task] = await Promise.all([
//       assigneeRes.json(),
//       taskRes.json()
//     ]);

//     return {
//       props: {
//         assignee,
//         task
//       },
//     };
//   } catch (error) {
//     console.error("getServerSideProps error:", error);

//     return {
//       props: {
//         assignee: [],
//         task: [],
//       },
//     };
//   }
// };

export default Home