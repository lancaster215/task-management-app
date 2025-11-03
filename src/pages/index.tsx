import React from 'react';
import Dashboard from "@/components/Dashboard";
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

export type Props = {
  task: Task[]
  assignee?: Assignee
}

const Home: React.FC<Props> = ({task, assignee}) => {
  return (
    <Dashboard task={task} assignee={assignee}/>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch(`${BASE_URL}/api/task`);
  const assigneeRes = await fetch((`${BASE_URL}/api/users`))
  const task: Task = await res.json();
  const assignee: Assignee = await assigneeRes.json()

  return {
    props: { task, assignee },
  }
}

export default Home