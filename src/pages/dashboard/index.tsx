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
  name: string
}

export type DashboardProps = {
  task: Task[]
  assignee?: Assignee
}

const Home: React.FC<DashboardProps> = ({ task, assignee }) => {
  return (
    <Dashboard task={task} assignee={assignee} />
  )
}

export const getServerSideProps = async () => {
  let assigneeProp, taskProp;
  const assigneeRes = await fetch((`${BASE_URL}/api/users`))

  if (!assigneeRes.ok) {
    const errorText = await assigneeRes.text();
    console.error("API Error Response:", errorText);
    return {
      props: { task: [], assignee: { id: '', name: 'Error' } },
    };
  }

  if (assigneeRes.ok) {
    const assignee: Assignee = await assigneeRes.json()
    assigneeProp = assignee;
    const taskRes = await fetch(`${BASE_URL}/api/task`);

    if (!taskRes.ok) {
      const errorText = await taskRes.text();
      console.error("API Error Response:", errorText);
      return {
        props: { task: [], assignee: assigneeProp },
      };
    }

    if (taskRes.ok) {
      const task: Task[] = await taskRes.json();
      taskProp = task;
    }
  }

  // const task: Task[] = await res.json();
  // const assignee: Assignee = await assigneeRes.json()
  return {
    props: { taskProp, assigneeProp },
  }
}

export default Home