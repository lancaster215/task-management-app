import React from 'react';
import Dashboard from "@/components";
import { BASE_URL } from '@/components/constants/baseURL';

export type Task = {
  id: number,
  name: string,
  time: string,
  title: string,
  description: string,
  status: string,
  priority: string,
  dueDate: string,
  tags: string,
  createdAt: string,
  action: (string | number),
  assigneeId: string,
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

const Home: React.FC<DashboardProps> = ({ task, assignee }) => {
  console.log(task, assignee, 'dashboard')
  return (
    <Dashboard task={task} assignee={assignee} />
  )
}

export const getServerSideProps = async () => {
  try {
    const [assigneeRes, taskRes] = await Promise.all([
      fetch(`${BASE_URL}/api/users`),
      fetch(`${BASE_URL}/api/task`)
    ]);

    if (!assigneeRes.ok || !taskRes.ok) {
      throw new Error('Failed to fetch API data');
    }

    const [assignee, task] = await Promise.all([
      assigneeRes.json(),
      taskRes.json()
    ]);

    return {
      props: {
        assignee,
        task
      },
    };
  } catch (error) {
    console.error("getServerSideProps error:", error);

    return {
      props: {
        assignee: [],
        task: [],
      },
    };
  }
};

export default Home