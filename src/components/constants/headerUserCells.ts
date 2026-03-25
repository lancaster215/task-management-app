import { HeadCell } from "@/types/tableTypes";

export const headerUserCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Assignee Name',
    },
    {
        id: 'action',
        numeric: false,
        disablePadding: false,
        label: 'Action',
    },
];