import { HeadCell } from "@/types/tableTypes";

export const headCells: readonly HeadCell[] = [
    {
        id: 'title',
        numeric: false,
        disablePadding: true,
        label: 'Task title',
    },
    {
        id: 'description',
        numeric: false,
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Status',
    },
    {
        id: 'priority',
        numeric: false,
        disablePadding: false,
        label: 'Priority',
    },
    {
        id: 'tags',
        numeric: false,
        disablePadding: false,
        label: 'Tags/Labels',
    },
    {
        id: 'dueDate',
        numeric: false,
        disablePadding: false,
        label: 'Due Date',
    },
    {
        id: 'createdAt',
        numeric: false,
        disablePadding: false,
        label: 'Creation Date',
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Action',
    },
];