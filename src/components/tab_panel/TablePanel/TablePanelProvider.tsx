import { useAddAssignee } from "@/components/hooks/api/assignee/useAddAssignee";
import { useAddTask } from "@/components/hooks/api/tasks/useAddTask";
import { useEditTask } from "@/components/hooks/api/tasks/useEditTask";
import { useGetTasks } from "@/components/hooks/api/tasks/useGetTasks";
import { useRemoveTask } from "@/components/hooks/api/tasks/useRemoveTask";
import { AssigneeFormData } from "@/components/modal/addNewAssignee";
import { TaskFormData } from "@/components/modal/addTaskModal";
import { formattedDate } from "@/helpers/dateFormatter";
import { getComparator } from "@/helpers/getComparator";
import { Task } from "@/pages/dashboard";
import { RootState } from "@/store";
import { setAssignee } from "@/store/assigneeSlice";
import { Data, Order } from "@/types/tableTypes";
import React, { createContext, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export interface TablePanelContextType {
    setTaskToEdit: React.Dispatch<React.SetStateAction<Task | null>>,
    taskToEdit: Task | null,
    setOpenAddTaskModal: React.Dispatch<React.SetStateAction<boolean>>,
    openAddTaskModal: boolean,
    addTaskPending: boolean,
    setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>,
    selected: readonly number[],
    handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void,
    order: Order,
    handleRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data | 'action') => void,
    orderBy: keyof Data | 'action',
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void,
    rowsPerPage: number,
    page: number,
    handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void,
    setSearchText: React.Dispatch<React.SetStateAction<string>>,
    searchText: string,
    setSearchTextArr: React.Dispatch<React.SetStateAction<string[]>>,
    searchTextArr: string[],
    setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
    openDeleteModal: boolean,
    setOpenAddNewAccountModal: React.Dispatch<React.SetStateAction<boolean>>,
    openAddNewAccountModal: boolean,
    handleAddNewAssigne: (data: AssigneeFormData) => Promise<void>,
    handleEdit: (id: number) => void;
    filteredTasks: Task[];
    // Functions
    handleSubmitToAPI: (data: TaskFormData) => Promise<void>;
    handleSaveEdit: (data: TaskFormData) => Promise<void>;
    handleDelete: () => Promise<void>;
}

export const TablePanelContext = createContext<TablePanelContextType | undefined>(undefined);

interface TablePanelProviderProps {
    children: React.ReactNode,
}

export const TablePanelProvider = ({ children }: TablePanelProviderProps) => {
    const dispatch = useDispatch()
    const { filter: filterStatus } = useSelector<RootState, RootState['task']>((state) => state.task);
    const { assignee } = useSelector<RootState, RootState['assignee']>((state) => state.assignee);
    const { data: tasks, isLoading: isLoadingTasks } = useGetTasks(assignee)

    const { mutateAsync: addAssignee, isPending: addAssigeePending } = useAddAssignee();
    const { mutateAsync: addTask, isPending: addTaskPending } = useAddTask();
    const { mutateAsync: editTask, isPending: editTaskPending } = useEditTask();
    const { mutateAsync: removeTask, isPending: removeTaskPending } = useRemoveTask();

    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
    const [openAddTaskModal, setOpenAddTaskModal] = useState<boolean>(false);
    const [selected, setSelected] = useState<readonly number[]>([]);
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof Data | 'action'>('action');
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [page, setPage] = useState(0);
    const [searchText, setSearchText] = useState<string>('');
    const [searchTextArr, setSearchTextArr] = useState<string[]>([]);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [openAddNewAccountModal, setOpenAddNewAccountModal] = useState<boolean>(false);

    const handleEdit = (id: number) => {
        const taskToEdit = tasks.find((task: Task) => task.id === id);
        if (taskToEdit) {
            setTaskToEdit(taskToEdit);
        }
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = tasks.map((n: Task) => n.id);
            setSelected(newSelected as readonly number[]);
            return;
        }
        setSelected([]);
    };

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data | 'action',
    ) => {
        const noSortHeaders = ['title', 'description', 'tags', 'dueDate']
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');

        if (!noSortHeaders.includes(property)) {
            setOrderBy(property);
        }
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    // This also exist in components/index.tsx which is not scope by the provider
    // This is being used by NoAssigneeDisplay which is scope by the provider
    const handleAddNewAssigne = async (formData: AssigneeFormData) => {
        try {
            await addAssignee(formData);
            dispatch(setAssignee(formData))
            setOpenAddNewAccountModal(false);
        } catch (error) {
            // Error is already handled in the hook, but you can add UI toasts here
        }
    }

    //memoize states that have the potential to create expensive rendering
    const visibleRows = useMemo(
        () => {
            if (!tasks) return [];

            return tasks
                .slice() // Create a shallow copy before sorting (good practice)
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        },
        [order, orderBy, page, rowsPerPage, tasks],
    );

    //If the user search, filter visibleRows by the search text
    const filteredSearchedTasks = searchText ? visibleRows.filter(
        (rows: Task) =>
            rows.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
            rows.description.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    ) : visibleRows

    const filteredTasks = useMemo(() => {
        return filteredSearchedTasks.filter((task: Task) => {
            const matchStatus =
                !filterStatus.status || task.status.toLowerCase() === filterStatus.status;
            const matchPriority =
                !filterStatus.priority || task.priority.toLowerCase() === filterStatus.priority;
            const matchTags =
                !filterStatus.tags || task.tags.toLowerCase() === filterStatus.tags;

            const matchDateRange =
                (!filterStatus.startDate ||
                    formattedDate(task.dueDate) >= filterStatus.startDate) &&
                (!filterStatus.endDate ||
                    formattedDate(task.dueDate) <= filterStatus.endDate);
            return matchStatus && matchPriority && matchTags && matchDateRange;
        });
    }, [filteredSearchedTasks, filterStatus]);

    const handleSubmitToAPI = async (formData: TaskFormData) => {
        try {
            await addTask({ formData, assignee })
        } catch (error) { }
    }

    const handleSaveEdit = async (formData: TaskFormData) => {
        console.log('handleSaveEdit', formData)
        if (!taskToEdit) return;
        try {
            await editTask({ formData, assignee })
            setTaskToEdit(null);
        } catch (error) { }
    }

    const handleDelete = async () => {
        try {
            await removeTask(selected)
        } catch (error) { }
    }

    const value: TablePanelContextType = {
        setTaskToEdit,
        taskToEdit,
        setOpenAddTaskModal,
        openAddTaskModal,
        addTaskPending,
        setSelected,
        selected,
        handleSelectAllClick,
        order,
        handleRequestSort,
        orderBy,
        handleChangeRowsPerPage,
        rowsPerPage,
        page,
        handleChangePage,
        setSearchText,
        searchText,
        setSearchTextArr,
        searchTextArr,
        setOpenDeleteModal,
        openDeleteModal,
        setOpenAddNewAccountModal,
        openAddNewAccountModal,
        filteredTasks,
        // Functions
        handleEdit,
        handleAddNewAssigne,
        handleSubmitToAPI,
        handleSaveEdit,
        handleDelete,
    };

    return (
        <TablePanelContext.Provider value={value} >
            {children}
        </TablePanelContext.Provider>
    );
};