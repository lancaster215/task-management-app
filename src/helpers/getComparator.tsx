import { Order } from "@/types/tableTypes";
import { descendingComparator } from "./descendingComparator";
import { Task } from "@/pages";

export function getComparator<Key extends keyof Task | 'action'>(
  order: Order,
  orderBy: Key,
): (a: Task, b: Task) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
