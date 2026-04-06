import { HeadCell } from "@/types/tableTypes";

export const headerTaskCells: readonly HeadCell[] = [
    {
        id: 'title',
        numeric: false,
        disablePadding: false,
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
        minWidth: 150,
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
        minWidth: 150,
    },
    // {
    //     id: 'createdAt',
    //     numeric: false,
    //     disablePadding: false,
    //     label: 'Creation Date',
    //     minWidth: 200
    // },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Action',
    },
];